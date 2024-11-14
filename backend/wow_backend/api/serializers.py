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
        fields = ['username', 'phone_number', 'created_at', 'updated_at']
    


class OrderSerializer(serializers.ModelSerializer):
    """Serializer for the Order model."""

    total_amount = serializers.ReadOnlyField()

    class Meta:
        model = Order
        fields = "__all__"


class OrderItemSerializer(serializers.Serializer):
    """Serializer for the OrderItem model."""

    pass


class MenuItemSerializer(serializers.Serializer):
    """Serializer for the MenuItem model."""

    pass
