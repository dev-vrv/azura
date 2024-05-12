from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.admin import UserAdminController
from rest_framework.response import Response
from rest_framework.views import APIView

router = DefaultRouter()
router.register(r'users', UserAdminController, basename='UserAdminController')


class APIRootView(APIView):
    def get(self, request, *args, **kwargs):
        routes = {}
        for url in router.urls:
            if hasattr(url, 'name') and url.name:
                app_name = url.name.split('-')[0]
                methods = [method for method in getattr(url.callback, 'actions', {}).keys()]
                route_info = {
                    'path': str(url.pattern),
                    'methods': methods
                }
                if app_name in routes:
                    routes[app_name].append(route_info)
                else:
                    routes[app_name] = [route_info]
        return Response(routes)

urlpatterns = [
    path('', include(router.urls)),
    path('api-root/', APIRootView.as_view(), name='api-root'),
]
