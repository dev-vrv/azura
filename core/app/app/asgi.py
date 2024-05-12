import os
from django.core.asgi import get_asgi_application
from django.urls import re_path, path
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.conf import settings
from django.utils.module_loading import import_string

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django_asgi_app = get_asgi_application()

http_routes = [re_path(r"", django_asgi_app)]
websocket_routers = import_string('app.routing.websocket_urlpatterns')

application = ProtocolTypeRouter({
    "http": URLRouter(http_routes),
    'websocket': AuthMiddlewareStack(URLRouter(websocket_routers)),
})