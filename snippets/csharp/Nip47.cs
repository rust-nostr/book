namespace Snippets;

// ANCHOR: full
using Nostr.Sdk;

public class Nip47
{
    public async Task Run()
    {
        // Parse NWC uri
        var uri = NostrWalletConnectUri.Parse("nostr+walletconnect://..");

        // Initialize NWC client
        var nwc = new Nwc(uri);
        
        // Get info
        var info = await nwc.GetInfo();
        Console.WriteLine(info);

        // Get balance
        var balance = await nwc.GetBalance();
        Console.WriteLine($"Balance: {balance} mSAT");

        // Pay an invoice
        var param1 = new PayInvoiceRequest(null, "lnbc..", null);
        await nwc.PayInvoice(param1);

        // Make an invoice
        var param2 = new MakeInvoiceRequest(100, null, null, null);
        var result = await nwc.MakeInvoice(param2);
        Console.WriteLine($"Invoice: {result.invoice}");
    }
}
// ANCHOR_END: full