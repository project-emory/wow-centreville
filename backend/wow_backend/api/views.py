from rest_framework import status
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.db import transaction
from django.contrib.auth import authenticate

from .models import MenuItem, Order, User
from .serializers import (
    MenuItemSerializer,
    OrderSerializer,
    UserCreateSerializer,
    UserSerializer,
)


class UserViewSet(
    ModelViewSet,
):
    """View set for the `User` model."""

    lookup_field = "id"

    def get_serializer_class(self):
        """Return a different serializer depending on operation."""
        if self.action == "create":
            return UserCreateSerializer
        return UserSerializer

    def get_queryset(self):
        users = User.objects.all()
        return users
        # TODO: should only return logged in user - other users should be unviewable by anyone except admin + self

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        typeofrequest = request.method == "PATCH"

        instance = self.get_object()
        updated_fields = list(request.data.keys())
        restricted_fields = ["verified", "is_active", "is_admin", "created_at"]
        if any(field in updated_fields for field in restricted_fields):
            return Response(
                {"Error:You cannot change these fields"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(
            instance, data=request.data, partial=typeofrequest
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.is_admin:
            Request({"Error": "Cant delete admin!"}, status=status.HTTP_400_BAD_REQUEST)
        self.perform_destroy(instance)
        return Response(
            {"message": "User deleted successfully."}, status=status.HTTP_200_OK
        )


class LoginViewSet(ViewSet):
    """View for authenticating users and returning tokens."""

    def create(self, request: Request):
        phone_number = request.data.get("phone_number")
        # username = request.data.get("username")
        password = request.data.get("password")

        # TODO: continue: allow logging in with username
        # if not (phone_number or username) or not password:
        if not phone_number or not password:
            return Response(
                {"error": "Please provide a phone number and password"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(phone_number=phone_number, password=password)

        if user:
            # TODO: add token expiry and rate limiting
            token, _ = Token.objects.get_or_create(user=user)

            return Response({"token": token.key, "user": UserSerializer(user).data})
        else:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class OrderViewSet(
    ModelViewSet,
):
    """View set for the `Order` model."""

    serializer_class = OrderSerializer

    def get_queryset(self):
        orders = Order.objects.all()

        # not very performant, but this is easiest for now -- ensure all fetched orders
        # are cleaned, so that stale orders will display cost properly
        # open to changing this in the future
        for order in [o for o in orders if not o.is_paid]:
            order.save()

        return orders
        # TODO: should link user with `User`` model and automatically fetch a user's orders
        # return orders.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        order_items = request.data.get("order_items")
        for item in order_items:
            menu_item_id = item.get("menu_item")

        if not menu_item_id:
            return Response({"error": "Menu item is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            menu_item = MenuItem.objects.get(id=menu_item_id)
        except MenuItem.DoesNotExist:
            return Response({"error": "Menu item does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        user_id = request.data.get("user")  # ✅ Extract user from request JSON
        if not user_id:
            return Response({"error": "User is required"}, status=status.HTTP_400_BAD_REQUEST)
        print(f"Received user_id: {user_id}")  # Debug user_id before querying

        try:
            user = User.objects.get(id=user_id)  # ✅ Ensure the user exists
        except User.DoesNotExist:
            return Response({"error": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Create the order within a transaction
        with transaction.atomic():
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=user)  # ✅ Save order with user

        return Response(serializer.data, status=status.HTTP_201_CREATED)


    def update(self, request, *args, **kwargs):
        typeofrequest = request.method == "PATCH"

        instance = self.get_object()
        updated_fields = list(request.data.keys())
        restricted_fields = ["user", "created_at"]
        if any(field in updated_fields for field in restricted_fields):
            return Response(
                {"Error:You cannot change these fields"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(
            instance, data=request.data, partial=typeofrequest
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Order deleted successfully."}, status=status.HTTP_200_OK
        )

class MenuItemViewSet(
    ModelViewSet,
):
    """View set for the `MenuItem` model."""

    serializer_class = MenuItemSerializer

    def get_queryset(self):
        """Default queryset -- can filter by availability."""
        items = MenuItem.objects.all()
        items = (
            [item for item in items if item.is_available]
            if self.request.query_params.get("available") is not None
            else items
        )
        return items
