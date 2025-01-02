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

    def add_item(self, menu_item: MenuItem, quantity: int = 1) -> "OrderItem":
        """Add a menu item to the order with the specified quantity."""
        if not menu_item.is_available:
            raise ValueError(f"Menu item {menu_item} is not available!")

        order_item, created = OrderItem.objects.get_or_create(
            order=self, menu_item=menu_item, defaults={"quantity": quantity}
        )

        if not created:
            order_item.quantity += quantity
            order_item.save()

        return order_item

    def clean(self):
        """Remove any unavailable items from unfulfilled orders."""
        super().clean()

        # order must exist for many-to-many relationship to work
        if self.pk and not self.is_paid:
            unavailable_items = self.order_items.filter(menu_item__is_available=False)
            if unavailable_items.exists():
                unavailable_items.delete()
            self.items.remove(*unavailable_items)

    def save(self, *args, **kwargs):
        """Override save to clean unavailable items."""
        # currently does not check if the primary key exists - may run into errors when creating models?
        # problem for later ig
        self.clean()
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["-created_at"]


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="order_items"
    )
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ["order", "menu_item"]
