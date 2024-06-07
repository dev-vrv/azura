from django.urls import path
from .views import ApiRoot

urlpatterns = [
    path('params/', ApiRoot.as_view({'get': 'params'})),
]