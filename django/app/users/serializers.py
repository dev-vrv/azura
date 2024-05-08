from rest_framework.serializers import ModelSerializer
from .models import User
from rest_framework import serializers
from command.serializers import BaseAdminFieldsSerializer, BaseAdminSerializer




class UserAdminFormSerializer(BaseAdminFieldsSerializer):
    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = (
            'id',
            'email',
            'created_at',
            'updated_at',
            'last_session',
            'password',
            'groups',
            'user_permissions',
        )

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = super().create(validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
        return instance
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        instance = super().update(instance, validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
        return instance
    
class UserAdminViewSerializer(BaseAdminSerializer):
    class Meta:
        model = User
        exclude = ('password', 'groups', 'user_permissions')
        



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

        
