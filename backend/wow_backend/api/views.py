# from django.shortcuts import render

# Create your views here.
from api.models import MenuItem
from api.serializers import MenuItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 

class MenuItemView(APIView): 
    def get(self, request, **kwargs):
        menu_id = kwargs.get("pk")
        menu_Item = MenuItem.objects.get(id=menu_id)

        serializer = MenuItemSerializer(
            instance = menu_Item)
        
        return Response(
            serializer.data, 
            status = status.HTTP_201_CREATED
        )
    
    def put(self, request, **kwargs): 
        menu_id = kwargs.get("pk", None) # default id to none 

        if menu_id is None: 
            return Response(
                {"error": "Menu ID is required."},
                status=status.HTTP_400_BAD_REQUEST
        )

        try: 
            menu_Item = MenuItem.objects.get(id=menu_id)
        
        except MenuItem.DoesNotExist:
            return Response(
                {"error": "MenuItem not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = MenuItemSerializer(
            instance = menu_Item, data = request.data)
        
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            ) 

        serializer.save()

        return Response(
            serializer.data, 
            status = status.HTTP_201_CREATED
        )
    
class createMenuItemView(APIView): 
    def post(self, request, *args, **kwargs):
        serializer = MenuItemSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)