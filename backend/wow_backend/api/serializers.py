from rest_framework import serializers
from api.models import User, Order, OrderItem, MenuItem


class UserSerializer(serializers.Serializer):
    """Serializer for the User model."""
    class Meta:
        model = User
        fields = ['username', 'phone_number', 'created_at', 'updated_at']
    


class OrderSerializer(serializers.Serializer):
    """Serializer for the Order model."""

    pass


class OrderItemSerializer(serializers.Serializer):
    """Serializer for the OrderItem model."""

    pass


class MenuItemSerializer(serializers.Serializer):
    """Serializer for the MenuItem model."""

    pass
