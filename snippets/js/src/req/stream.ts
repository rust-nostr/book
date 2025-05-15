// ANCHOR: full
import {Client, loadWasmAsync} from "@rust-nostr/nostr-sdk";

async function stream() {
    await loadWasmAsync();

    let client = new Client();

    await client.addRelay("wss://relay.damus.io")
    await client.connect();

    // ANCHOR: init-stream
    // TODO: not supported yet
    // ANCHOR_END: init-stream

    // ANCHOR: consume-stream
    // TODO: not supported yet
    // ANCHOR_END: consume-stream
}

stream();
// ANCHOR_END: full
