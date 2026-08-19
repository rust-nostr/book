// ANCHOR: gossip
import {
    ClientBuilder,
    NostrGossip,
    RelayCapabilities,
    RelayUrl,
} from "@nostrdevkit/nostr-sdk-react-native";

export async function buildGossipClient(databasePath: string) {
    const gossip = await NostrGossip.sqlite(databasePath);
    const client = new ClientBuilder().gossip(gossip).build();
    const capabilities = RelayCapabilities.discovery();

    await client.addRelay(RelayUrl.parse("wss://relay.damus.io"), capabilities, false, undefined);
    await client.addRelay(RelayUrl.parse("wss://purplepag.es"), capabilities, false, undefined);
    await client.connect(undefined);

    return client;
}
// ANCHOR_END: gossip
