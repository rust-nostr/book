namespace Snippets;

internal static class Program
{
    public static async Task Main()
    {
        // Hello
        var hello = new Hello();
        await hello.SayHello();
        
        // Keys
        var keys = new KeysGenRestore();
        keys.Generate();
        keys.Restore();

        // Event JSON
        var json = new EventJson();
        json.DeSer();
        
        // Event Building
        var building = new EventBuilding();
        await building.Build();
        
        // NIP44
        var nip44 = new Nip44();
        nip44.Run();
    }
}