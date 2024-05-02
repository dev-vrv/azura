from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializers import SignInSerializer, SignUpSerializer, UserInfoSerializer
from .models import User

import json

class UserSessionSet(viewsets.ViewSet):

    @action(methods=['get'], detail=False, url_path='info', permission_classes=[IsAuthenticated])
    def info(self, request):
        if not request.user.is_authenticated:
            return Response({
                'detail': 'Authentication credentials were not provided'
            }, status=status.HTTP_401_UNAUTHORIZED)
        return Response(UserInfoSerializer(request.user).data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False, url_path='sign-up')
    def sign_up(self, request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=False, url_path='sign-in')
    def sign_in(self, request):
        serializer = SignInSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.get(email=serializer.validated_data['email'])
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


