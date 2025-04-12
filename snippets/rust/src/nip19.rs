use nostr_sdk::nips::nip19::Nip19Profile;
use nostr_sdk::prelude::*;
use nostr_sdk::FromBech32;
use nostr_sdk::ToBech32;
use std::collections::HashMap;

pub fn nip19() -> Result<()> {
    // Generate random keys
    let keys = Keys::generate();

    // ANCHOR: nip19-npub
    println!("Public keys: {:?}", keys.public_key.to_bech32()?);
    // ANCHOR_END: nip19-npub

    // ANCHOR: nip19-nsec
    println!("Secret key: {:?}", keys.secret_key().to_bech32()?);
    // ANCHOR_END: nip19-nsec

    // ANCHOR: nip19-note
    let event =
        EventBuilder::text_note("Hello from Rust Nostr rust Bindings!").sign_with_keys(&keys)?;
    println!("Event  : {:?}", event.id.to_bech32()?);
    // ANCHOR_END: nip19-note

    println!("Shareable identifiers with extra metadata (bech32):");
    // ANCHOR: nip19-nprofile-encode
    // Create NIP-19 profile including relays data
    let relay_url = RelayUrl::parse("wss://relay.damus.io")?;
    let relays = vec![relay_url];
    let nprofile = Nip19Profile::new(keys.public_key, &relays)?;
    println!("Profile (encoded): {}", nprofile.to_bech32()?);
    // ANCHOR_END: nip19-nprofile-encode

    // ANCHOR: nip19-nprofile-decode
    // Decode NIP-19 profile
    let decode_nprofile = Nip19Profile::from_bech32(&nprofile.to_bech32()?)?;
    println!("NIP-19 profile decoded");
    println!("Public key: {}", decode_nprofile.public_key);
    for (idx, relay) in decode_nprofile.relays.iter().enumerate() {
        println!("{},{}", idx, relay);
    }
    // ANCHOR_END: nip19-nprofile-decode

    // ANCHOR: nip19-nevent-encode
    // Create NIP-19 event including author and relays data
    let nevent = Nip19Event::new(event.id)
        .author(keys.public_key)
        .relays(relays.clone());
    let encoded_nevent = nevent.to_bech32()?;
    println!("Event (encoded): {}", encoded_nevent);
    // ANCHOR_END: nip19-nevent-encode

    // ANCHOR: nip19-nevent-decode
    // Decode NIP-19 event
    let decoded_event = Nip19Event::from_bech32(&encoded_nevent)?;
    let mut decoded_event_map = HashMap::new();
    decoded_event_map.insert("event_id", decoded_event.event_id.to_bech32()?);
    decoded_event_map.insert(
        "author",
        match decoded_event.author {
            Some(pub_key) => pub_key.to_bech32()?,
            None => "None".to_string(),
        },
    );
    decoded_event_map.insert(
        "kind",
        match decoded_event.kind {
            Some(kind) => kind.to_string(),
            None => "None".to_string(),
        },
    );
    decoded_event_map.insert(
        "relays",
        decoded_event
            .relays
            .iter()
            .map(|r| r.to_string())
            .collect::<Vec<_>>()
            .join(", "),
    );

    println!("Event (decoded)");
    for (key, value) in decoded_event_map {
        println!("{} : {}", key, value)
    }
    // ANCHOR_END: nip19-nevent-decode

    // ANCHOR: nip19-naddr-encode
    // Create NIP-19 coordinate
    let kind = Kind::TextNote;
    let coord = Coordinate::new(kind, keys.public_key);
    let coordinate = Nip19Coordinate::new(coord, &relays)?;
    let bech_32_coordinate = coordinate.to_bech32()?;
    println!(" Coordinate (encoded): {}", bech_32_coordinate);
    // ANCHOR_END: nip19-naddr-encode

    // ANCHOR: nip19-naddr-decode
    // Decode NIP-19 coordinate
    let decode_coord = Nip19Coordinate::from_bech32(&bech_32_coordinate)?;
    println!("Coordinate (decoded): {:?}", decode_coord);
    // ANCHOR_END: nip19-naddr-decode
    Ok(())
}
