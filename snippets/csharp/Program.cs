using Snippets.Req;

namespace Snippets;

internal static class Program
{
    public static async Task Main()
    {
        // Hello
        await Hello.SayHello();
        
        // Keys
        KeysGenRestore.Generate();
        KeysGenRestore.Restore();

        // Event JSON
        EventJson.DeSer();
        
        // Event Building
        await EventBuilding.Build();
        
        // NIP44
        Nip44.Run();

        // Requesting events
        await Fetch.Run();
    }
}