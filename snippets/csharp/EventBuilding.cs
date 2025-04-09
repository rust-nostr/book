namespace Snippets;

// ANCHOR: full
using Nostr.Sdk;

public class EventBuilding
{
    async Task SignAndPrint(NostrSigner signer, EventBuilder builder)
    {
        // ANCHOR: sign
        var nostrEvent = await builder.Sign(signer);
        // ANCHOR_END: sign
    
        Console.WriteLine(nostrEvent.AsJson());
    }

    public async Task Build()
    {
        var keys = Keys.Generate();
        var signer = NostrSigner.Keys(keys);

        // ANCHOR: standard
        var builder1 = EventBuilder.TextNote("Hello");
        // ANCHOR_END: standard
        
        await SignAndPrint(signer, builder1);
        
        // ANCHOR: std-custom
        var tag = Tag.Alt("POW text-note");
        var customTimestamp = Timestamp.FromSecs(1737976769);
        var builder2 = EventBuilder.TextNote("Hello with POW").Tags([tag]).Pow(20).CustomCreatedAt(customTimestamp);
        // ANCHOR_END: std-custom
        
        await SignAndPrint(signer, builder2);
        
        // ANCHOR: custom
        var kind = new Kind(33001);
        var builder3 = new EventBuilder(kind, "My custom event");
        // ANCHOR_END: custom
        
        await SignAndPrint(signer, builder3);
    }
}
// ANCHOR_END: full