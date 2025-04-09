namespace Snippets;

internal static class Program
{
    public static async Task Main()
    {
        // Hello
        // var hello = new Hello();
        // await hello.SayHello();
        
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
    }
}