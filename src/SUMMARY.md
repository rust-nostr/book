# Summary

[Introduction](README.md)

# SDK

- [Getting Started](sdk/getting-started.md)
    - [Installation](sdk/install.md)
    - [Hello, rust-nostr!](sdk/hello.md)

- [Signers](sdk/signers/index.md)
    - [Keys](sdk/signers/keys.md)

- [Event](sdk/event/index.md)
    - [JSON](sdk/event/json.md)
    - [Builder](sdk/event/builder.md)

- [Filters](sdk/messages/filters.md)

- [Client](sdk/client/index.md)
    - [Requesting events](sdk/client/req/index.md)
        - [Fetch](sdk/client/req/fetch.md) 
        - [Stream](sdk/client/req/stream.md)
        - [Sync](sdk/client/req/sync.md)
        - [Subscribe](sdk/client/req/subscribe.md)

- [NIPs](sdk/nips/index.md)
    - [NIP-01: Basic protocol flow description](sdk/nips/01.md)
    - [NIP-05: Mapping nostr keys to DNS-based internet identifiers](sdk/nips/05.md)
    - [NIP-06: Key derivation from seed phrase](sdk/nips/06.md)
    - [NIP-17: Private Direct Messages](sdk/nips/17.md)
    - [NIP-19: bech32-encoded entities](sdk/nips/19.md)
    - [NIP-21: nostr URI scheme](sdk/nips/21.md)
    - [NIP-44: Encrypted Payloads](sdk/nips/44.md)
    - [NIP-47: Nostr Wallet Connect](sdk/nips/47.md)
    - [NIP-49: Private Key Encryption](sdk/nips/49.md)
    - [NIP-59: Gift Wrap](sdk/nips/59.md)
    - [NIP-65: Relay List Metadata](sdk/nips/65.md)

# Advanced

- [Enabling logging](sdk/logging.md)
- [Messages](sdk/messages/index.md)
    - [Client Message](sdk/messages/client.md)
    - [Relay Message](sdk/messages/relay.md)
