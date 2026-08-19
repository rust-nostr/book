namespace Snippets;

// ANCHOR: header
using Nostr.Sdk;

public static class CoreExample
{
// ANCHOR_END: header
    // ANCHOR: keys
    public static void KeysExample()
    {
        var keys = Keys.Generate();
        var publicKey = keys.PublicKey();
        var encoded = publicKey.ToBech32();
        var parsed = PublicKey.Parse(encoded);

        Console.WriteLine($"Public key: {parsed.ToBech32()}");
    }
    // ANCHOR_END: keys

    // ANCHOR: event
    public static void EventExample()
    {
        var keys = Keys.Generate();
        var @event = new EventBuilder(
            Kind.FromStd(KindStandard.TextNote),
            "Hello, Nostr!"
        ).Finalize(keys);
        if (!@event.Verify()) throw new InvalidOperationException("Invalid event");

        var decoded = Event.FromJson(@event.AsJson());
        if (!decoded.Verify()) throw new InvalidOperationException("Invalid decoded event");
        Console.WriteLine($"Event ID: {decoded.Id().ToBech32()}");
    }
    // ANCHOR_END: event

    // ANCHOR: filter
    public static void FilterExample()
    {
        var publicKey = Keys.Generate().PublicKey();
        var filter = new Filter()
            .Author(publicKey)
            .Kind(Kind.FromStd(KindStandard.TextNote))
            .Since(Timestamp.Now())
            .Limit(20);

        Console.WriteLine($"Filter: {filter.AsJson()}");
    }
    // ANCHOR_END: filter
// ANCHOR: footer
}
// ANCHOR_END: footer
