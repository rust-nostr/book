import Foundation
import NostrSDK

func publishHello() async throws {
    let keys = Keys.generate()
    let client = Client()

    let relay = try RelayUrl.parse(url: "wss://relay.damus.io")
    _ = try await client.addRelay(url: relay)
    await client.connect()

    let event = try EventBuilder(
        kind: Kind.fromStd(e: .textNote),
        content: "Hello from Nostr Dev Kit!"
    ).finalize(signer: keys)
    let output = try await client.sendEvent(event: event)
    print("Published \(try output.id.toBech32()) to \(output.success)")

}
