from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from .models import MenuItem, Order, User
from .serializers import MenuItemSerializer, OrderSerializer, UserSerializer


class UserViewSet(
    GenericViewSet,  # generic view functionality
    CreateModelMixin,  # handles POST
    RetrieveModelMixin,  # handles GETs for 1
    UpdateModelMixin,  # handles PUTs and PATCHes
    ListModelMixin,  # handles GETs for many
):
    """View set for the `User` model."""

    # TODO: add authorization

    serializer_class = UserSerializer
    queryset = User.objects.all()


class OrderViewSet(
    ModelViewSet,
):
    """View set for the `Order` model."""

    serializer_class = OrderSerializer

    def get_queryset(self):
        orders = Order.objects.all()
        return orders
        # TODO: should link user with `User`` model and automatically fetch a user's orders
        # return orders.filter(user=self.request.user)


class MenuItemViewSet(
    ModelViewSet,
):
    """View set for the `MenuItem` model."""

    serializer_class = MenuItemSerializer

    def get_queryset(self):
        """Default queryset -- returns all available items."""
        items = MenuItem.objects.all()
        items = (
            [item for item in items if item.is_available]
            if self.request.query_params.get("available") is not None
            else items
        )
        return items
