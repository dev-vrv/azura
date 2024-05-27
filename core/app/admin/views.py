from rest_framework.views import APIView
from rest_framework.response import Response
from .admin_router import urls
import re

class APIRootView(APIView):
    def get(self, request, *args, **kwargs):
        info = APIRootRout().create_api_info(urls)
        return Response(info)

class APIRootRout:
    def __init__(self) -> None:
        pass
    
    def create_api_info(self, urls):
        self.api_info = {
            'endpoints': self.__get_endpoints__(urls),

        }
        


            # app_name = self.__get_app_name__(url)
            # route_name = self.__get_route_name__(url).replace('-', '_')
            # serializer_instance = self.__get_serializer__(url)

            # self.__routes__[app_name] = self.__routes__.get(app_name, {})
            # self.__routes__[app_name][route_name] = {
            #     'action': self.__get_action_name__(url),
            #     'method': self.__get_method__(url),
            # }

            # if route_name == 'retrieve_form':
            #     self.__set_app_params__(serializer_instance, self.__routes__[app_name])
                
        return self.api_info

    def __get_endpoints__(self, urls):
        endpoints = {}
        for url in urls:
            app_name = self.__get_app_name__(url)
            route_name = self.__get_route_name__(url).replace('-', '_')
            method = self.__get_method__(url)
            action = self.__get_action_name__(url)
            
            if self.__is_app__(url):
                if app_name not in endpoints:
                    endpoints[app_name] = {}
                endpoints[app_name][route_name] = {
                    'action': action,
                    'method': method,
                }
            
            
        return endpoints

    def __is_app__(self, url):
        if url.name == 'api-root':
            return False
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

    def __get_action_name__(self, url):
        if hasattr(url.callback, 'actions'):
            return list(url.callback.actions.values())[0]
        return None

    def __get_method__(self, url):
        if hasattr(url.callback, 'actions'):
            return list(url.callback.actions.keys())[0]
        return None

    def __set_app_params__(self, serializer_instance, app):
        if serializer_instance:
            if 'fields_display' not in app:
                app['display_fields'] = serializer_instance.get_fields_display()
            if 'form_groups' not in app:
                app['form_groups'] = serializer_instance.get_form_groups()
            if 'display_link' not in app:
                app['display_link'] = serializer_instance.display_link
