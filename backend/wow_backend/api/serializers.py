from rest_framework import serializers
from rest_framework.authtoken.models import Token

from django.contrib.auth.password_validation import validate_password
from django.db import transaction

from api.models import User, Order, OrderItem, MenuItem


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the `User` model."""

    class Meta:
        model = User
        fields = (
            "id",
            "phone_number",
            "username",
            "verified",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("verified", "created_at", "updated_at")


class UserCreateSerializer(serializers.ModelSerializer):
    """Serializer for creation of the `User` model."""

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )

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

    def to_representation(self, instance: User):
        token, _ = Token.objects.get_or_create(user=instance)
        user_data = UserSerializer(instance).data
        return {"token": token.key, "user": user_data}


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
        extra_kwargs = {
            "order": {"read_only": True}  # ✅ Prevents "order is required" error
        }

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
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    order_items = OrderItemSerializer(many=True, required=False)
    total_amount = serializers.DecimalField(
        max_digits=7,
        decimal_places=2,
        read_only=True,
    )

    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ["user"]

    def create(self, validated_data: dict):
        order_items_data = validated_data.pop("order_items", [])
        user_field = validated_data.pop("user", None)
        
        # Ensure we get the User instance
        try:
            user = User.objects.get(id=user_field.id) if hasattr(user_field, "id") else User.objects.get(id=user_field)
        except User.DoesNotExist:
            raise serializers.ValidationError({"user": "User does not exist."})
        
        if not order_items_data:
            raise serializers.ValidationError({"order_items": "At least one menu item is required."})
        
        with transaction.atomic():
            # Create the Order first
            order = Order.objects.create(user=user, **validated_data)
            print("Created order with id:", order.id)
            
            # For each order item, explicitly pass the IDs
            for item_data in order_items_data:
                menu_item_instance = item_data['menu_item']
                quantity = item_data.get('quantity')
                print("Creating OrderItem with menu_item id:", menu_item_instance.id, "and quantity:", quantity)
                OrderItem.objects.create(
                    order_id=order.id,  # explicitly pass order id
                    menu_item_id=menu_item_instance.id,  # explicitly pass menu_item id
                    quantity=quantity
                )
        
        return order

    def update(self, instance, validated_data):
        # Pop nested data from validated_data
        order_items_data = validated_data.pop("order_items", None)
        
        # Update the order instance's top-level fields
        instance.is_paid = validated_data.get("is_paid", instance.is_paid)
        # Update other fields as needed...
        instance.save()

        # If nested order_items data is provided, update them.
        if order_items_data is not None:
            # Option A: Replace all order items with the new list
            # (If you need to update partially, you'll need more logic to update vs. create vs. delete)
            instance.order_items.all().delete()  # Remove existing nested items
            for item_data in order_items_data:
                # Create new order items linked to the order
                OrderItem.objects.create(order=instance, **item_data)

        return instance

    
