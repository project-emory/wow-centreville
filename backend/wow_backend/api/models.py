from django.db import models
import re

def phone_validator(x):
    y = re.search(r"\d{10}", x)
    return bool(y)

    

class User(models.Model):
    """Model for site users."""
    username = models.CharField(max_length=25)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Order(models.Model):
    """Model for user orders."""

    pass


class OrderItem(models.Model):
    """Intermediary model for items in a user's orders."""

    pass


class MenuItem(models.Model):
    """Model for menu items."""

    pass
