from django.db import models


class User(models.Model):
    """Model for site users."""

    pass


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
    """Intermediary model for items in a user's orders."""

    pass


class MenuItem(models.Model):
    """Model for menu items."""
