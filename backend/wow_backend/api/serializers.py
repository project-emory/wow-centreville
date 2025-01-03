from rest_framework import serializers
from api.models import User, Order, OrderItem, MenuItem
from django.db import transaction


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the `User` model."""

    class Meta:
        model = User
        fields = ("phone_number", "username", "verified", "created_at", "updated_at")
        read_only_fields = ("verified", "created_at", "updated_at")


class UserCreateSerializer(serializers.ModelSerializer):
    """Serializer for creation of the `User` model."""

    class Meta:
        model = User
        fields = ("phone_number", "username", "password")

    def create(self, validated_data):
        user = User.objects.create_user(
            phone_number=validated_data["phone_number"],
            username=validated_data["username"],
            password=validated_data["password"],
        )
        return user


class MenuItemSerializer(serializers.ModelSerializer):
    """Serializer for the `MenuItem` model."""

    class Meta:
        model = MenuItem
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    """Serializer for the `OrderItem` model."""

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


class OrderSerializer(serializers.ModelSerializer):
    """Serializer for the `Order` model."""

    order_items = OrderItemSerializer(many=True, required=False)
    total_amount = serializers.DecimalField(
        max_digits=7,
        decimal_places=2,
        read_only=True,
    )

    class Meta:
        model = Order
        fields = "__all__"

    def create(self, validated_data: dict):
        """Custom create method to handle `order_items`."""
        # fetch order items
        order_items_data = validated_data.pop("order_items", [])

        # create instances
        with transaction.atomic():
            order = Order.objects.create(**validated_data)

            for item_data in order_items_data:
                OrderItem(
                    order=order,
                    **item_data,
                )

        return order
