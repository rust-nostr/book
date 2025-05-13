// ANCHOR: full
use std::time::Duration;

use nostr_sdk::prelude::*;

pub async fn fetch() -> Result<()> {
    // ANCHOR: client
    let client = Client::default();

    client.add_relay("wss://relay.damus.io").await?;
    client.connect().await;
    // ANCHOR_END: client

    // ANCHOR: fetch
    let filter: Filter = Filter::new().kind(Kind::Metadata).limit(3);
    let events: Events = client.fetch_events(filter, Duration::from_secs(10)).await?;
    // ANCHOR_END: fetch

    // ANCHOR: fetch-from
    let filter: Filter = Filter::new().kind(Kind::TextNote).limit(5);
    let events: Events = client
        .fetch_events_from(["wss://relay.damus.io"], filter, Duration::from_secs(10))
        .await?;
    // ANCHOR_END: fetch-from

    Ok(())
}
// ANCHOR_END: full
