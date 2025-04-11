namespace Snippets;

using Nostr.Sdk;

public class Nip44
{
    public static void Run()
    {
        var keys = Keys.Generate();

        var pk = PublicKey.Parse("79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798");

        var ciphertext = NostrSdkMethods.Nip44Encrypt(keys.SecretKey(), pk, "my message", Nip44Version.V2);
        Console.WriteLine($"Encrypted: {ciphertext}");

        var plaintext = NostrSdkMethods.Nip44Decrypt(keys.SecretKey(), pk, ciphertext);
        Console.WriteLine($"Decrypted: {plaintext}");
    }
}