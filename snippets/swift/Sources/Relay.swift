// ANCHOR: relay
import Foundation
import NostrSDK

func runEmbeddedRelay(path: String) async throws {
    let database = try await NostrLmdb.open(path: path)
    let relay = LocalRelayBuilder()
        .database(database: database)
        .port(port: 7777)
        .build()

    try await relay.run()
    print("Relay URL: \(await relay.url())")
}
// ANCHOR_END: relay
