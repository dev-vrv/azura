from django.conf import settings
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import sync_to_async
from .monitor import SiteInfo, SystemInfo
import asyncio
import json


class StatsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']

        self.channel_layer = get_channel_layer()
        self.channel_name = 'stats'
        await self.channel_layer.group_add('stats', self.channel_name)
        await self.accept()
        await self.send_stats()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard('stats', self.channel_name)

    async def receive(self, text_data):
        pass

    async def send_stats(self, event=None):
        site_info = SiteInfo()
        system_info = SystemInfo(
            mysql_config={
                'host': settings.DATABASES['default']['HOST'],
                'user': settings.DATABASES['default']['USER'],
                'password': settings.DATABASES['default']['PASSWORD'],
                'db': settings.DATABASES['default']['NAME'],
            },
            nginx_url=settings.NGINX_URL
        )
        while True:
            stats = {
                'site': await sync_to_async(site_info.get_site_info)(),
                'system': await sync_to_async(system_info.get_system_info)(),
            }
            await self.send(text_data=json.dumps(stats))
            await asyncio.sleep(5)
