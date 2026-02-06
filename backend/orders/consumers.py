import json
from channels.generic.websocket import AsyncWebsocketConsumer

class OrderConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Get host from headers to isolate tenants
        headers = dict(self.scope['headers'])
        host_bytes = headers.get(b'host', b'')
        host = host_bytes.decode('utf-8').split(':')[0]
        
        # Sanitize host to be a valid group name
        safe_host = host.replace('.', '_').replace('-', '_')
        self.room_group_name = f'orders_{safe_host}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def order_update(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps(event))
