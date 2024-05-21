# urls.py

from django.urls import path, include
from .views import APIRootView
from .api_router import router

urlpatterns = [
    path('', include(router.urls)),
    path('api-root/', APIRootView.as_view(), name='api-root'),
]
