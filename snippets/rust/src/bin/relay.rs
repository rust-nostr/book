use std::time::Duration;

use nostr_lmdb::NostrLmdb;
use nostr_sdk::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let database = NostrLmdb::open("./data/relay").await?;
    let relay = LocalRelay::builder().database(database).port(7777).build();

    // Start the relay.
    relay.run().await?;

    println!("Relay listening on {}", relay.url().await);

    // Keep the process running
    loop {
        tokio::time::sleep(Duration::from_secs(60)).await;
    }
}
