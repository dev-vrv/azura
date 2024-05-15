from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .serializers import BaseAdminSerializer
from rest_framework.pagination import PageNumberPagination


class BaseAdminController(viewsets.ViewSet):
    model = None
    serializer_class = BaseAdminSerializer

    @action(detail=False, methods=['get'], url_path='form')
    def get_form(self, request):
        serializer = self.serializer_class()
        return Response(serializer.get_form_fields(), status=status.HTTP_200_OK)


    @action(detail=True, methods=['get'], url_path='form')
    def get_form_object(self, request, pk=None):
        try:
            serializer = self.serializer_class(self.model.objects.get(pk=pk))
        except self.model.DoesNotExist:
            return Response({'error': 'Object not found'}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({'error': 'Anв error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.get_form_fields(), status=status.HTTP_200_OK)


    @action(detail=True, methods=['get'], url_path='retrieve')
    def get_object(self, request, pk=None):
        obj = get_object_or_404(self.model, pk=pk)
        serializer = self.serializer_class(obj, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
        
        
    @action(detail=False, methods=['get'], url_path='retrieve')
    def get_objects(self, request):
        paginator = PageNumberPagination()
        paginator.page_size = 20
        context = paginator.paginate_queryset(self.model.objects.all(), request)
        serializer = self.serializer_class(context, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    