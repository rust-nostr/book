package rust.nostr.snippets

import kotlinx.coroutines.runBlocking
import org.nostrdevkit.sdk.*

suspend fun receiveLiveEvent() {
    val client = Client()
    client.addRelay(RelayUrl.parse("wss://relay.damus.io"))
    client.connect()

    val notifications = client.notifications()
    val filter = Filter()
        .kind(Kind.fromStd(KindStandard.TEXT_NOTE))
        .since(Timestamp.now())
    val subscription = client.subscribe(ReqTarget.auto(listOf(filter)))

    while (true) {
        when (val notification = notifications.next() ?: break) {
            is ClientNotification.NewEvent -> {
                if (notification.subscriptionId == subscription.id) {
                    println("Received ${notification.event.id().toBech32()} from ${notification.relayUrl}")
                    break
                }
            }
            else -> Unit
        }
    }

    client.unsubscribe(subscription.id)
}

fun main() = runBlocking {
    receiveLiveEvent()
}
