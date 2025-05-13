// ANCHOR: full
import {Client, Filter, Kind, KindStandard, Duration, loadWasmAsync} from "@rust-nostr/nostr-sdk";

async function fetch() {
    await loadWasmAsync();

    // ANCHOR: client
    let client = new Client();

    await client.addRelay("wss://relay.damus.io")
    await client.connect();
    // ANCHOR_END: client

    // ANCHOR: fetch
    let filter1 = new Filter().kind(Kind.fromStd(KindStandard.Metadata)).limit(3);
    let events1 = await client.fetchEvents(filter1, Duration.fromSecs(10));
    // ANCHOR_END: fetch

    // ANCHOR: fetch-from
    let filter2 = new Filter().kind(Kind.fromStd(KindStandard.TextNote)).limit(5);
    let events2 = await client.fetchEventsFrom(["wss://relay.damus.io"], filter2, Duration.fromSecs(10));
    // ANCHOR_END: fetch-from
}

fetch();
// ANCHOR_END: full