import {
    Client,
    ClientNotification,
    Filter,
    Kind,
    KindStandard,
    RelayUrl,
    ReqTarget,
    Timestamp,
} from "@nostrdevkit/nostr-sdk-node";

async function main() {
    const client = new Client();
    await client.addRelay(RelayUrl.parse("wss://relay.damus.io"));
    await client.connect();

    const notifications = client.notifications();
    const filter = new Filter()
        .kind(Kind.fromStd(KindStandard.TextNote))
        .since(Timestamp.now());
    const subscription = await client.subscribe(ReqTarget.auto([filter]));

    while (true) {
        const notification = await notifications.next();
        if (!notification) break;

        if (ClientNotification.NewEvent.instanceOf(notification)) {
            if (notification.inner.subscriptionId === subscription.id) {
                console.log(
                    `Received ${notification.inner.event.id().toBech32()} ` +
                    `from ${notification.inner.relayUrl}`,
                );
                break;
            }
        }
    }

    await client.unsubscribe(subscription.id);
}

await main();
