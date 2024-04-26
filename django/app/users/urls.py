from django.urls import path
from .views import UserInfo, UserRegistration, UserLogin, UsersController
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('login/', UserLogin.as_view({"post": "login"})),
    path('registration/', UserRegistration.as_view({"post": "registration"})),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('info/', UserInfo.as_view({"get": "user_info"})),
    path('controller/', UsersController.as_view({"get": "get_users", "post": "update_user", "delete": "delete_users"})),
]
