# Choose a library

Nostr Dev Kit includes several Rust crates. This book focuses on the two most commonly used directly: `nostr` and
`nostr-sdk`. The native bindings package their protocol and higher-level SDK APIs together as `nostr-sdk`.

## `nostr`

The Rust `nostr` crate contains protocol types and cryptographic operations. It builds and verifies events, parses keys
and identifiers, constructs filters and messages, and implements supported NIPs. It does not connect to relays.

Use it for protocol-only libraries, offline tools, or applications with their own transport.

## `nostr-sdk`

The Rust `nostr-sdk` crate re-exports `nostr` and adds:

- the client and relay pool;
- network requests and subscriptions;
- gossip-based relay discovery and routing;
- databases and Negentropy sync;
- the embedded relay, behind the `local-relay` feature.

Use it for clients, bots, services, and relays.

## Native bindings

Python, JavaScript, Kotlin, Swift, and C# each publish one `nostr-sdk` package containing protocol and SDK APIs. Names,
durations, iterators, nullable values, and errors follow the host language; the language tabs show those differences.

JavaScript has separate packages for Node.js, Web, and React Native. Web uses WebAssembly and requires explicit
initialization. It also cannot host an embedded relay or use the native LMDB backend.

The next chapter installs the selected package. The rest of the book uses the same concepts across all language tabs.
