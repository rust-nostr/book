import asyncio

from nostr_sdk import LocalRelayBuilder, NostrLmdb


async def main() -> None:
    database = await NostrLmdb.open("./data/relay")
    relay = LocalRelayBuilder().database(database).port(7777).build()

    await relay.run()
    print(f"Relay URL: {await relay.url()}")

if __name__ == "__main__":
    asyncio.run(main())
