import asyncio

# ANCHOR: gossip
from nostr_sdk import (
    Client,
    ClientBuilder,
    NostrGossip,
    RelayCapabilities,
    RelayUrl,
)


async def build_gossip_client() -> Client:
    gossip = await NostrGossip.sqlite("./data/gossip.sqlite")
    client = ClientBuilder().gossip(gossip).build()
    capabilities = RelayCapabilities.discovery()

    await client.add_relay(
        RelayUrl.parse("wss://relay.damus.io"), capabilities=capabilities
    )
    await client.add_relay(
        RelayUrl.parse("wss://purplepag.es"), capabilities=capabilities
    )
    await client.connect()

    return client
# ANCHOR_END: gossip


if __name__ == "__main__":
    asyncio.run(build_gossip_client())
