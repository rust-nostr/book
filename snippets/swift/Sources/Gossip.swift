import Foundation
// ANCHOR: gossip
import NostrSDK

func buildGossipClient(databasePath: String) async throws -> Client {
    let gossip = try await NostrGossip.sqlite(path: databasePath)
    let client = ClientBuilder().gossip(gossip: gossip).build()
    let capabilities = RelayCapabilities.discovery()

    _ = try await client.addRelay(
        url: try RelayUrl.parse(url: "wss://relay.damus.io"),
        capabilities: capabilities
    )
    _ = try await client.addRelay(
        url: try RelayUrl.parse(url: "wss://purplepag.es"),
        capabilities: capabilities
    )
    await client.connect()

    return client
}
// ANCHOR_END: gossip
