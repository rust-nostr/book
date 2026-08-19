// ANCHOR: relay
namespace Snippets;

using Nostr.Sdk;

public static class RelayExample
{
    public static async Task RunEmbeddedRelay(string path)
    {
        var database = await NostrLmdb.Open(path);
        var relay = new LocalRelayBuilder()
            .Database(database)
            .Port(7777)
            .Build();

        await relay.Run();
        Console.WriteLine($"Relay URL: {await relay.Url()}");
    }
}
// ANCHOR_END: relay
