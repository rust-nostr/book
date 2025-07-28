// ANCHOR: full
import Foundation
import NostrSDK

func stream() async throws {
    let client = Client()

    let relayUrl = try RelayUrl.parse(url: "wss://relay.damus.io")
    try await client.addRelay(url: relayUrl)
    await client.connect()

    // ANCHOR: init-stream
    // TODO: not supported yet
    // ANCHOR_END: init-stream

    // ANCHOR: consume-stream
    // TODO: not supported yet
    // ANCHOR_END: consume-stream
}
// ANCHOR_END: full
