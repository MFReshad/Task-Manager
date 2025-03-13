from django.urls import path, include

from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'tasks', views.TodoView, 'task' )

urlpatterns = [
    path('', views.home, name="home"),
    path('api/', include(router.urls)),
    
]