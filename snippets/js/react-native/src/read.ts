// ANCHOR: imports
import {
    Client,
    Filter,
    Kind,
    KindStandard,
    RelayUrl,
    ReqTarget,
} from "@nostrdevkit/nostr-sdk-react-native";
// ANCHOR_END: imports

// ANCHOR: stream
export async function streamEvents() {
    const client = new Client();
    await client.addRelay(RelayUrl.parse("wss://relay.damus.io"));
    await client.connect();

    const filter = new Filter()
        .kind(Kind.fromStd(KindStandard.TextNote))
        .limit(20n);
    const stream = await client.streamEvents(
        ReqTarget.auto([filter]),
        undefined,
        10_000,
    );

    while (true) {
        const item = await stream.next();
        if (!item) break;

        if (item.event) {
            console.log(`${item.relayUrl}: ${item.event.asJson()}`);
        } else if (item.error) {
            console.error(`${item.relayUrl}: ${item.error}`);
        }
    }

}
// ANCHOR_END: stream

// ANCHOR: fetch
export async function fetchEvents() {
    const client = new Client();
    await client.addRelay(RelayUrl.parse("wss://relay.damus.io"));
    await client.connect();

    const filter = new Filter()
        .kind(Kind.fromStd(KindStandard.TextNote))
        .limit(20n);
    const events = await client.fetchEvents(ReqTarget.auto([filter]), 10_000);

    for (const event of events) {
        console.log(event.asJson());
    }

}
// ANCHOR_END: fetch
