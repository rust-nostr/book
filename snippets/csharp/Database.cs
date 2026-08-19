namespace Snippets;

// ANCHOR: header
using Nostr.Sdk;

public static class DatabaseExample
{
// ANCHOR_END: header
    // ANCHOR: database
    public static async Task QueryDatabase(string path)
    {
        var database = await NostrLmdb.Open(path);
        var client = new ClientBuilder().Database(database).Build();

        var filter = new Filter()
            .Kind(Kind.FromStd(KindStandard.TextNote))
            .Limit(20);
        var events = await client.Database().Query(filter);
        Console.WriteLine($"Found {events.Length} stored events");
    }
    // ANCHOR_END: database

    // ANCHOR: sync
    public static async Task SyncEvents(string path)
    {
        var database = await NostrLmdb.Open(path);
        var client = new ClientBuilder().Database(database).Build();

        await client.AddRelay(RelayUrl.Parse("wss://relay.damus.io"));
        await client.Connect();

        var filter = new Filter()
            .Kind(Kind.FromStd(KindStandard.TextNote))
            .Limit(20);
        var opts = new SyncOptions().Direction(SyncDirection.Down);
        var output = await client.Sync(filter, opts: opts);
        Console.WriteLine(output);
    }
    // ANCHOR_END: sync
// ANCHOR: footer
}
// ANCHOR_END: footer
