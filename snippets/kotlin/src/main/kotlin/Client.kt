package rust.nostr.snippets

import kotlinx.coroutines.runBlocking
import org.nostrdevkit.sdk.*

suspend fun publishHello() {
    val keys = Keys.generate()
    val client = Client()

    val relay = RelayUrl.parse("wss://relay.damus.io")
    client.addRelay(relay)
    client.connect()

    val event = EventBuilder(
        Kind.fromStd(KindStandard.TEXT_NOTE),
        "Hello from Nostr Dev Kit!",
    ).finalize(keys)
    val output = client.sendEvent(event)
    println("Published ${output.id.toBech32()} to ${output.success}")

}

fun main() = runBlocking {
    publishHello()
}
