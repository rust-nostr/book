// ANCHOR: full
use std::time::Duration;

use nostr_sdk::prelude::*;

async fn stream() -> Result<()> {
    let client = Client::default();

    client.add_relay("wss://relay.damus.io").await?;
    client.connect().await;

    // ANCHOR: init-stream
    let filter: Filter = Filter::new().kind(Kind::Metadata).limit(10);
    let mut stream = client.stream_events(filter, Duration::from_secs(10)).await?;
    // ANCHOR_END: init-stream

    // ANCHOR: consume-stream
    while let Some(event) = stream.next().await {
        println!("{}", event.as_json());
    }
    // ANCHOR_END: consume-stream

    Ok(())
}

#[tokio::main]
async fn main() -> Result<()> {
    stream().await
}
// ANCHOR_END: full
