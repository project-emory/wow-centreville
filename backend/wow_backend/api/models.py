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

    phone_number = models.CharField(
        max_length=20, primary_key=True, validators=phone_validator
    )
    username = models.CharField(max_length=25)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class MenuItem(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Order(models.Model):
    """Model for user orders."""

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    menu_items = models.ManyToManyField(MenuItem, through="OrderItem")
    payment_status = models.CharField(max_length=20, default="unpaid")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total_amount(self):
        return sum(item.price for item in self.menu_items.all())

    class Meta:
        ordering = ["-created_at"]


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="order_items"
    )
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("order", "menu_item")
