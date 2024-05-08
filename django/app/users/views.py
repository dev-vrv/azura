from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from .serializers import  UserAdminFormSerializer, UserAdminViewSerializer
from .models import User

import json

# class UserSessionSet(viewsets.ViewSet):

#     @action(methods=['get'], detail=False, url_path='info')
#     def info(self, request):
#         if not request.user.is_authenticated:
#             return Response({
#                 'detail': 'Authentication credentials were not provided'
#             }, status=status.HTTP_401_UNAUTHORIZED)
#         return Response(UserInfoSerializer(request.user).data, status=status.HTTP_200_OK)

#     @action(methods=['post'], detail=False, url_path='sign-up')
#     def sign_up(self, request):
#         serializer = SignUpSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             }, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     @action(methods=['post'], detail=False, url_path='sign-in')
#     def sign_in(self, request):
#         serializer = SignInSerializer(data=request.data)
#         if serializer.is_valid():
#             user = User.objects.get(email=serializer.validated_data['email'])
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             }, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserController(viewsets.ViewSet):
    
    @action(methods=['get'], detail=False, url_path='list')
    def get_users(self, request):
        paginator = PageNumberPagination()
        paginator.page_size = 20

        users = User.objects.all()
        context = paginator.paginate_queryset(users, request)
        serializer = UserAdminViewSerializer(context, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    @action(methods=['get'], detail=False, url_path='retrieve/(?P<id>[^/.]+)')
    def get_user(self, request, id=None):
        user = User.objects.get(id=id)
        serializer = UserAdminFormSerializer(user)
        return Response(serializer.get_field_types(user), status=status.HTTP_200_OK)
    

    
    @action(methods=['put'], detail=False, url_path='update')
    def update_user(self, request):
        data = json.loads(request.body)
        user = User.objects.get(id=data['id'])
        user_serializer = UserAdminFormSerializer(user, data=data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            return Response(UserAdminFormSerializer(user).data, status=status.HTTP_200_OK)
        else:
            print(user_serializer.errors)
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    # @action(methods=['delete'], detail=False, url_path='delete/(?P<id>[^/.]+)')
    # def delete_user(self, request, id=None):
    #     try:
    #         user = User.objects.get(id=id)
    #         user.delete()
    #         return Response(status=status.HTTP_200_OK)
    #     except:
    #         return Response({
    #             'detail': 'User not found'
    #         }, status=status.HTTP_404_NOT_FOUND)
    
    # @action(methods=['post'], detail=False, url_path='create')
    # def create_user(self, request):
    #     serializer = UserAdminSerializer(data=request.data)
    #     if serializer.is_valid():
    #         user = serializer.save()
    #         return Response(UserAdminSerializer(user).data, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)