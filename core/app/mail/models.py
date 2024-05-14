from django.db import models
from django.conf import settings

class Mails(models.Model):
    subject = models.CharField(max_length=255)
    message = models.TextField()
    sender = models.EmailField(default=settings.EMAIL_HOST_USER)
    recipients = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.subject
