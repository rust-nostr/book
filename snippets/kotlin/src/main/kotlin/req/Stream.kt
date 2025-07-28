package rust.nostr.snippets.req

// ANCHOR: full
import kotlinx.coroutines.runBlocking
import rust.nostr.sdk.*

suspend fun stream() {
    val client = Client()

    val relayUrl = RelayUrl.parse("wss://relay.damus.io")
    client.addRelay(relayUrl)
    client.connect()

    // ANCHOR: init-stream
    // TODO: not supported yet
    // ANCHOR_END: init-stream

    // ANCHOR: consume-stream
    // TODO: not supported yet
    // ANCHOR_END: consume-stream
}

fun main() {
    runBlocking { stream() }
}
// ANCHOR_END: full
