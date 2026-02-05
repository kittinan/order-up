from django.urls import path
from django.http import HttpResponse

def tenant_home(request):
    return HttpResponse(f"<h1>Welcome to {request.tenant.name}</h1>")

urlpatterns = [
    path('', tenant_home),
]
