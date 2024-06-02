from rest_framework.views import APIView
from rest_framework.response import Response
from .admin_router import routes
from .api import Endpoints
from users.models import User


class APIRootView(APIView):
    def get(self, request, *args, **kwargs):
        endpoints = Endpoints(request=request, routes=routes)
        api_manual = endpoints.get_api_manual()

        # for i in range(1, 1000):
        #     n_user = {
        #         'email': f'some_email{str(i)}@gmail.com',
        #         'password': 'some_password',
        #         'first_name': 'some_first_name',
        #         'last_name': 'some_last_name',
        #     }
        #     User.objects.create_user(**n_user)
        

        return Response(api_manual)
