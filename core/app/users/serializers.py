from admin.serializers import BaseAdminSerializer
from .models import User
from rest_framework import serializers

class UserAdminSerializer(BaseAdminSerializer):
    display_fields = ['id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser', 'last_login']
    display_link = 'email'
    readonly_fields = ['id', 'last_login', 'created_at', 'updated_at', 'password']
    exclude_list = ['password']
    form_groups = (
        {
            'name': 'user_information',
            'fields': ('id', 'email', 'phone', 'first_name', 'last_name', 'birthday', 'photo'),
            'description': 'User profile information'
        },
        {
            'name': 'address_information',
            'fields': ('address', 'city', 'state', 'country', 'zip_code'),
            'description': 'User Address Information'
        },
        {
            'name': 'permissions',
            'fields': ['is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'],
            'description': 'User permissions & status'
        },
        {
            'name': 'important_dates',
            'fields': ['last_login', 'created_at', 'updated_at'],
            'description': 'Important dates'
        }
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
    
    