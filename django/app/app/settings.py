from pathlib import Path
import os


# Constants

BASE_DIR = Path(__file__).resolve().parent.parent
DJANGO_DIR = BASE_DIR.parent


SECRET_KEY = 'django-insecure-abg7t)ar8%1k#ibj#%dlpql%7w%li=5^x@v%yoecr)#gv7(5#e'

DEBUG = True

ALLOWED_HOSTS = ['*']

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


NGINX_URL = 'http://localhost:8080'

ROOT_URLCONF = 'app.urls'

WSGI_APPLICATION = 'app.wsgi.application'

ASGI_APPLICATION = 'app.asgi.application'


# REST Framework & Channels

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'EXCEPTION_HANDLER': 'rest_framework.views.exception_handler'
}

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer'
    }
}


# Application definition


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'allauth',
    'allauth.account',
    'silk',
    'channels',
    'debug_toolbar',

    'users.apps.CustomUsersConfig',
    'mail.apps.MailConfig',
    'chat.apps.ChatConfig',
    'cart.apps.CartConfig',
    'api.apps.ApiConfig',
    'content.apps.ContentConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
    'silk.middleware.SilkyMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',

]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

INTERNAL_IPS = [
    '127.0.0.1',
]


# Database & Storages

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'Azura',
        'USER': 'arcane',
        'PASSWORD': 'Gettog02!',
    }
}

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(DJANGO_DIR, 'static')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

# Static storage
STORAGES = {
    'SILKY_STORAGE': {
        'BACKEND': 'django.core.files.storage.FileSystemStorage',
        'LOCATION': os.path.join(BASE_DIR, 'static')
    },
    'staticfiles': {
        'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage',
        'LOCATION': os.path.join(BASE_DIR, 'static')
    },
}

# Static files (CSS, JavaScript, Images)

STATIC_URL = 'static/'

STATIC_ROOT = os.path.join(DJANGO_DIR, 'static')


STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'app/static'),
]


# Password validation

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Default primary key field type

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
AUTH_USER_MODEL = 'users.CustomUser'


# Logging
if not os.path.exists(os.path.join(BASE_DIR, '../logs')):
    os.makedirs(os.path.join(BASE_DIR, '../logs'))
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'DEBUG' if DEBUG else 'ERROR',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(BASE_DIR, '../logs/django.log'),
            'maxBytes': 10 * 1024 * 1024,  # 10 MB
            'backupCount': 5,  # Rotate through 5 files
            'formatter': 'verbose',
        },
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'console'],
            'level': 'DEBUG' if DEBUG else 'ERROR',
            'propagate': True,
        },
    }
}
