from admin.views import BaseAdminController
from .models import User
from .serializers import UserAdminSerializer


class UserAdminController(BaseAdminController):
    model = User
    serializer_class = UserAdminSerializer