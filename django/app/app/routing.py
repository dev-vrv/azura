from django.urls import re_path
from command.consumer import StatsConsumer

websocket_urlpatterns = [
    re_path(r'ws/stats/', StatsConsumer.as_asgi()),
]