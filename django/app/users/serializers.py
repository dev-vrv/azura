from rest_framework.serializers import ModelSerializer
from .models import CustomUser as User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    status = serializers.CharField(source='get_status_display')
    created_at = serializers.DateTimeField(format='%d.%m.%y - %H:%M')

    def get_role(self, obj):
        if obj.is_superuser:
            return 'Admin'
        elif obj.is_staff:
            return 'Staff'
        else:
            return 'Client'
        
    class Meta:
        model = User
        fields = (
            'id', 
            'email', 
            'first_name', 
            'last_name', 
            'is_active', 
            'is_staff', 
            'is_superuser', 
            'role', 
            'status',
            'created_at', 
        )
