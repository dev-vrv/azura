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
        routes = APIRootRout().make_api_root(router.urls)
        return Response(routes)

class APIRootRout:
    def __init__(self) -> None:
        pass
    
    def make_api_root(self, urls):
        routes = {}
        for index, url in enumerate(urls):
            if not self.__is_app__(url):
                continue
            
            app_name = self.__get_app_name__(url)
            if app_name not in routes:
                routes[app_name] = {}
                
            route_name = self.__get_route_name__(url)
            routes[app_name][route_name] = {
                'url': url.pattern.regex.pattern,
            }
                    
            serializer_instance = self.__detect_serializer__(url)
            if serializer_instance:
                if 'fields_display' not in routes[app_name]:
                    routes[app_name]['display_fields'] = serializer_instance.get_fields_display()
                    
                if 'fields_groups' not in routes[app_name]:
                    routes[app_name]['fields_groups'] = serializer_instance.get_form_groups()
        return routes

    
    def __is_app__(self, url):
        if url.name == 'api-root':
            return False
        else:
            return True
        
    def __detect_serializer__(self, url):
        serializer_instance = None
        if hasattr(url.callback.cls, 'serializer_class'):
            serializer_class = url.callback.cls.serializer_class
            serializer_instance = serializer_class()
        return serializer_instance
    
    def __get_app_name__(self, url):
        return url.name.split('-')[0].lower()
    
    def __get_route_name__(self, url):
        return '-'.join(url.name.split('-')[1:]) if '-' in url.name else url.name
    

    
urlpatterns = [
    path('', include(router.urls)),
    path('api-root/', APIRootView.as_view(), name='api-root'),
]
