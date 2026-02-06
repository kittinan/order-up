from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.db.models import Count, Sum, Q
from django.utils import timezone
from datetime import datetime, timedelta
from django_tenants.utils import schema_context, get_tenant_model
from customers.models import Client
from orders.models import Order, OrderItem
from store.models import Item
from django.contrib.auth import get_user_model

User = get_user_model()


@permission_classes([IsAuthenticated, IsAdminUser])
@api_view(['GET'])
def system_stats(request):
    """
    Get system-wide statistics
    - Number of tenants
    - Today's orders
    - Total sales
    - Active customers
    """
    try:
        # Get all tenants
        tenants_count = Client.objects.count()
        
        # Get today's date
        today = timezone.now().date()
        start_of_day = timezone.make_aware(datetime.combine(today, datetime.min.time()))
        end_of_day = timezone.make_aware(datetime.combine(today, datetime.max.time()))
        
        total_orders_today = 0
        total_sales_today = 0
        active_customers = set()
        
        # Iterate through all tenants to gather statistics
        for tenant in Client.objects.all():
            with schema_context(tenant.schema_name):
                # Count today's orders
                orders_today = Order.objects.filter(
                    created_at__range=[start_of_day, end_of_day]
                ).count()
                total_orders_today += orders_today
                
                # Sum today's sales
                sales_today = Order.objects.filter(
                    created_at__range=[start_of_day, end_of_day],
                    status__in=['completed', 'paid']
                ).aggregate(total=Sum('total_amount'))['total'] or 0
                total_sales_today += sales_today
                
                # Get active customers (users who placed orders in last 30 days)
                thirty_days_ago = timezone.now() - timedelta(days=30)
                active_users = Order.objects.filter(
                    created_at__gte=thirty_days_ago
                ).values_list('user_id', flat=True).distinct()
                active_customers.update(active_users)
        
        return Response({
            'tenants_count': tenants_count,
            'orders_today': total_orders_today,
            'sales_today': float(total_sales_today),
            'active_customers_count': len(active_customers)
        })
    
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@permission_classes([IsAuthenticated, IsAdminUser])
@api_view(['GET'])
def tenants_list(request):
    """
    Get list of all tenants with pagination
    """
    try:
        page = int(request.GET.get('page', 1))
        page_size = int(request.GET.get('page_size', 10))
        
        # Get all tenants
        tenants = Client.objects.all()
        total_count = tenants.count()
        
        # Apply pagination
        start = (page - 1) * page_size
        end = start + page_size
        tenants_page = tenants[start:end]
        
        # Prepare tenant data
        tenants_data = []
        for tenant in tenants_page:
            with schema_context(tenant.schema_name):
                # Get tenant-specific statistics
                orders_count = Order.objects.count()
                total_sales = Order.objects.filter(
                    status__in=['completed', 'paid']
                ).aggregate(total=Sum('total_amount'))['total'] or 0
                
                tenants_data.append({
                    'id': str(tenant.id),
                    'name': tenant.name,
                    'domain': tenant.domain_url,
                    'schema_name': tenant.schema_name,
                    'created_at': tenant.created_at.isoformat() if tenant.created_at else None,
                    'orders_count': orders_count,
                    'total_sales': float(total_sales)
                })
        
        return Response({
            'tenants': tenants_data,
            'pagination': {
                'page': page,
                'page_size': page_size,
                'total_count': total_count,
                'total_pages': (total_count + page_size - 1) // page_size
            }
        })
    
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@permission_classes([IsAuthenticated, IsAdminUser])
@api_view(['GET'])
def tenant_orders(request, tenant_id):
    """
    Get orders for a specific tenant with filtering
    """
    try:
        # Get tenant
        try:
            tenant = Client.objects.get(id=tenant_id)
        except Client.DoesNotExist:
            return Response(
                {'error': 'Tenant not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Parse filter parameters
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        status_filter = request.GET.get('status')
        
        with schema_context(tenant.schema_name):
            orders = Order.objects.all().order_by('-created_at')
            
            # Apply date filters
            if start_date:
                start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
                start_date = timezone.make_aware(datetime.combine(start_date, datetime.min.time()))
                orders = orders.filter(created_at__gte=start_date)
            
            if end_date:
                end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
                end_date = timezone.make_aware(datetime.combine(end_date, datetime.max.time()))
                orders = orders.filter(created_at__lte=end_date)
            
            # Apply status filter
            if status_filter:
                orders = orders.filter(status=status_filter)
            
            # Serialize orders data
            orders_data = []
            for order in orders:
                orders_data.append({
                    'id': str(order.id),
                    'order_number': order.order_number,
                    'user': order.user.email if order.user else None,
                    'status': order.status,
                    'total_amount': float(order.total_amount),
                    'created_at': order.created_at.isoformat(),
                    'updated_at': order.updated_at.isoformat(),
                    'items_count': order.items.count()
                })
            
            return Response({
                'tenant': {
                    'id': str(tenant.id),
                    'name': tenant.name
                },
                'orders': orders_data
            })
    
    except ValueError as e:
        return Response(
            {'error': 'Invalid date format. Use YYYY-MM-DD'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@permission_classes([IsAuthenticated, IsAdminUser])
@api_view(['GET'])
def analytics(request):
    """
    Get analytics and reports
    - Top tenants by revenue
    - Popular items across all tenants
    - Revenue trends
    """
    try:
        # Time period for trends (default: last 30 days)
        days = int(request.GET.get('days', 30))
        start_date = timezone.now() - timedelta(days=days)
        
        # Top tenants by revenue
        top_tenants = []
        for tenant in Client.objects.all():
            with schema_context(tenant.schema_name):
                revenue = Order.objects.filter(
                    created_at__gte=start_date,
                    status__in=['completed', 'paid']
                ).aggregate(total=Sum('total_amount'))['total'] or 0
                
                if revenue > 0:
                    top_tenants.append({
                        'id': str(tenant.id),
                        'name': tenant.name,
                        'revenue': float(revenue)
                    })
        
        # Sort by revenue and get top 10
        top_tenants.sort(key=lambda x: x['revenue'], reverse=True)
        top_tenants = top_tenants[:10]
        
        # Popular items across all tenants
        item_stats = {}
        for tenant in Client.objects.all():
            with schema_context(tenant.schema_name):
                order_items = OrderItem.objects.filter(
                    order__created_at__gte=start_date,
                    order__status__in=['completed', 'paid']
                ).select_related('menu_item')
                
                for item in order_items:
                    item_key = f"{tenant.id}_{item.item.name}"
                    if item_key not in item_stats:
                        item_stats[item_key] = {
                            'name': item.item.name,
                            'tenant_id': str(tenant.id),
                            'tenant_name': tenant.name,
                            'quantity': 0,
                            'revenue': 0
                        }
                    
                    item_stats[item_key]['quantity'] += item.quantity
                    item_stats[item_key]['revenue'] += float(item.price * item.quantity)
        
        # Convert to list and sort by quantity
        popular_items = list(item_stats.values())
        popular_items.sort(key=lambda x: x['quantity'], reverse=True)
        popular_items = popular_items[:20]
        
        # Revenue trends (daily for the last 30 days)
        revenue_trends = []
        for i in range(days):
            date = start_date + timedelta(days=i)
            day_start = timezone.make_aware(datetime.combine(date, datetime.min.time()))
            day_end = timezone.make_aware(datetime.combine(date, datetime.max.time()))
            
            daily_revenue = 0
            for tenant in Client.objects.all():
                with schema_context(tenant.schema_name):
                    revenue = Order.objects.filter(
                        created_at__range=[day_start, day_end],
                        status__in=['completed', 'paid']
                    ).aggregate(total=Sum('total_amount'))['total'] or 0
                    daily_revenue += revenue
            
            revenue_trends.append({
                'date': date.strftime('%Y-%m-%d'),
                'revenue': float(daily_revenue)
            })
        
        return Response({
            'top_tenants': top_tenants,
            'popular_items': popular_items,
            'revenue_trends': revenue_trends,
            'period_days': days
        })
    
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )