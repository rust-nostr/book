// ANCHOR: imports
import Foundation
import NostrSDK
// ANCHOR_END: imports

// ANCHOR: database
func queryDatabase(path: String) async throws {
    let database = try await NostrLmdb.open(path: path)
    let client = ClientBuilder().database(database: database).build()

    let filter = Filter()
        .kind(kind: Kind.fromStd(e: .textNote))
        .limit(limit: 20)
    let events = try await client.database().query(filter: filter)
    print("Found \(events.count) stored events")
}
// ANCHOR_END: database

// ANCHOR: sync
func syncEvents(path: String) async throws {
    let database = try await NostrLmdb.open(path: path)
    let client = ClientBuilder().database(database: database).build()

    _ = try await client.addRelay(
        url: try RelayUrl.parse(url: "wss://relay.damus.io")
    )
    await client.connect()

    let filter = Filter()
        .kind(kind: Kind.fromStd(e: .textNote))
        .limit(limit: 20)
    let opts = SyncOptions().direction(direction: .down)
    let output = try await client.sync(filter: filter, opts: opts)
    print(output)
}
// ANCHOR_END: sync
