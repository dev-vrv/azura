import psutil
import pymysql
import django

django.setup()

from django.db.models import Count
from django.db.models.functions import TruncHour
from datetime import datetime, timedelta
from django.utils import timezone
from silk.models import Request, SQLQuery


class SystemInfo:
    def __init__(self, mysql_config, nginx_url):
        self.mysql_config = mysql_config
        self.nginx_url = nginx_url
    
    def get_system_info(self):
        return {
            'cpu': self.get_cpu_usage(),
            'memory': self.get_memory_usage(),
            'disk': self.get_disk_usage(),
            'mysql': self.get_mysql_load(),
            'nginx': self.get_nginx_status()
        }
    
    def get_cpu_usage(self):
        return {
            'percent': psutil.cpu_percent(interval=1),
            'cores': psutil.cpu_count(logical=False),
            'threads': psutil.cpu_count(logical=True),
        }

    def get_memory_usage(self):
        memory = psutil.virtual_memory()
        return {
            'total': memory.total,
            'free': memory.free,
            'available': memory.available,
            'used': memory.used,
            'percent': memory.percent,
        }

    def get_disk_usage(self):
        disk = psutil.disk_usage('/')
        return {
            'total': disk.total,
            'used': disk.used,
            'free': disk.free,
            'percent': disk.percent
        }   
    
    def get_mysql_load(self):
        connection = pymysql.connect(**self.mysql_config)
        with connection.cursor() as cursor:
            cursor.execute("SHOW GLOBAL STATUS LIKE 'Threads_connected'")
            threads_connected = cursor.fetchone()
            cursor.execute("SHOW GLOBAL STATUS LIKE 'Queries'")
            queries = cursor.fetchone()
            cursor.execute("SHOW GLOBAL STATUS LIKE 'Uptime'")
            uptime = cursor.fetchone()
        connection.close()

        mysql_cpu_usage = 0
        for proc in psutil.process_iter(['pid', 'name']):
            if proc.info['name'] == 'mysql':
                mysql_cpu_usage = proc.cpu_percent(interval=1)

        return {
            'threads_connected': threads_connected[1],
            'queries_per_second': round(int(queries[1]) / int(uptime[1]), 2),
            'cpu_usage': mysql_cpu_usage
        }

    def get_nginx_status(self):
        nginx_processes = [proc for proc in psutil.process_iter(['pid', 'name']) if proc.info['name'] == 'nginx']

        cpu_usage = sum(proc.cpu_percent() for proc in nginx_processes)
        memory_usage = sum(proc.memory_percent() for proc in nginx_processes)

        return {
            'cpu_usage_percent': cpu_usage,
            'memory_usage_percent': round(memory_usage, 1),
        }
    

class SiteInfo:
    def __init__(self):
        self.current_time = timezone.now()
        self.start_time = self.current_time - timedelta(hours=12)
    
    def get_site_info(self):
        return {
            'queries': self.get_query_info(),
            'requests': self.get_request_info(),
            'time': self.current_time.strftime("%H:%M"),
            'date': self.current_time.strftime("%d.%m.%Y"),
            'timezone': timezone.get_current_timezone_name()
        }
        
    def get_query_info(self):
        info = []
        queryset = SQLQuery.objects.filter(start_time__gte=self.start_time)
        info = []
        for i in range(12):
            start_time = self.start_time + timedelta(hours=i)
            end_time = start_time + timedelta(hours=1)
            queryset = SQLQuery.objects.filter(start_time__gte=start_time, start_time__lt=end_time)
            count = queryset.count()
            time = f"{start_time} - {end_time}"
            date = end_time.strftime("%d.%m.%Y")
            hour = end_time.strftime("%H:%M")
            info.append({'count': count, 'datetime': time, 'date': date, 'hour': hour})
        return info
    
    def get_request_info(self):
        info = []
        queryset = Request.objects.filter(start_time__gte=self.start_time)
        for i in range(12):
            start_time = self.start_time + timedelta(hours=i)
            end_time = start_time + timedelta(hours=1)
            queryset = Request.objects.filter(start_time__gte=start_time, start_time__lt=end_time)
            count = queryset.count()
            time = f"{start_time} - {end_time}"
            date = end_time.strftime("%d.%m.%Y")
            hour = end_time.strftime("%H:%M")
            info.append({'count': count, 'timeRange': time, 'date': date, 'hour': hour})
        return info