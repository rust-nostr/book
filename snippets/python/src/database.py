# ANCHOR: imports
from nostr_sdk import (
    ClientBuilder,
    Filter,
    Kind,
    KindStandard,
    NostrLmdb,
    RelayUrl,
    SyncDirection,
    SyncOptions,
)
# ANCHOR_END: imports


# ANCHOR: database
async def query_database() -> None:
    database = await NostrLmdb.open("./data/nostr")
    client = ClientBuilder().database(database).build()

    filter = Filter().kind(Kind.from_std(KindStandard.TEXT_NOTE)).limit(20)
    events = await client.database().query(filter)
    print(f"Found {len(events)} stored events")

# ANCHOR_END: database


# ANCHOR: sync
async def sync_events() -> None:
    database = await NostrLmdb.open("./data/nostr")
    client = ClientBuilder().database(database).build()

    await client.add_relay(RelayUrl.parse("wss://relay.damus.io"))
    await client.connect()

    filter = (
        Filter()
        .kind(Kind.from_std(KindStandard.TEXT_NOTE))
        .limit(20)
    )
    opts = SyncOptions().direction(SyncDirection.DOWN)
    output = await client.sync(filter, opts=opts)
    print(output)

# ANCHOR_END: sync
