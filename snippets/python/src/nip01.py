from nostr_sdk import Keys, Metadata, EventBuilder, MetadataRecord


def nip01():
    # Generate random keys
    keys = Keys.generate()

    # ANCHOR: create-event
    # Create metadata object with desired content
    metadata_record = MetadataRecord(
        name="TestName",
        display_name="PyTestur",
        about="This is a Test Account for Rust Nostr Python Bindings",
        website="https://rust-nostr.org/",
        picture="https://avatars.githubusercontent.com/u/123304603?s=200&v=4",
        banner="https://nostr-resources.com/assets/images/cover.png",
        nip05="TestName@rustNostr.com",
    )

    # Build metadata event and assign content
    metadata = Metadata.from_record(metadata_record)
    builder = EventBuilder.metadata(metadata)

    # Signed event and print details
    print("Creating Metadata Event:")
    event = builder.sign_with_keys(keys)

    print(" Event Details:")
    print(f"     Author    : {event.author().to_bech32()}")
    print(f"     Kind      : {event.kind().as_u16()}")
    print(f"     Content   : {event.content()}")
    print(f"     Datetime  : {event.created_at().to_human_datetime()}")
    print(f"     Signature : {event.signature()}")
    print(f"     Verify    : {event.verify()}")
    print(f"     JSON      : {event.as_json()}")
    # ANCHOR_END: create-event

    # ANCHOR: create-metadata
    # Deserialize Metadata from event
    print("Deserializing Metadata Event:")
    metadata = Metadata().from_json(event.content())
    metadata_record = metadata.as_record()

    print(" Metadata Details:")
    print(f"     Name      : {metadata_record.name}")
    print(f"     Display   : {metadata_record.display_name}")
    print(f"     About     : {metadata_record.about}")
    print(f"     Website   : {metadata_record.website}")
    print(f"     Picture   : {metadata_record.picture}")
    print(f"     Banner    : {metadata_record.banner}")
    print(f"     NIP05     : {metadata_record.nip05}")
    # ANCHOR_END: create-metadata

if __name__ == '__main__':
   nip01()