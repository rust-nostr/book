// ANCHOR: imports
use nostr::prelude::*;
// ANCHOR_END: imports

// ANCHOR: keys
fn keys_example() -> Result<(), Box<dyn std::error::Error>> {
    let keys = Keys::generate();
    let public_key = keys.public_key();
    let encoded = public_key.to_bech32()?;
    let parsed = PublicKey::parse(&encoded)?;

    assert_eq!(parsed, public_key);
    println!("Public key: {encoded}");
    Ok(())
}
// ANCHOR_END: keys

// ANCHOR: event
fn event_example() -> Result<(), Box<dyn std::error::Error>> {
    let keys = Keys::generate();
    let event = EventBuilder::new(Kind::TextNote, "Hello, Nostr!").finalize(&keys)?;
    event.verify()?;

    let decoded = Event::from_json(event.as_json())?;
    decoded.verify()?;
    println!("Event ID: {}", decoded.id.to_bech32()?);
    Ok(())
}
// ANCHOR_END: event

// ANCHOR: filter
fn filter_example() {
    let public_key = Keys::generate().public_key();
    let filter = Filter::new()
        .author(public_key)
        .kind(Kind::TextNote)
        .since(Timestamp::now())
        .limit(20);

    println!("Filter: {}", filter.as_json());
}
// ANCHOR_END: filter

fn main() -> Result<(), Box<dyn std::error::Error>> {
    keys_example()?;
    event_example()?;
    filter_example();
    Ok(())
}
