from django.db import models


class TestUser(models.Model):
    """
    Test user model for initial set up.

    TODO: remove once other models are created
    """

    name = models.CharField(max_length=32)
    created_at = models.DateTimeField(auto_now_add=True)


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
