from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from .serializers import BaseAdminSerializer
from .api import apps_actions_urls

class BaseAdminController(viewsets.ViewSet):
    model = None
    serializer_class = BaseAdminSerializer

    @action(detail=True, methods=['get'], url_path=apps_actions_urls['change_form'])
    def retrieve_item_form(self, request, pk=None):
        try:
            serializer = self.serializer_class(self.model.objects.get(pk=pk))
        except self.model.DoesNotExist:
            return Response({'error': 'Object not found'}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({'error': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.get_form_fields(), status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'], url_path=apps_actions_urls['detail'])
    def retrieve_item(self, request, pk=None):
        obj = get_object_or_404(self.model, pk=pk)
        serializer = self.serializer_class(obj, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path=apps_actions_urls['list'])
    def retrieve_items(self, request):
        paginator = PageNumberPagination()
        paginator.page_size = 50
        context = paginator.paginate_queryset(self.model.objects.all(), request)
        serializer = self.serializer_class(context, many=True)
        return paginator.get_paginated_response(serializer.data)

    