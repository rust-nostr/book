package rust.nostr.snippets

// ANCHOR: imports
import org.nostrdevkit.sdk.*
// ANCHOR_END: imports

// ANCHOR: keys
fun keysExample() {
    val keys = Keys.generate()
    val publicKey = keys.publicKey()
    val encoded = publicKey.toBech32()
    val parsed = PublicKey.parse(encoded)

    check(parsed == publicKey)
    println("Public key: $encoded")
}
// ANCHOR_END: keys

// ANCHOR: event
fun eventExample() {
    val keys = Keys.generate()
    val event = EventBuilder(
        Kind.fromStd(KindStandard.TEXT_NOTE),
        "Hello, Nostr!",
    ).finalize(keys)
    check(event.verify())

    val decoded = Event.fromJson(event.asJson())
    check(decoded.verify())
    println("Event ID: ${decoded.id().toBech32()}")
}
// ANCHOR_END: event

// ANCHOR: filter
fun filterExample() {
    val publicKey = Keys.generate().publicKey()
    val filter = Filter()
        .author(publicKey)
        .kind(Kind.fromStd(KindStandard.TEXT_NOTE))
        .since(Timestamp.now())
        .limit(20u)

    println("Filter: ${filter.asJson()}")
}
// ANCHOR_END: filter
