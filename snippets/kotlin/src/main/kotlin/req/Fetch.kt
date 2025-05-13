package rust.nostr.snippets.req

// ANCHOR: full
import java.time.Duration
import kotlinx.coroutines.runBlocking
import rust.nostr.sdk.*

suspend fun fetch() {
    // ANCHOR: client
    val client = Client()

    client.addRelay("wss://relay.damus.io")
    client.connect()
    // ANCHOR_END: client

    // ANCHOR: fetch
    val filter1: Filter = Filter().kind(Kind.fromStd(KindStandard.METADATA)).limit(3u)
    val events1: Events = client.fetchEvents(filter = filter1, timeout = Duration.ofSeconds(10L))
    // ANCHOR_END: fetch

    // ANCHOR: fetch-from
    val filter2: Filter = Filter().kind(Kind.fromStd(KindStandard.TEXT_NOTE)).limit(5u)
    val events2: Events = client.fetchEventsFrom(
        urls = listOf("wss://relay.damus.io"),
        filter = filter2,
        timeout = Duration.ofSeconds(10L)
    )
    // ANCHOR_END: fetch-from
}

fun main() {
    runBlocking { fetch() }
}
// ANCHOR_END: full