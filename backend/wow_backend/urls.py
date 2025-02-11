"""
URL configuration for wow_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/

Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from rest_framework.routers import DefaultRouter
from api.views import LoginViewSet, MenuItemViewSet, OrderViewSet, UserViewSet
from django.urls import path
from django.contrib import admin

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="users")
router.register(r"orders", OrderViewSet, basename="orders")
router.register(r"menu-items", MenuItemViewSet, basename="menu-items")
router.register("login", LoginViewSet, basename="login")

urlpatterns = router.urls + [
    path("admin/", admin.site.urls)
]
