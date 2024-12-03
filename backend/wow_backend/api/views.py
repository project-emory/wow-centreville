from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.viewsets import GenericViewSet

from .models import User
from .serializers import UserSerializer


class UserViewSet(
    GenericViewSet,  # generic view functionality
    CreateModelMixin,  # handles POST
    RetrieveModelMixin,  # handles GETs for 1
    UpdateModelMixin,  # handles PUTs and PATCHes
    ListModelMixin,
):  # handles GETs for many
    """View set for the `User` model."""

    serializer_class = UserSerializer
    queryset = User.objects.all()
