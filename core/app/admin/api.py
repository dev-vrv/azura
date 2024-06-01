from typing import TypedDict, List, Dict, Union
from urllib.parse import urljoin
import re


apps_actions_urls = {
    'change_form': 'retrieve_item_form',
    'detail': 'retrieve_item',
    'list': 'retrieve_items',
}


class Endpoints:
    def __init__(self, request, routes) -> None:
        self.request = request
        self.routes = routes

    # Getters
    
    def get_api_manual(self):
        self.manual = {
            'api': {
                'host': self.__get_full_url__(''),
                'name': 'Azura',
                'description': 'Azura API',
                'version': '1.06',
            },
            'apps': ['monitor'],
            'actions': apps_actions_urls,
        }

        points = {}
        for route in self.routes:
            if not self.__is_app__(route):
                continue
            
            app_name = self.__get_app_name__(route)
            action = self.__get_action_name__(route)
            method = self.__get_method_name__(route)
            
            if app_name not in points:
                points[app_name] = {}
                self.manual['apps'].append(app_name)
            if action not in points[app_name]:
                points[app_name][action] = {
                    'methods': method,
                    'url': self.__get_full_url__(route.pattern.regex.pattern),
                    'params': self.__get_request_params__(route),
                }

        self.manual['points'] = points
        

        return self.manual
        
    
    def __get_request_params__(self, route):
        pattern = route.pattern.regex.pattern        
        request_params = re.findall(r'<(.*?)>', pattern)
        return request_params or None
    
    def __get_full_url__(self, pattern):
        base_url = self.request.build_absolute_uri('/')
    
        without_brackets = re.sub(r'\(\?P<\w+>[^)]+\)', '', pattern)
        cleaned_string = re.sub(r'[^a-zA-Z0-9/_-]', '', without_brackets)
        
        full_url = urljoin(base_url, cleaned_string)
        return full_url
    
    def __get_serializer__(self, route) -> object:
        serializer_instance = None
        if hasattr(route.callback.cls, 'serializer_class'):
            serializer_class = route.callback.cls.serializer_class
            serializer_instance = serializer_class()
        return serializer_instance

    def __get_app_name__(self, route) -> str:
        return route.name.split('-')[0].lower()

    def __get_action_name__(self, route) -> str | None:
        if hasattr(route.callback, 'actions'):
            return list(route.callback.actions.values())[0]
        return None

    def __get_method_name__(self, route) -> str | None:
        if hasattr(route.callback, 'actions'):
            return list(route.callback.actions.keys())[0]
        return None
    
    # Setters

    def __set_app_params__(self, serializer_instance, app) -> None:
        if serializer_instance:
            if 'fields_display' not in app:
                app['display_fields'] = serializer_instance.get_fields_display()
            if 'form_groups' not in app:
                app['form_groups'] = serializer_instance.get_form_groups()
            if 'display_link' not in app:
                app['display_link'] = serializer_instance.display_link

    # Predicates
    
    def __is_app__(self, route) -> bool:
        if route.name == 'api-root':
            return False
        return True
