// ANCHOR: client
namespace Snippets;

using Nostr.Sdk;

public static class ClientExample
{
    public static async Task PublishHello()
    {
        var keys = Keys.Generate();
        var client = new Client();

        var relay = RelayUrl.Parse("wss://relay.damus.io");
        await client.AddRelay(relay);
        await client.Connect();

        var @event = new EventBuilder(
            Kind.FromStd(KindStandard.TextNote),
            "Hello from Nostr Dev Kit!"
        ).Finalize(keys);
        var output = await client.SendEvent(@event);
        Console.WriteLine($"Published {output.Id.ToBech32()} to {string.Join(", ", output.Success)}");

    }
}
// ANCHOR_END: client
