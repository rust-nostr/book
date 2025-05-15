// ANCHOR: full
import Foundation
import NostrSDK

func stream() async throws {
    let client = Client()

    try await client.addRelay(url: "wss://relay.damus.io")
    await client.connect()

    // ANCHOR: init-stream
    // TODO: not supported yet
    // ANCHOR_END: init-stream

    // ANCHOR: consume-stream
    // TODO: not supported yet
    // ANCHOR_END: consume-stream
}
// ANCHOR_END: full
