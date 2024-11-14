from django.db import models
import re

def phone_validator(x):
    y = re.search(r"\d{10}", x)
    return bool(y)

    

class TestUser(models.Model):
    """
    Test user model for initial set up.

    TODO: remove once other models are created
    """

    name = models.CharField(max_length=32)
    created_at = models.DateTimeField(auto_now_add=True)


class User(models.Model):
    """Model for site users."""
    username = models.CharField(max_length=25)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    phone_number = models.CharField(max_length=20, primary_key=True, validators=phone_validator)

class Order(models.Model):
    """Model for user orders."""

    pass


class OrderItem(models.Model):
    """Intermediary model for items in a user's orders."""

    pass


class MenuItem(models.Model):
    """Model for menu items."""

    pass
