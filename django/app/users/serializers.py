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
        return obj.created_at.strftime('%Y-%m-%d %H:%M')
    
    def get_field_types(self, obj):
        return {
            'id': {
                'value': obj.id,
                'type': 'number',
                'readOnly': True,
            },
            'email': {
                'value': obj.email,
                'type': 'email',
                'readOnly': True,
            },
            'first_name': {
                'value': obj.first_name,
                'type': 'text',
                'readOnly': False,
            },
            'last_name': {
                'value': obj.last_name,
                'type': 'text',
                'readOnly': False,
            },
            'birthday': {
                'value': obj.birthday.strftime('%Y-%m-%d') if obj.birthday else '',
                'type': 'date',
                'readOnly': False,
            },
            'phone': {
                'value': obj.phone,
                'type': 'tel',
                'readOnly': False,
            },
            'country': {
                'value': obj.country,
                'type': 'text',
                'readOnly': False,
            },
            'city': {
                'value': obj.city,
                'type': 'text',
                'readOnly': False,
            },
            'address': {
                'value': obj.address,
                'type': 'text',
                'readOnly': False,
            },
            'zip_code': {
                'value': obj.zip_code,
                'type': 'text',
                'readOnly': False,
            },
            'is_active': {
                'value': obj.is_active,
                'type': 'checkbox',
                'readOnly': False,
            },
            'is_staff': {
                'value': obj.is_staff,
                'type': 'checkbox',
                'readOnly': False,
            },
            'is_superuser': {
                'value': obj.is_superuser,
                'type': 'checkbox',
                'readOnly': False,
            },
            'created_at': {
                'value': obj.created_at.strftime('%Y-%m-%d %H:%M'),
                'type': 'datetime',
                'readOnly': True,
            },
            'updated_at': {
                'value': obj.updated_at.strftime('%Y-%m-%d %H:%M'),
                'type': 'datetime',
                'readOnly': True,  
            },
            'last_session': {
                'value': obj.last_session.strftime('%Y-%m-%d %H:%M') if obj.last_session else '',
                'type': 'datetime',
                'readOnly': True,
            },
            'status': {
                'value': obj.status,
                'options': [choice[0] for choice in obj.STATUS_CHOICES],
                'type': 'select',
                'readOnly': False,
            },
            'subscribe': {
                'value': obj.subscribe,
                'type': 'checkbox',
                'readOnly': False,
            },
            'protect_2fa': {
                'value': obj.protect_2fa,
                'type': 'checkbox',
                'readOnly': False,
            },
        }


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def to_internal_value(self, data):
        invalid_fields = ['id', 'email', 'password']
        return {field: value for field, value in data.items() if field not in invalid_fields}