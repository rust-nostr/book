// ANCHOR: imports
import {
    Event,
    EventBuilder,
    Filter,
    Kind,
    KindStandard,
    Keys,
    PublicKey,
    Timestamp,
} from "@nostrdevkit/nostr-sdk-node";
// ANCHOR_END: imports

// ANCHOR: keys
function keysExample() {
    const keys = Keys.generate();
    const publicKey = keys.publicKey();
    const encoded = publicKey.toBech32();
    const parsed = PublicKey.parse(encoded);

    console.log("Public key:", parsed.toBech32());
}
// ANCHOR_END: keys

// ANCHOR: event
function eventExample() {
    const keys = Keys.generate();
    const event = new EventBuilder(
        Kind.fromStd(KindStandard.TextNote),
        "Hello, Nostr!",
    ).finalize(keys);
    if (!event.verify()) throw new Error("invalid event");

    const decoded = Event.fromJson(event.asJson());
    if (!decoded.verify()) throw new Error("invalid decoded event");
    console.log("Event ID:", decoded.id().toBech32());
}
// ANCHOR_END: event

// ANCHOR: filter
function filterExample() {
    const publicKey = Keys.generate().publicKey();
    const filter = new Filter()
        .author(publicKey)
        .kind(Kind.fromStd(KindStandard.TextNote))
        .since(Timestamp.now())
        .limit(20n);

    console.log("Filter:", filter.asJson());
}
// ANCHOR_END: filter

keysExample();
eventExample();
filterExample();
