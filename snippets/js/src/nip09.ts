import {EventBuilder, EventDeletionRequest, EventId, Keys, loadWasmSync} from "@rust-nostr/nostr-sdk";

function run() {
    // Load WASM
    loadWasmSync();

    let keys = Keys.parse("3501454135014541350145413501453fefb02227e449e57cf4d3a3ce05378683");

    // ANCHOR: build
    // Construct the request
    let id = EventId.parse("7469af3be8c8e06e1b50ef1caceba30392ddc0b6614507398b7d7daa4c218e96");
    let request = new EventDeletionRequest();
    request.ids = [id];
    request.reason = "these posts were published by accident";


    // Build the event
    let event = EventBuilder.delete(request).signWithKeys(keys);
    // ANCHOR_END: build

    console.log("Event deletion request: " + event.asPrettyJson())
}

run();
