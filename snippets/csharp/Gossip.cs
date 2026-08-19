// ANCHOR: gossip
namespace Snippets;

using Nostr.Sdk;

public static class GossipExample
{
    public static async Task<Client> BuildGossipClient(string databasePath)
    {
        var gossip = await NostrGossip.Sqlite(databasePath);
        var client = new ClientBuilder().Gossip(gossip).Build();
        var capabilities = RelayCapabilities.Discovery();

        await client.AddRelay(RelayUrl.Parse("wss://relay.damus.io"), capabilities);
        await client.AddRelay(RelayUrl.Parse("wss://purplepag.es"), capabilities);
        await client.Connect();

        return client;
    }
}
// ANCHOR_END: gossip
