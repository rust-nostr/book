package rust.nostr.snippets

import kotlinx.coroutines.runBlocking
// ANCHOR: gossip
import org.nostrdevkit.sdk.*

suspend fun buildGossipClient(databasePath: String): Client {
    val gossip = NostrGossip.sqlite(databasePath)
    val client = ClientBuilder().gossip(gossip).build()
    val capabilities = RelayCapabilities.discovery()

    client.addRelay(RelayUrl.parse("wss://relay.damus.io"), capabilities)
    client.addRelay(RelayUrl.parse("wss://purplepag.es"), capabilities)
    client.connect()

    return client
}
// ANCHOR_END: gossip

fun gossipMain() = runBlocking {
    buildGossipClient("./data/gossip.sqlite")
}
