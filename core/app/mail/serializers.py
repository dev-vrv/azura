from admin.serializers import BaseAdminSerializer
from .models import User
from rest_framework import serializers

class MailsAdminSerializer(BaseAdminSerializer):
    class Meta:
        model = User
        fields = '__all__'
