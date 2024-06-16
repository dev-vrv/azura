from api.serializers import BaseAdminSerializer
from .models import Mails

class MailsAdminSerializer(BaseAdminSerializer):
    class Meta:
        model = Mails
        fields = '__all__'
