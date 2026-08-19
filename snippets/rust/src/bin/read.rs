// ANCHOR: imports
use std::time::Duration;

use nostr_sdk::prelude::*;
// ANCHOR_END: imports

// ANCHOR: stream
async fn stream_events() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::default();
    client.add_relay("wss://relay.damus.io").await?;
    client.connect().await;

    let filter = Filter::new().kind(Kind::TextNote).limit(20);
    let mut stream = client
        .stream_events(filter)
        .timeout(Duration::from_secs(10))
        .await?;

    while let Some((relay_url, result)) = stream.next().await {
        match result {
            Ok(event) => println!("{relay_url}: {}", event.as_json()),
            Err(error) => eprintln!("{relay_url}: {error}"),
        }
    }

    Ok(())
}
// ANCHOR_END: stream

// ANCHOR: fetch
async fn fetch_events() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::default();
    client.add_relay("wss://relay.damus.io").await?;
    client.connect().await;

    let filter = Filter::new().kind(Kind::TextNote).limit(20);
    let events = client
        .fetch_events(filter)
        .timeout(Duration::from_secs(10))
        .await?;

    for event in events {
        println!("{}", event.as_json());
    }

    Ok(())
}
// ANCHOR_END: fetch

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    stream_events().await?;
    fetch_events().await
}
