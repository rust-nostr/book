# ANCHOR: full
import asyncio
from datetime import timedelta

from nostr_sdk import Client, Filter, Events, Kind, KindStandard, RelayUrl


async def fetch():
    # ANCHOR: client
    client = Client()

    relay_url = RelayUrl.parse("wss://relay.damus.io")
    await client.add_relay(relay_url)
    await client.connect()
    # ANCHOR_END: client

    # ANCHOR: fetch
    filter: Filter = Filter().kind(Kind.from_std(KindStandard.METADATA)).limit(3)
    events: Events = await client.fetch_events(filter, timedelta(seconds=10))
    # ANCHOR_END: fetch

    # ANCHOR: fetch-from
    filter: Filter = Filter().kind(Kind.from_std(KindStandard.TEXT_NOTE)).limit(5)
    events: Events = await client.fetch_events_from([relay_url], filter, timedelta(seconds=10))
    # ANCHOR_END: fetch-from


if __name__ == '__main__':
   asyncio.run(fetch())
# ANCHOR_END: full
