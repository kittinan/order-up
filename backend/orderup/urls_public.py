from django.contrib import admin
from django.urls import path
from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Welcome to OrderUp Platform</h1>")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),
]
