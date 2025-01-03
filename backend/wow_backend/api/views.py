from rest_framework import status
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

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
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


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
        # needs to take self.request.user in account
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


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
