import asyncio

from nostr_sdk import (
    Client,
    ClientNotification,
    Filter,
    Kind,
    KindStandard,
    RelayUrl,
    ReqTarget,
    Timestamp,
)


async def main() -> None:
    client = Client()
    await client.add_relay(RelayUrl.parse("wss://relay.damus.io"))
    await client.connect()

    notifications = client.notifications()
    filter = (
        Filter()
        .kind(Kind.from_std(KindStandard.TEXT_NOTE))
        .since(Timestamp.now())
    )
    subscription = await client.subscribe(ReqTarget.auto([filter]))

    while notification := await notifications.next():
        if isinstance(notification, ClientNotification.NEW_EVENT):
            if notification.subscription_id == subscription.id:
                print(
                    f"Received {notification.event.id().to_bech32()} "
                    f"from {notification.relay_url}"
                )
                break

    await client.unsubscribe(subscription.id)


if __name__ == "__main__":
    asyncio.run(main())
