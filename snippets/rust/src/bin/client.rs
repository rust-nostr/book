use nostr_sdk::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let keys = Keys::generate();
    let client = Client::default();

    client.add_relay("wss://relay.damus.io").await?;
    client.connect().await;

    let event = EventBuilder::new(Kind::TextNote, "Hello from Nostr Dev Kit!").finalize(&keys)?;
    let output = client.send_event(&event).await?;
    println!("Published {} to {:?}", output.id(), output.success);

    Ok(())
}
