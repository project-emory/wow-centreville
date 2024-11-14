"""Some tests to help with development."""

import os
import django

# Set up the Django settings module
os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", "backend.wow_backend.settings"
)  # Replace with your correct settings path

# Initialize Django
django.setup()

# Now import your serializers and models
from backend.wow_backend.api.models import User, MenuItem, Order, OrderItem
from backend.wow_backend.api.serializers import OrderItemSerializer


def main():
    # Example code to test your serializers
    user = User.objects.create(phone_number="1234567890")
    menu_item = MenuItem.objects.create(
        name="Test Item",
        description="Sample description",
        price=15.99,
        is_available=True,
    )
    order = Order.objects.create(user=user)
    order_item = OrderItem.objects.create(order=order, menu_item=menu_item, quantity=2)

    # Serialize the OrderItem instance
    serializer = OrderItemSerializer(order_item)
    print(serializer.data)


if __name__ == "__main__":
    main()
