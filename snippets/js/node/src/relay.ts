import { LocalRelayBuilder, NostrLmdb } from "@nostrdevkit/nostr-sdk-node";

const database = await NostrLmdb.open("./data/relay");
const relay = new LocalRelayBuilder()
    .database(database)
    .port(7777)
    .build();

await relay.run();
console.log("Relay URL:", (await relay.url()).toString());
