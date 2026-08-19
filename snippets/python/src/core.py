# ANCHOR: imports
from nostr_sdk import Event, EventBuilder, Filter, Kind, KindStandard, Keys, PublicKey, Timestamp
# ANCHOR_END: imports


# ANCHOR: keys
def keys_example() -> None:
    keys = Keys.generate()
    public_key = keys.public_key()
    encoded = public_key.to_bech32()
    parsed = PublicKey.parse(encoded)

    assert parsed == public_key
    print(f"Public key: {encoded}")
# ANCHOR_END: keys


# ANCHOR: event
def event_example() -> None:
    keys = Keys.generate()
    event = EventBuilder(
        Kind.from_std(KindStandard.TEXT_NOTE), "Hello, Nostr!"
    ).finalize(keys)
    assert event.verify()

    decoded = Event.from_json(event.as_json())
    assert decoded.verify()
    print(f"Event ID: {decoded.id().to_bech32()}")
# ANCHOR_END: event


# ANCHOR: filter
def filter_example() -> None:
    public_key = Keys.generate().public_key()
    filter = (
        Filter()
        .author(public_key)
        .kind(Kind.from_std(KindStandard.TEXT_NOTE))
        .since(Timestamp.now())
        .limit(20)
    )

    print(f"Filter: {filter.as_json()}")
# ANCHOR_END: filter


if __name__ == "__main__":
    keys_example()
    event_example()
    filter_example()
