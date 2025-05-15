# ANCHOR: full
import asyncio
from datetime import timedelta

from nostr_sdk import Client


async def stream():
    client = Client()

    await client.add_relay("wss://relay.damus.io")
    await client.connect()

    # ANCHOR: init-stream
    # TODO: not supported yet
    # ANCHOR_END: init-stream

    # ANCHOR: consume-stream
    # TODO: not supported yet
    # ANCHOR_END: consume-stream


if __name__ == '__main__':
   asyncio.run(stream())
# ANCHOR_END: full
