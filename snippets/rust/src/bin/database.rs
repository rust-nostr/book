// ANCHOR: imports
use nostr_lmdb::NostrLmdb;
use nostr_sdk::prelude::*;
// ANCHOR_END: imports

// ANCHOR: database
async fn query_database() -> Result<(), Box<dyn std::error::Error>> {
    let database = NostrLmdb::open("./data/nostr").await?;
    let client = ClientBuilder::default().database(database).build();

    let filter = Filter::new().kind(Kind::TextNote).limit(20);
    let events = client.database().query(filter).await?;
    println!("Found {} stored events", events.len());

    Ok(())
}
// ANCHOR_END: database

// ANCHOR: sync
async fn sync_events() -> Result<(), Box<dyn std::error::Error>> {
    let database = NostrLmdb::open("./data/nostr").await?;
    let client = ClientBuilder::default().database(database).build();

    client.add_relay("wss://relay.damus.io").await?;
    client.connect().await;

    let filter = Filter::new().kind(Kind::TextNote).limit(20);
    let opts = SyncOptions::default().direction(SyncDirection::Down);
    let output = client.sync(filter).opts(opts).await?;
    println!("Sync result: {output:?}");

    Ok(())
}
// ANCHOR_END: sync

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    query_database().await?;
    sync_events().await
}
