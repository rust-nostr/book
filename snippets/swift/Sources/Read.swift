// ANCHOR: imports
import Foundation
import NostrSDK
// ANCHOR_END: imports

// ANCHOR: stream
func streamEvents() async throws {
    let client = Client()
    let relay = try RelayUrl.parse(url: "wss://relay.damus.io")
    _ = try await client.addRelay(url: relay)
    await client.connect()

    let filter = Filter()
        .kind(kind: Kind.fromStd(e: .textNote))
        .limit(limit: 20)
    let stream = try await client.streamEvents(
        target: ReqTarget.auto(filters: [filter]),
        timeout: 10.0
    )

    while let item = await stream.next() {
        if let event = item.event {
            print("\(item.relayUrl): \(try event.asJson())")
        } else if let error = item.error {
            print("\(item.relayUrl): \(error)")
        }
    }

}
// ANCHOR_END: stream

// ANCHOR: fetch
func fetchEvents() async throws {
    let client = Client()
    let relay = try RelayUrl.parse(url: "wss://relay.damus.io")
    _ = try await client.addRelay(url: relay)
    await client.connect()

    let filter = Filter()
        .kind(kind: Kind.fromStd(e: .textNote))
        .limit(limit: 20)
    let events = try await client.fetchEvents(
        target: ReqTarget.auto(filters: [filter]),
        timeout: 10.0
    )

    for event in events {
        print(try event.asJson())
    }

}
// ANCHOR_END: fetch
