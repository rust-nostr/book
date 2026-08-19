// ANCHOR: gossip
import {
    ClientBuilder,
    NostrGossip,
    RelayCapabilities,
    RelayUrl,
    uniffiInitAsync,
} from "@nostrdevkit/nostr-sdk-web";

async function buildGossipClient() {
    await uniffiInitAsync();

    const gossip = NostrGossip.inMemory();
    const client = new ClientBuilder().gossip(gossip).build();
    const capabilities = RelayCapabilities.discovery();

    await client.addRelay(RelayUrl.parse("wss://relay.damus.io"), capabilities, false, undefined);
    await client.addRelay(RelayUrl.parse("wss://purplepag.es"), capabilities, false, undefined);
    await client.connect(undefined);

    return client;
}
// ANCHOR_END: gossip

await buildGossipClient();
