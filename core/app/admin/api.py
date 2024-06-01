from typing import TypedDict, List, Dict, Union
from urllib.parse import urljoin
import re


APPS_ACTIONS = {
    'change_form': 'retrieve_item_form',
    'creation_form': 'create_item_form',
    'detail': 'retrieve_item',
    'list': 'retrieve_items',
}


class Endpoints:
    def __init__(self, request, routes) -> None:
        self.request = request
        self.routes = routes

    def get_api_manual(self):
        self.manual = {
            'api': {
                'host': self.__get_full_url__(''),
                'name': 'Azura',
                'description': 'Azura API',
                'version': '1.06',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer <token>',
                    'csrf': '<token>',
                }
            },
            'apps': [''],
            'actions': APPS_ACTIONS,
            'endpoints': {},
        }

        for route in self.routes:
            if not self.__is_app__(route):
                continue
                
            app_name = self.__get_app_name__(route)
            serializer = self.__get_serializer__(route)
            action_name = self.__get_action_name__(route)
            point_method = self.__get_method_name__(route)
            point_request_params = self.__get_request_params__(route)
            point_url = self.__get_full_url__(route.pattern.regex.pattern)
            

            self.manual['apps'].append(app_name) if app_name not in self.manual['apps'] else None
            self.manual['endpoints'].setdefault(app_name, {})
            
            endpoint = {
                'url': point_url,
                'params': point_request_params,
                'methods': point_method,
            }
            
            self.__set_route_params__(endpoint, action_name, serializer)
            
            self.manual['endpoints'][app_name][action_name] = endpoint
            

        
        return self.manual
        
        
    # Private Getters
        
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
    
    def __get_serializer__(self, route) -> object:
        serializer_instance = None
        if hasattr(route.callback.cls, 'serializer_class'):
            serializer_class = route.callback.cls.serializer_class
            serializer_instance = serializer_class()
        return serializer_instance

    def __get_request_params__(self, route):
        pattern = route.pattern.regex.pattern        
        request_params = re.findall(r'<(.*?)>', pattern)
        request_params.remove('format') if 'format' in request_params else None
        return request_params if request_params else None
    
    def __get_full_url__(self, pattern):
        base_url = self.request.build_absolute_uri('/admin/') 
    
        without_brackets = re.sub(r'\(\?P<\w+>[^)]+\)', '', pattern)
        cleaned_string = re.sub(r'[^a-zA-Z0-9/_-]', '', without_brackets)
        
        full_url = urljoin(base_url, cleaned_string)
        return full_url
    
    
    # Private Predicates
    
    def __is_app__(self, route) -> bool:
        if route.name == 'api-root':
            return False
        return True


    # Private Setters
    
    def __set_route_params__(self, endpoint, action, serializer):
        if action == APPS_ACTIONS['list']:
            if 'fields_display' not in endpoint:
                endpoint['fields_display'] = serializer.get_fields_display()
            if 'display_link' not in endpoint:
                endpoint['field_link'] = serializer.display_link
        elif action == APPS_ACTIONS['change_form'] or action == APPS_ACTIONS['creation_form']:
            if 'form_groups' not in endpoint:
                endpoint['form_groups'] = serializer.get_form_groups()