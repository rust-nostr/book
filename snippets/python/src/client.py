import asyncio

from nostr_sdk import (
    Client,
    EventBuilder,
    Kind,
    KindStandard,
    Keys,
    RelayUrl,
)


async def main() -> None:
    keys = Keys.generate()
    client = Client()

    relay = RelayUrl.parse("wss://relay.damus.io")
    await client.add_relay(relay)
    await client.connect()

    event = EventBuilder(
        Kind.from_std(KindStandard.TEXT_NOTE), "Hello from Nostr Dev Kit!"
    ).finalize(keys)
    output = await client.send_event(event)
    print(f"Published {output.id.to_bech32()} to {output.success}")

if __name__ == "__main__":
    asyncio.run(main())
