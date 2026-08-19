package rust.nostr.snippets

// ANCHOR: imports
import java.time.Duration
import kotlinx.coroutines.runBlocking
import org.nostrdevkit.sdk.*
// ANCHOR_END: imports

// ANCHOR: stream
suspend fun streamEvents() {
    val client = Client()
    client.addRelay(RelayUrl.parse("wss://relay.damus.io"))
    client.connect()

    val filter = Filter()
        .kind(Kind.fromStd(KindStandard.TEXT_NOTE))
        .limit(20u)
    val stream = client.streamEvents(
        ReqTarget.auto(listOf(filter)),
        timeout = Duration.ofSeconds(10),
    )

    while (true) {
        val item = stream.next() ?: break
        val event = item.event
        val error = item.error
        when {
            event != null -> println("${item.relayUrl}: ${event.asJson()}")
            error != null -> System.err.println("${item.relayUrl}: $error")
        }
    }

}
// ANCHOR_END: stream

// ANCHOR: fetch
suspend fun fetchEvents() {
    val client = Client()
    client.addRelay(RelayUrl.parse("wss://relay.damus.io"))
    client.connect()

    val filter = Filter()
        .kind(Kind.fromStd(KindStandard.TEXT_NOTE))
        .limit(20u)
    val events = client.fetchEvents(
        ReqTarget.auto(listOf(filter)),
        timeout = Duration.ofSeconds(10),
    )

    for (event in events) {
        println(event.asJson())
    }

}
// ANCHOR_END: fetch

fun readMain() = runBlocking {
    streamEvents()
    fetchEvents()
}
