from django.core.exceptions import ValidationError
from django.db import models
from re import fullmatch, sub


def phone_validator(number: str):
    """Validates that a phone number is between 10 and 15 digits long."""
    if not fullmatch(r"\d{10,15}", number):
        raise ValidationError("Phone number must be between 10 and 15 digits.")


class User(models.Model):
    """Model for site users."""

    phone_number = models.CharField(
        max_length=15, primary_key=True, validators=[phone_validator]
    )
    """Should be a string of digits between 10 and 15 digits (inclusive)."""
    verified = models.BooleanField(default=False)
    username = models.CharField(max_length=25)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        """Overridden save function that standardizes phone numbers before validation."""
        self.phone_number = sub(r"[ ()+\\-]", "", self.phone_number)
        self.clean_fields()
        super(User, self).save(*args, **kwargs)


class MenuItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Order(models.Model):
    """Model for user orders."""

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    items = models.ManyToManyField(
        MenuItem, through="OrderItem"
    )  # TODO: check why menuitem instance is expected when doing items.add()
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total_amount(self):
        return sum(item.price for item in self.items.all())

    # TODO: change clean to on retrieval, since invalid order items will most likely occur on stale orders

    def clean(self):
        """Remove any unavailable items from the order."""
        super().clean()
        # check if order exists in database so that many-to-many relationship exists
        if self.pk:
            unavailable_items = self.order_items.filter(menu_item__is_available=False)
            if unavailable_items.exists():
                unavailable_items.delete()
            self.items.remove(*unavailable_items)

    def save(self, *args, **kwargs):
        """Override save to clean unavailable items."""
        if not self.pk:
            super().save(*args, **kwargs)
            self.clean()
            super().save(*args, **kwargs)
        else:
            self.clean()
            super().save(*args, **kwargs)

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
        unique_together = ["order", "menu_item"]
