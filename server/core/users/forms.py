from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User
import re



class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'phone',
            'photo',
            'country',
            'city',
            'address',
            'zip_code',
        )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.required = False

    def save(self, commit=True):
        instance = super().save(commit=False)
        if commit:
            instance.save()
        return instance


class UserSignupForm(UserCreationForm):
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
            raise forms.ValidationError(
                'Password must be at least 8 characters long')
        if not re.search('[0-9]', password1):
            raise forms.ValidationError(
                'Password must contain at least one digit')
        if not re.search('[a-zA-Z]', password1):
            raise forms.ValidationError(
                'Password must contain at least one letter')
        return password1

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError('Passwords do not match')
        return password2


class UserSigninForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if not User.objects.filter(email=email).exists():
            raise forms.ValidationError('Email does not exist')
        return email
    
    def clean_password(self):
        email = self.cleaned_data.get('email')
        password = self.cleaned_data.get('password')
        if email and password:
            user = User.objects.get(email=email)
            if not user.check_password(password):
                raise forms.ValidationError('Incorrect password')
        return password


class UserAdminForm(forms.ModelForm):
    class Meta:
        model = User
        fields = (
            'email',
            'first_name',
            'last_name',
            'phone',
            'photo',
            'country',
            'city',
            'address',
            'zip_code',
            'is_staff',
            'is_superuser',
            'groups',
            'user_permissions',
        )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.required = False

    def save(self, commit=True):
        instance = super().save(commit=False)
        if commit:
            instance.save()
        return instance