from django.shortcuts import render
from rest_framework import response
from rest_framework.viewsets import ViewSet
from .serializers import UserSerializer
from .forms import CustomUserCreationForm
from .models import CustomUser as User
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken


class UserInfo(ViewSet):
    def user_info(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = request.user
            serializer = UserSerializer(user)
            return response.Response(serializer.data)     
        else:
            return response.Response({'message': 'anonymous'})
        
class UserRegistration(ViewSet):
    def registration(self, request, *args, **kwargs):
        if request.method == 'POST':
            form = CustomUserCreationForm(request.data)
            if form.is_valid():
                user = form.save()
                serializer = UserSerializer(user)
                return response.Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return response.Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
        return response.Response({'message': 'GET request not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
class UserLogin(ViewSet):
    def login(self, request, *args, **kwargs):
        if request.method == 'POST':
            email = request.data.get('email')
            password = request.data.get('password')
            user = User.objects.filter(email=email).first()
            if user and user.check_password(password):
                refresh = RefreshToken.for_user(user)
                return response.Response({
                    'heading': 'Login successful',
                    'message': 'You are now logged in as ' + user.email,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_200_OK)
            else:
                responseData = {
                    'heading': 'Login Failed',
                    'message': 'Invalid email or password',
                    'type': 'danger'
                }
                return response.Response(responseData, status=status.HTTP_400_BAD_REQUEST)
        return response.Response({'message': 'GET request not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
class UsersController(ViewSet):
    def get_users(self, request, *args, **kwargs):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return response.Response(serializer.data)
    def update_user(self, request, *args, **kwargs):
        print(request.data)
        return response.Response({})
    def delete_users(self, request, *args, **kwargs):
        print(request.data)
        return response.Response({})
    