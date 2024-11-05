from rest_framework import serializers

from backend.wow_backend.api.models import OrderItem,User, Order, MenuItem


class UserSerializer(serializers.Serializer):
    """Serializer for the User model."""

    pass


class OrderSerializer(serializers.Serializer):
    """Serializer for the Order model."""

    pass


class OrderItemSerializer(serializers.Serializer):
    """Serializer for the OrderItem model."""

    pass


class MenuItemSerializer(serializers.Serializer):
    """Serializer for the MenuItem model."""
    class Meta:
        model = OrderItem
        fields = ['order', 'menu_item', 'quantity', 'created_at', 'updated_at']

    def validate_quantity(self, value):
        if value < 1:
            raise serializers.ValidationError("Quantity must be greater than 1.")
        return value

    def validate(self, data):
        menu_item = data.get('menu_item')

        if not menu_item.is_available:
            raise serializers.ValidationError(f"The menu item '{menu_item.name}' is currently unavailable.")

        return data

