namespace Snippets.Req;

// ANCHOR: full
using Nostr.Sdk;

public class Fetch
{
    public static async Task Run()
    {
        // ANCHOR: client
        var client = new Client();

        await client.AddRelay("wss://relay.damus.io");
        await client.Connect();
        // ANCHOR_END: client
        
        // ANCHOR: fetch
        var filter1 = new Filter().Kind(Kind.FromStd(KindStandard.Metadata)).Limit(3);
        var events1 = await client.FetchEvents(filter1, TimeSpan.FromSeconds(10));
        // ANCHOR_END: fetch

        // ANCHOR: fetch-from
        var filter2 = new Filter().Kind(Kind.FromStd(KindStandard.TextNote)).Limit(5);
        var events2 = await client.FetchEventsFrom(["wss://relay.damus.io"], filter2, TimeSpan.FromSeconds(10));
        // ANCHOR_END: fetch-from
    }
}
// ANCHOR_END: full