package rust.nostr.snippets

// ANCHOR: imports
import org.nostrdevkit.sdk.*
// ANCHOR_END: imports

// ANCHOR: database
suspend fun queryDatabase() {
    val database = NostrLmdb.open("./data/nostr")
    val client = ClientBuilder().database(database).build()

    val filter = Filter()
        .kind(Kind.fromStd(KindStandard.TEXT_NOTE))
        .limit(20u)
    val events = client.database().query(filter)
    println("Found ${events.size} stored events")
}
// ANCHOR_END: database

// ANCHOR: sync
suspend fun syncEvents() {
    val database = NostrLmdb.open("./data/nostr")
    val client = ClientBuilder().database(database).build()

    client.addRelay(RelayUrl.parse("wss://relay.damus.io"))
    client.connect()

    val filter = Filter()
        .kind(Kind.fromStd(KindStandard.TEXT_NOTE))
        .limit(20u)
    val opts = SyncOptions().direction(SyncDirection.DOWN)
    val output = client.sync(filter, opts = opts)
    println(output)
}
// ANCHOR_END: sync
