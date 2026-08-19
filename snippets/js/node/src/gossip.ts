// ANCHOR: gossip
import {
    ClientBuilder,
    NostrGossip,
    RelayCapabilities,
    RelayUrl,
} from "@nostrdevkit/nostr-sdk-node";

async function buildGossipClient() {
    const gossip = await NostrGossip.sqlite("./data/gossip.sqlite");
    const client = new ClientBuilder().gossip(gossip).build();
    const capabilities = RelayCapabilities.discovery();

    await client.addRelay(RelayUrl.parse("wss://relay.damus.io"), capabilities, false, undefined);
    await client.addRelay(RelayUrl.parse("wss://purplepag.es"), capabilities, false, undefined);
    await client.connect(undefined);

    return client;
}
// ANCHOR_END: gossip

await buildGossipClient();
