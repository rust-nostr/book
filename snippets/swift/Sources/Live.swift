import Foundation
import NostrSDK

func receiveLiveEvent() async throws {
    let client = Client()
    let relay = try RelayUrl.parse(url: "wss://relay.damus.io")
    _ = try await client.addRelay(url: relay)
    await client.connect()

    let notifications = client.notifications()
    let filter = Filter()
        .kind(kind: Kind.fromStd(e: .textNote))
        .since(timestamp: Timestamp.now())
    let subscription = try await client.subscribe(
        target: ReqTarget.auto(filters: [filter])
    )

    while let notification = await notifications.next() {
        if case let .newEvent(relayUrl, subscriptionId, event) = notification,
           subscriptionId == subscription.id {
            print("Received \(try event.id().toBech32()) from \(relayUrl)")
            break
        }
    }

    _ = try await client.unsubscribe(subscriptionId: subscription.id)
}
