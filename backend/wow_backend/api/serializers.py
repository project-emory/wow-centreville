from rest_framework import serializers
from api.models import User, Order, OrderItem, MenuItem


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model."""

    class Meta:
        model = User
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    """Serializer for the Order model."""

    total_amount = serializers.ReadOnlyField()

    class Meta:
        model = Order
        fields = "__all__"


class MenuItemSerializer(serializers.ModelSerializer):
    """Serializer for the OrderItem model."""

    class Meta:
        model = MenuItem
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    """Serializer for the MenuItem model."""

    class Meta:
        model = OrderItem
        fields = "__all__"

    def validate_quantity(self, value):
        if value < 1:
            raise serializers.ValidationError("Quantity must be greater than 1.")
        return value

    def validate(self, data):
        menu_item = data.get("menu_item")

        if not menu_item.is_available:
            raise serializers.ValidationError(
                f"The menu item '{menu_item.name}' is currently unavailable."
            )

        return data
