// ANCHOR: imports
import {
    ClientBuilder,
    Filter,
    Kind,
    KindStandard,
    NostrLmdb,
    RelayUrl,
    SyncDirection,
    SyncOptions,
} from "@nostrdevkit/nostr-sdk-node";
// ANCHOR_END: imports

// ANCHOR: database
async function queryDatabase() {
    const database = await NostrLmdb.open("./data/nostr");
    const client = new ClientBuilder().database(database).build();

    const filter = new Filter()
        .kind(Kind.fromStd(KindStandard.TextNote))
        .limit(20n);
    const events = await client.database().query(filter);
    console.log(`Found ${events.length} stored events`);
}
// ANCHOR_END: database

// ANCHOR: sync
async function syncEvents() {
    const database = await NostrLmdb.open("./data/nostr");
    const client = new ClientBuilder().database(database).build();

    await client.addRelay(
        RelayUrl.parse("wss://relay.damus.io"),
        undefined,
        false,
        undefined,
    );
    await client.connect(undefined);

    const filter = new Filter()
        .kind(Kind.fromStd(KindStandard.TextNote))
        .limit(20n);
    const opts = new SyncOptions().direction(SyncDirection.Down);
    const output = await client.sync(filter, undefined, opts);
    console.log(output);
}
// ANCHOR_END: sync

await queryDatabase();
await syncEvents();
