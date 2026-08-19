// ANCHOR: gossip
use nostr_gossip_sqlite::prelude::NostrGossipSqlite;
use nostr_sdk::prelude::*;

async fn build_gossip_client() -> Result<Client, Box<dyn std::error::Error>> {
    let gossip = NostrGossipSqlite::open("./data/gossip.sqlite").await?;
    let client = Client::builder().gossip(gossip).build();

    client
        .add_relay("wss://relay.damus.io")
        .capabilities(RelayCapabilities::DISCOVERY)
        .await?;
    client
        .add_relay("wss://purplepag.es")
        .capabilities(RelayCapabilities::DISCOVERY)
        .await?;
    client.connect().await;

    Ok(client)
}
// ANCHOR_END: gossip

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let _client = build_gossip_client().await?;
    Ok(())
}
