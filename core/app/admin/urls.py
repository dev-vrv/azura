from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.admin import UserAdminController
from rest_framework.response import Response
from rest_framework.views import APIView
from mail.admin import MailsAdminController

router = DefaultRouter()
router.register(r'users', UserAdminController, basename='Users')
router.register(r'mails', MailsAdminController, basename='Mails')

class APIRootView(APIView):
    def get(self, request, *args, **kwargs):
        routes = {}
        for url in router.urls:
            serializer_class = None
            if '(?P<format>' in str(url.pattern) or 'api-root' in str(url.name):
                continue
            if hasattr(url.callback.cls, 'serializer_class'):
                serializer_class = url.callback.cls.serializer_class
                serializer_instance = serializer_class()
                
            if hasattr(url, 'name') and url.name: 
                app_name = url.name.split('-')[0].lower()
                rout_name = '-'.join(url.name.split('-')[1:]) if '-' in url.name else url.name
                methods = [method for method in getattr(url.callback, 'actions', {}).keys()]
                
                route_info = {
                    'path': str(url.pattern),
                    'methods': methods,
                }
                
                if app_name not in routes:
                    routes[app_name] = {}
                routes[app_name][rout_name] = route_info
                
                if 'display_fields' not in routes[app_name] and serializer_instance:
                    routes[app_name]['display_fields'] = serializer_instance.get_display_fields()
                    
                if 'form_groups' not in routes[app_name] and serializer_instance:
                    routes[app_name]['form_groups'] = serializer_instance.get_form_groups()
                    
                if 'form_fields' not in routes[app_name] and serializer_instance:
                    routes[app_name]['form_fields'] = serializer_instance.get_form_fields()

        return Response(routes)

urlpatterns = [
    path('', include(router.urls)),
    path('api-root/', APIRootView.as_view(), name='api-root'),
]
