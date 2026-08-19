// ANCHOR: imports
import NostrSDK
// ANCHOR_END: imports

// ANCHOR: keys
func keysExample() throws {
    let keys = Keys.generate()
    let publicKey = keys.publicKey()
    let encoded = try publicKey.toBech32()
    let parsed = try PublicKey.parse(publicKey: encoded)

    print("Public key: \(try parsed.toBech32())")
}
// ANCHOR_END: keys

// ANCHOR: event
func eventExample() throws {
    let keys = Keys.generate()
    let event = try EventBuilder(
        kind: Kind.fromStd(e: .textNote),
        content: "Hello, Nostr!"
    ).finalize(signer: keys)
    precondition(event.verify())

    let decoded = try Event.fromJson(json: event.asJson())
    precondition(decoded.verify())
    print("Event ID: \(try decoded.id().toBech32())")
}
// ANCHOR_END: event

// ANCHOR: filter
func filterExample() throws {
    let publicKey = Keys.generate().publicKey()
    let filter = Filter()
        .author(author: publicKey)
        .kind(kind: Kind.fromStd(e: .textNote))
        .since(timestamp: Timestamp.now())
        .limit(limit: 20)

    print("Filter: \(try filter.asJson())")
}
// ANCHOR_END: filter
