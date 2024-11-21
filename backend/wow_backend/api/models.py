from django.db import models


class User(models.Model):
    """Model for site users."""

    pass


class Order(models.Model):
    """Model for user orders."""

    pass


class OrderItem(models.Model):
    """Intermediary model for items in a user's orders."""
    
    pass


class MenuItem(models.Model):
    """Model for menu items."""
    name = models.CharField(max_length=100, primary_key=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    pass
