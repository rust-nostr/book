use nostr_sdk::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::default();
    client.add_relay("wss://relay.damus.io").await?;
    client.connect().await;

    let mut notifications = client.notifications();
    let filter = Filter::new().kind(Kind::TextNote).since(Timestamp::now());
    let subscription = client.subscribe(filter).await?;

    while let Some(notification) = notifications.next().await {
        if let ClientNotification::Event {
            relay_url,
            subscription_id,
            event,
        } = notification
        {
            if &subscription_id == subscription.id() {
                println!("Received {} from {relay_url}", event.id);
                break;
            }
        }
    }

    client.unsubscribe(subscription.id()).await?;
    Ok(())
}
