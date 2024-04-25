from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser as User
import re

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('email', 'password1', 'password2')

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError('Email already exists')
        return email

    def clean_password1(self):
        password1 = self.cleaned_data.get('password1')
        if len(password1) < 8:
            raise forms.ValidationError('Password must be at least 8 characters long')
        if not re.search('[0-9]', password1):
            raise forms.ValidationError('Password must contain at least one digit')
        if not re.search('[a-zA-Z]', password1):
            raise forms.ValidationError('Password must contain at least one letter')
        return password1

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError('Passwords do not match')
        return password2