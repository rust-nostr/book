import {
    LocalRelayBuilder,
    NostrLmdb,
} from "@nostrdevkit/nostr-sdk-react-native";

export async function runEmbeddedRelay(databasePath: string) {
    const database = await NostrLmdb.open(databasePath);
    const relay = new LocalRelayBuilder()
        .database(database)
        .port(7777)
        .build();

    await relay.run();
    console.log("Relay URL:", (await relay.url()).toString());

}
