from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from django.conf import settings
from .monitor import SystemInfo, SiteInfo


class SessionInfoView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    def get(self, request):
        return Response(data={
            'time': timezone.now(),
            'timezone': timezone.get_current_timezone_name(),
            'home': request.get_host(),
            'user': request.user.email,
            'is_superuser': request.user.is_superuser,
            'is_staff': request.user.is_staff,
            'photo': request.user.photo.url if request.user.photo else '',
        })
        

class SystemInfoView(APIView):
    def get(self, request):
        system_info = SystemInfo(
            mysql_config={
                'host': settings.DATABASES['default']['HOST'],
                'user': settings.DATABASES['default']['USER'],
                'password': settings.DATABASES['default']['PASSWORD'],
                'db': settings.DATABASES['default']['NAME'],
            },
            nginx_url=settings.NGINX_URL
        )
        return Response(data={
            'cpu': system_info.get_cpu_usage(),
            'memory': system_info.get_memory_usage(),
            'disk': system_info.get_disk_usage(),
            'mysql': system_info.get_mysql_load(),
            'nginx': system_info.get_nginx_status(),
        })
     
        
class SiteInfoView(APIView):
    def get(self, request):
        site_info = SiteInfo()
        return Response(data=site_info.get_site_info())
    

class SettingsUpdate(APIView):
    def post(self, request):
        data = request.data
        print(data)
        return Response(data)
    
