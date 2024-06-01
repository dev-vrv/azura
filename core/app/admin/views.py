from rest_framework.views import APIView
from rest_framework.response import Response
from .admin_router import routes
from .api import Endpoints

class APIRootView(APIView):
    def get(self, request, *args, **kwargs):
        endpoints = Endpoints(request=request, routes=routes)
        api_manual = endpoints.get_api_manual()
        return Response(api_manual)
