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

    pass


class OrderSerializer(serializers.Serializer):
    """Serializer for the Order model."""

    pass


class OrderItemSerializer(serializers.Serializer):
    """Serializer for the OrderItem model."""

    pass


class MenuItemSerializer(serializers.Serializer):
    """Serializer for the MenuItem model."""

    pass
