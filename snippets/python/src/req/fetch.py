# ANCHOR: full
import asyncio
from datetime import timedelta

from nostr_sdk import Client, Filter, Events, Kind, KindStandard


async def fetch():
    # ANCHOR: client
    client = Client()

    await client.add_relay("wss://relay.damus.io")
    await client.connect()
    # ANCHOR_END: client

    # ANCHOR: fetch
    filter: Filter = Filter().kind(Kind.from_std(KindStandard.METADATA)).limit(3)
    events: Events = await client.fetch_events(filter, timedelta(seconds=10))
    # ANCHOR_END: fetch

    # ANCHOR: fetch-from
    filter: Filter = Filter().kind(Kind.from_std(KindStandard.TEXT_NOTE)).limit(5)
    events: Events = await client.fetch_events_from(["wss://relay.damus.io"], filter, timedelta(seconds=10))
    # ANCHOR_END: fetch-from


if __name__ == '__main__':
   asyncio.run(fetch())
# ANCHOR_END: full
