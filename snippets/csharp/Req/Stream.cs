namespace Snippets.Req;

// ANCHOR: full
using Nostr.Sdk;

public class Stream
{
    public static async Task Run()
    {
        var client = new Client();

        var relayUrl = RelayUrl.Parse("wss://relay.damus.io");
        await client.AddRelay(relayUrl);
        await client.Connect();

        // ANCHOR: init-stream
        // TODO: not supported yet
        // ANCHOR_END: init-stream

        // ANCHOR: consume-stream
        // TODO: not supported yet
        // ANCHOR_END: consume-stream
    }
}
// ANCHOR_END: full
