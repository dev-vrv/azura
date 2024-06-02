from admin.serializers import BaseAdminSerializer
from .models import User
from rest_framework import serializers

class UserAdminSerializer(BaseAdminSerializer):
    fields_display = ['id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser', 'status', 'created_at']
    fields_link = ['id', 'email']
    readonly_fields = ['id', 'last_login', 'created_at', 'updated_at', 'password', 'email']
    exclude_list = ['password']
    form_groups = (
        {
            'name': 'user_information',
            'fields': (
                'id', 
                'email', 
                'phone', 
                'first_name', 
                'last_name', 
                ),
        },
        {
            'name': 'address_information',
            'fields': ('address', 'city', 'state', 'country', 'zip_code'),
        },
        {
            'name': 'more_information',
            'fields': ('birthday', 'photo'),
        },
        {
            'name': 'important_dates',
            'fields': ['last_login', 'created_at', 'updated_at'],
        },
        {
            'name': 'permissions',
            'fields': ['is_active', 'is_staff', 'is_superuser', 'status', 'groups', 'user_permissions'],
        },
    )
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance
    
    