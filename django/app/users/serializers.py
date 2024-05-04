from rest_framework.serializers import ModelSerializer
from .models import User
from rest_framework import serializers


class SignInSerializer(ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = User
        fields = ('email', 'password')
        
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        user = User.objects.filter(email=email) if email else None
        
        if not email:
            raise serializers.ValidationError('Email is required')
                
        if not password:
            raise serializers.ValidationError('Password is required')
        
        if not user.exists() or not user.first().check_password(password):
            raise serializers.ValidationError('Invalid email or password')
        
        return data
    
class SignUpSerializer(ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = User
        fields = ('email', 'password', 'password2')
        
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        password2 = data.get('password2')
        if not email:
            raise serializers.ValidationError('Email is required')
        elif User.objects.filter(email=email).exists():
            raise serializers.ValidationError('Email already exists')
        
        if not password or not password2:
            raise serializers.ValidationError('Password is required')
        elif password != password2:
            raise serializers.ValidationError('Passwords do not match')
        elif len(password) < 8:
            raise serializers.ValidationError('Password must be at least 8 characters long')
        elif not any(char.isdigit() for char in password):
            raise serializers.ValidationError('Password must contain at least one digit') 
        
        data.pop('password2')
        
        return data
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
        
class UserInfoSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'phone',
            'country',
            'city',
            'address',
            'zip_code',
            'is_active',
            'is_staff',
            'is_superuser',
            'created_at',
            'status',
        )
        read_only_fields = ('email', 'id')

class UserAdminSerializer(ModelSerializer):
    class Meta:
        model = User
        created_at = serializers.SerializerMethodField()
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'phone',
            'country',
            'city',
            'address',
            'zip_code',
            'is_active',
            'is_staff',
            'is_superuser',
            'created_at',
            'status',
        )
        read_only_fields = ('email', 'id')
        
    def created_at(self, obj):
        return obj.created_at.strftime('%Y-%m-%d %H:%M:%S')
    
    def get_field_types(self):
        return {
            'id': 'readonly',
            'email': 'readonly',
            'first_name': 'text',
            'last_name': 'text',
            'phone': 'text',
            'country': 'text',
            'city': 'text',
            'address': 'text',
            'zip_code': 'text',
            'is_active': 'boolean',
            'is_staff': 'boolean',
            'is_superuser': 'boolean',
            'created_at': 'readonly',
            'status': 'select',
        }
    