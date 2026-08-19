package rust.nostr.snippets

import kotlinx.coroutines.runBlocking
import org.nostrdevkit.sdk.LocalRelayBuilder
import org.nostrdevkit.sdk.NostrLmdb

suspend fun runEmbeddedRelay() {
    val database = NostrLmdb.open("./data/relay")
    val relay = LocalRelayBuilder()
        .database(database)
        .port(7777u)
        .build()

    relay.run()
    println("Relay URL: ${relay.url()}")

}

fun relayMain() = runBlocking {
    runEmbeddedRelay()
}
