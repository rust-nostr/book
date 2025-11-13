# ANCHOR: full
from nostr_sdk import Keys, EventDeletionRequest, EventId, Event, EventBuilder


def nip09():
    keys: Keys = Keys.parse("3501454135014541350145413501453fefb02227e449e57cf4d3a3ce05378683")

    # ANCHOR: build
    # Construct the request
    id = EventId.parse("7469af3be8c8e06e1b50ef1caceba30392ddc0b6614507398b7d7daa4c218e96")
    request = EventDeletionRequest(ids=[id], coordinates=[], reason="these posts were published by accident")

    # Build the event
    event: Event = EventBuilder.delete(request).sign_with_keys(keys)
    # ANCHOR_END: build

    print(f"Event deletion request: {event.as_pretty_json()}")

if __name__ == '__main__':
   nip09()
# ANCHOR_END: full