# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from .api_router import urls
import re

class APIRootView(APIView):
    def get(self, request, *args, **kwargs):
        routes = APIRootRout().make_api_root(urls)
        return Response(routes)

class APIRootRout:
    def __init__(self) -> None:
        pass
    
    def make_api_root(self, urls):
        self.__routes__ = {}
        for url in urls:
            if not self.__is_app__(url):
                continue
            
            app_name = self.__get_app_name__(url)
            route_name = self.__get_route_name__(url).replace('-', '_')
            serializer_instance = self.__get_serializer__(url)
            
            self.__routes__[app_name] = self.__routes__.get(app_name, {})
            self.__set_app_params__(serializer_instance, self.__routes__[app_name])           
            self.__routes__[app_name][route_name] = {
                'url': self.__get_endpoint__(url),
            }
        return self.__routes__

    def __is_app__(self, url):
        if url.name == 'api-root':
            return False
        else:
            return True
        
    def __get_serializer__(self, url):
        serializer_instance = None
        if hasattr(url.callback.cls, 'serializer_class'):
            serializer_class = url.callback.cls.serializer_class
            serializer_instance = serializer_class()
        return serializer_instance
    
    def __get_app_name__(self, url):
        return url.name.split('-')[0].lower()
    
    def __get_route_name__(self, url):
        return '-'.join(url.name.split('-')[1:]) if '-' in url.name else url.name

    def __set_app_params__(self, serializer_instance, app):
        if serializer_instance:
            if 'fields_display' not in app:
                app['display_fields'] = serializer_instance.get_fields_display()
            if 'fields_groups' not in app:
                app['fields_groups'] = serializer_instance.get_form_groups()
            if 'display_link' not in app:
                app['display_link'] = serializer_instance.display_link
                
    def __get_endpoint__(self, url):
        pattern = url.pattern.regex.pattern
        clean_url = re.sub(r'\^|\$|\\', '', pattern)
        clean_url = re.sub(r'\(\?P<\w+>[^)]+\)', '', clean_url)
        clean_url = re.sub(r'\./', '/', clean_url)
        clean_url = re.sub(r'//+', '/', clean_url)
        clean_url = re.sub(r'\?+', '', clean_url)
        return clean_url
