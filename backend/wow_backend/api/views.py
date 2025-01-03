from rest_framework.viewsets import ModelViewSet

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

    # TODO: add authorization

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
