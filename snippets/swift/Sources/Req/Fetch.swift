// ANCHOR: full
import Foundation
import NostrSDK

func fetch() async throws {
    // ANCHOR: client
    let client = Client()

    let relayUrl = try RelayUrl.parse(url: "wss://relay.damus.io")
    try await client.addRelay(url: relayUrl)
    await client.connect()
    // ANCHOR_END: client

    // ANCHOR: fetch
    let filter1 = Filter().kind(kind: Kind.fromStd(e: KindStandard.metadata)).limit(limit: 3)
    let events1 = try await client.fetchEvents(filter: filter1, timeout: 10.0)
    // ANCHOR_END: fetch

    // ANCHOR: fetch-from
    let filter2 = Filter().kind(kind: Kind.fromStd(e: KindStandard.textNote)).limit(limit: 5)
    let events2 = try await client.fetchEventsFrom(
        urls: [relayUrl],
        filter: filter2,
        timeout: 10.0
    )
    // ANCHOR_END: fetch-from
}
// ANCHOR_END: full
