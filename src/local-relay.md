# Run an embedded relay

`nostr-sdk` can also host a relay inside an application process. This is useful for deterministic integration tests,
device-local services, and applications that need a relay with their own storage and policy. Rust enables it with the
`local-relay` feature; native packages include it where the platform can listen on a socket.

## Start a persistent relay

The example uses LMDB so published events remain available after a restart. For a test fixture, replace it with an
isolated in-memory database owned by the test.

<custom-tabs category="lang">

<div slot="title">Rust</div>
<section>

Enable the relay API and add the database used by the example:

```toml
[dependencies]
{{#include ../snippets/rust/Cargo.toml:database-dependency}}
{{#include ../snippets/rust/Cargo.toml:relay-dependency}}
```

```rust
{{#include ../snippets/rust/src/bin/relay.rs}}
```

</section>

<div slot="title">Python</div>
<section>

```python
{{#include ../snippets/python/src/relay.py}}
```

</section>

<div slot="title">JavaScript</div>
<section>

<custom-tabs category="javascript-runtime">

<div slot="title">Node.js</div>
<section>

```typescript
{{#include ../snippets/js/node/src/relay.ts}}
```

</section>

<div slot="title">Web</div>
<section>

Browsers cannot listen on a TCP port and cannot host an embedded relay. Connect the Web client to a relay running in
another process or service.

</section>

<div slot="title">React Native</div>
<section>

```typescript
{{#include ../snippets/js/react-native/src/relay.ts}}
```

Pass an absolute path inside the application's data directory as `databasePath`.

</section>
</custom-tabs>

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin
{{#include ../snippets/kotlin/src/main/kotlin/Relay.kt}}
```

On Android, replace the example path with one inside the application files directory.

</section>

<div slot="title">Swift</div>
<section>

```swift
{{#include ../snippets/swift/Sources/Relay.swift:relay}}
```

Pass a URL-derived path inside Application Support or another application-owned directory.

</section>

<div slot="title">C#</div>
<section>

```csharp
{{#include ../snippets/csharp/Relay.cs:relay}}
```

</section>
</custom-tabs>

Keep the handle in the component that owns the service. Dropping its last owner stops the relay.

`LocalRelayBuilder` also exposes listener, limit, NIP-42, and read/write policy options. Continue with
[Where to go next](next-steps.md) when the relay needs configuration beyond this minimal setup.
