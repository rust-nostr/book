namespace Snippets;

// ANCHOR: full
using Nostr.Sdk;

public class Hello
{
    public static async Task SayHello()
    {
        // ANCHOR: client
        var keys = Keys.Generate();
        var signer = NostrSigner.Keys(keys);
        var client = new Client(signer);
        // ANCHOR_END: client
        
        // ANCHOR: connect
        var relayUrl = RelayUrl.Parse("wss://relay.damus.io");
        await client.AddRelay(relayUrl);
        await client.Connect();
        // ANCHOR_END: connect
        
        // ANCHOR: publish
        var builder = EventBuilder.TextNote("Hello, rust-nostr!");
        var output = await client.SendEventBuilder(builder);
        // ANCHOR_END: publish
        
        // ANCHOR: output
        Console.WriteLine($"Event ID: {output.id.ToBech32()}");
        Console.WriteLine($"Sent to: {string.Join(", ", output.success)}");
        Console.WriteLine($"Not sent to: {string.Join(", ", output.failed)}");
        // ANCHOR_END: output
    }
}
// ANCHOR_END: full