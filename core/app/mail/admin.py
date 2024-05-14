from admin.views import BaseAdminController
from .models import Mails
from .serializers import MailsAdminSerializer


class MailsAdminController(BaseAdminController):
    model = Mails
    serializer_class = MailsAdminSerializer