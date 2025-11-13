// ANCHOR: full
import Foundation
import NostrSDK

func nip09() throws {
    let keys = try Keys.parse(secretKey: "3501454135014541350145413501453fefb02227e449e57cf4d3a3ce05378683")

    // ANCHOR: build
    // Construct the request
    let id = try EventId.parse(id: "7469af3be8c8e06e1b50ef1caceba30392ddc0b6614507398b7d7daa4c218e96")
    let request = EventDeletionRequest(ids: [id], coordinates: [], reason: "these posts were published by accident")

    // Build the event
    let builder = EventBuilder.delete(request: request)
    let event = try builder.signWithKeys(keys: keys)
    // ANCHOR_END: build

    print("Event deletion request: \(try event.asPrettyJson())");
}
// ANCHOR_END: full
