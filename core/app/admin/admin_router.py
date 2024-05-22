# api_router.py

from rest_framework.routers import DefaultRouter
from users.admin import UserAdminController
from mail.admin import MailsAdminController

router = DefaultRouter()
router.register(r'users', UserAdminController, basename='Users')
router.register(r'mails', MailsAdminController, basename='Mails')

urls = router.urls
