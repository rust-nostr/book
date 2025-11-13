package rust.nostr.snippets

// ANCHOR: full
import rust.nostr.sdk.*

fun nip09() {
    val keys: Keys = Keys.parse("3501454135014541350145413501453fefb02227e449e57cf4d3a3ce05378683")

    // ANCHOR: build
    // Construct the request
    val id = EventId.parse("7469af3be8c8e06e1b50ef1caceba30392ddc0b6614507398b7d7daa4c218e96")
    val request = EventDeletionRequest(ids = listOf(id), coordinates = listOf(), reason = "these posts were published by accident")

    // Build the event
    val event: Event = EventBuilder.delete(request).signWithKeys(keys)
    // ANCHOR_END: build

    println("Event deletion request: ${event.asPrettyJson()}")
}

fun main() {
    nip09()
}
// ANCHOR_END: full
