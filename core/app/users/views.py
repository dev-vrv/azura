from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from .models import User

import json

class UserController(viewsets.ViewSet):
    
    @action(methods=['get'], detail=False, url_path='')
    def get_user(self, request):
        paginator = PageNumberPagination()
        paginator.page_size = 20
        context = paginator.paginate_queryset(request.user, request)
        return paginator.get_paginated_response({})
    
