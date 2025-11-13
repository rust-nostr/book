namespace Snippets;

using Nostr.Sdk;

public class Nip09
{
    public static void Run()
    {
        var keys = Keys.Parse("3501454135014541350145413501453fefb02227e449e57cf4d3a3ce05378683");

        // ANCHOR: build
        // Construct the request
        var id = EventId.Parse("7469af3be8c8e06e1b50ef1caceba30392ddc0b6614507398b7d7daa4c218e96");
        var request = new EventDeletionRequest(ids: [id], coordinates: [], reason: "these posts were published by accident");

        // Build the event
        Event e = EventBuilder.Delete(request).SignWithKeys(keys);
        // ANCHOR_END: build
        
        Console.WriteLine($"Event deletion request: {e.AsPrettyJson()}");
    }
}