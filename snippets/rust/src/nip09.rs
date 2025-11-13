// ANCHOR: full
use nostr_sdk::prelude::*;

pub fn nip09() -> Result<()> {
    let keys: Keys = Keys::parse("3501454135014541350145413501453fefb02227e449e57cf4d3a3ce05378683")?;

    // ANCHOR: build
    // Construct the request
    let request = EventDeletionRequest::new()
        .id(EventId::from_hex("7469af3be8c8e06e1b50ef1caceba30392ddc0b6614507398b7d7daa4c218e96")?)
        // optionally add coordinates for replaceable events
        // .coordinate(...)
        .reason("these posts were published by accident");

    // Build the event
    let event: Event = EventBuilder::delete(request).sign_with_keys(&keys)?;
    // ANCHOR_END: build

    println!("Event deletion request: {}", event.as_pretty_json());

    Ok(())
}
// ANCHOR_END: full
