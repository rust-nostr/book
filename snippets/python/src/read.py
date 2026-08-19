# ANCHOR: imports
import asyncio
from datetime import timedelta

from nostr_sdk import Client, Filter, Kind, KindStandard, RelayUrl, ReqTarget
# ANCHOR_END: imports


# ANCHOR: stream
async def stream_events() -> None:
    client = Client()
    await client.add_relay(RelayUrl.parse("wss://relay.damus.io"))
    await client.connect()

    filter = Filter().kind(Kind.from_std(KindStandard.TEXT_NOTE)).limit(20)
    stream = await client.stream_events(
        ReqTarget.auto([filter]), timeout=timedelta(seconds=10)
    )

    while item := await stream.next():
        if item.event is not None:
            print(f"{item.relay_url}: {item.event.as_json()}")
        elif item.error is not None:
            print(f"{item.relay_url}: {item.error}")

# ANCHOR_END: stream


# ANCHOR: fetch
async def fetch_events() -> None:
    client = Client()
    await client.add_relay(RelayUrl.parse("wss://relay.damus.io"))
    await client.connect()

    filter = Filter().kind(Kind.from_std(KindStandard.TEXT_NOTE)).limit(20)
    events = await client.fetch_events(
        ReqTarget.auto([filter]), timeout=timedelta(seconds=10)
    )

    for event in events:
        print(event.as_json())

# ANCHOR_END: fetch


async def main() -> None:
    await stream_events()
    await fetch_events()


if __name__ == "__main__":
    asyncio.run(main())
