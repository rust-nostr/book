namespace Snippets;

using Nostr.Sdk;

public static class LiveExample
{
    public static async Task ReceiveLiveEvent()
    {
        var client = new Client();
        await client.AddRelay(RelayUrl.Parse("wss://relay.damus.io"));
        await client.Connect();

        ClientNotificationStream notifications = client.Notifications();
        Filter filter = new Filter()
            .Kind(Kind.FromStd(KindStandard.TextNote))
            .Since(Timestamp.Now());
        SubscribeOutput subscription = await client.Subscribe(ReqTarget.Auto([filter]));

        while (await notifications.Next() is { } notification)
        {
            if (notification is ClientNotification.NewEvent item &&
                item.SubscriptionId == subscription.Id)
            {
                Console.WriteLine($"Received {item.Event.Id().ToBech32()} from {item.RelayUrl}");
                break;
            }
        }

        await client.Unsubscribe(subscription.Id);
    }
}
