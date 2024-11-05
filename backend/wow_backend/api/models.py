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
    pass
