import {
    Client,
    EventBuilder,
    Kind,
    KindStandard,
    Keys,
    RelayUrl,
} from "@nostrdevkit/nostr-sdk-react-native";

export async function publishHello() {
    const keys = Keys.generate();
    const client = new Client();
    await client.addRelay(RelayUrl.parse("wss://relay.damus.io"));
    await client.connect();

    const event = new EventBuilder(
        Kind.fromStd(KindStandard.TextNote),
        "Hello from Nostr Dev Kit!",
    ).finalize(keys);
    const output = await client.sendEvent(event);
    console.log(`Published ${output.id.toBech32()} to`, output.success);

}
