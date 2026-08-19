namespace Snippets;

// ANCHOR: header
using Nostr.Sdk;

public static class ReadExample
{
// ANCHOR_END: header
    // ANCHOR: stream
    public static async Task StreamEvents()
    {
        var client = new Client();
        await client.AddRelay(RelayUrl.Parse("wss://relay.damus.io"));
        await client.Connect();

        var filter = new Filter()
            .Kind(Kind.FromStd(KindStandard.TextNote))
            .Limit(20);
        using var stream = await client.StreamEvents(
            ReqTarget.Auto([filter]),
            timeout: TimeSpan.FromSeconds(10)
        );

        while (await stream.Next() is { } item)
        {
            if (item.Event is { } @event)
            {
                Console.WriteLine($"{item.RelayUrl}: {@event.AsJson()}");
            }
            else if (item.Error is { } error)
            {
                Console.Error.WriteLine($"{item.RelayUrl}: {error}");
            }
        }

    }
    // ANCHOR_END: stream

    // ANCHOR: fetch
    public static async Task FetchEvents()
    {
        var client = new Client();
        await client.AddRelay(RelayUrl.Parse("wss://relay.damus.io"));
        await client.Connect();

        var filter = new Filter()
            .Kind(Kind.FromStd(KindStandard.TextNote))
            .Limit(20);
        var events = await client.FetchEvents(
            ReqTarget.Auto([filter]),
            timeout: TimeSpan.FromSeconds(10)
        );

        foreach (var @event in events)
        {
            Console.WriteLine(@event.AsJson());
        }

    }
    // ANCHOR_END: fetch
// ANCHOR: footer
}
// ANCHOR_END: footer
