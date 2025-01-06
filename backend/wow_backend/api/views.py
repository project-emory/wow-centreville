# from django.shortcuts import render

# Create your views here.
from backend.wow_backend.api.models import MenuItem
from backend.wow_backend.api.serializers import MenuItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class updateMenuItemView(APIView): 
    def putMenuItem(self, request, *args, **kwargs): 
        menu_id = request.query_parems.get("id", None) # default id to none 
        
        # if menu_id is None:
            # add logics
         
        menu_Item = MenuItem.objects.get(id=menu_id)
        
        serializer = MenuItemSerializer(
            instance = menu_Item, data = request.data)
        
        # is_valid = deserialized.is_valid()

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