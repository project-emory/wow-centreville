from rest_framework import serializers
from api.models import TestUser, User, Order, OrderItem, MenuItem


class TestUserSerializer(serializers.ModelSerializer):
    """
    Test user serializer for initial setup.

    TODO: remove once other serializers are created
    """

    class Meta:
        model = TestUser
        fields = ["id", "name", "created_at"]


class UserSerializer(serializers.Serializer):
    """Serializer for the User model."""

    class Meta:
        model = User
        fields = ["username", "phone_number", "created_at", "updated_at"]


class OrderSerializer(serializers.ModelSerializer):
    """Serializer for the Order model."""

    total_amount = serializers.ReadOnlyField()

    class Meta:
        model = Order
        fields = "__all__"


class MenuItemSerializer(serializers.Serializer):
    """Serializer for the OrderItem model."""

    class Meta:
        model = MenuItem
        fields = "__all__"


class OrderItemSerializer(serializers.Serializer):
    """Serializer for the MenuItem model."""

    class Meta:
        model = OrderItem
        fields = ["order", "menu_item", "quantity", "created_at", "updated_at"]

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
