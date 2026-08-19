import {
    Client,
    EventBuilder,
    Kind,
    KindStandard,
    Keys,
    RelayUrl,
} from "@nostrdevkit/nostr-sdk-node";

async function main() {
    const keys = Keys.generate();
    const client = new Client();

    const relay = RelayUrl.parse("wss://relay.damus.io");
    await client.addRelay(relay);
    await client.connect();

    const event = new EventBuilder(
        Kind.fromStd(KindStandard.TextNote),
        "Hello from Nostr Dev Kit!",
    ).finalize(keys);
    const output = await client.sendEvent(event);
    console.log(`Published ${output.id.toBech32()} to`, output.success);

}

await main();
