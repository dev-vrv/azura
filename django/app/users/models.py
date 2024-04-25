from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth.models import Group, Permission


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)
    

class CustomUser(AbstractUser):
    
    status_choices = (
        ('new', 'New'),
        ('approved', 'Approved'),
        ('baned', 'Baned'),
    )
    
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    tell = models.CharField(max_length=20, null=True, blank=True)
    
    name = models.CharField(max_length=150, blank=True, null=True)
    surname = models.CharField(max_length=150, blank=True, null=True)
    
    birth_date = models.DateField(null=True, blank=True)
    photo = models.ImageField(upload_to='users/', null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    status = models.CharField(max_length=10, choices=status_choices, default='new')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
    
    groups = models.ManyToManyField(
        Group,
        verbose_name=('groups'),
        blank=True,
        help_text=(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name="customuser_groups",
        related_query_name="customuser",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=('user permissions'),
        blank=True,
        help_text=('Specific permissions for this user.'),
        related_name="customuser_user_permissions",
        related_query_name="customuser",
    )
    
    def save(self, *args, **kwargs):
        self.username = self.email
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email
    