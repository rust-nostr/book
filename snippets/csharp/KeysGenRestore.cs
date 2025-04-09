namespace Snippets;

using Nostr.Sdk;

public class KeysGenRestore
{
    // ANCHOR: generate
    public void Generate()
    {
        var keys = Keys.Generate();

        var publicKey = keys.PublicKey();
        var secretKey = keys.SecretKey();

        Console.WriteLine($"Public key (hex): {publicKey.ToHex()}");
        Console.WriteLine($"Secret key (hex): {secretKey.ToHex()}");
        
        Console.WriteLine($"Public key (bech32): {publicKey.ToBech32()}");
        Console.WriteLine($"Secret key (bech32): {secretKey.ToBech32()}");
    }
    // ANCHOR_END: generate


    // ANCHOR: restore
    public void Restore()
    {
        // Parse keys directly from secret key
        var keys1 = Keys.Parse("nsec1j4c6269y9w0q2er2xjw8sv2ehyrtfxq3jwgdlxj6qfn8z4gjsq5qfvfk99");
    
        // Parse secret key and construct keys
        var secretKey =
            SecretKey.Parse("nsec1j4c6269y9w0q2er2xjw8sv2ehyrtfxq3jwgdlxj6qfn8z4gjsq5qfvfk99");
        var keys2 = new Keys(secretKey);
    }
    // ANCHOR_END: restore
}