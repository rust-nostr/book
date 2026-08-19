# Hello, Nostr!

The first program publishes a signed text note. It covers identity, event construction, relay connection, and the
publication result.

<custom-tabs category="lang">

<div slot="title">Rust</div>
<section>

```rust
{{#include ../snippets/rust/src/bin/client.rs}}
```

</section>

<div slot="title">Python</div>
<section>

```python
{{#include ../snippets/python/src/client.py}}
```

</section>

<div slot="title">JavaScript</div>
<section>

<custom-tabs category="javascript-runtime">

<div slot="title">Node.js</div>
<section>

```typescript
{{#include ../snippets/js/node/src/client.ts}}
```

</section>

<div slot="title">Web</div>
<section>

```typescript
{{#include ../snippets/js/web/src/client.ts}}
```

The Web package must finish `uniffiInitAsync()` before any generated SDK type is used.

</section>

<div slot="title">React Native</div>
<section>

```typescript
{{#include ../snippets/js/react-native/src/client.ts}}
```

Call `publishHello` from an application task; React Native applications do not use top-level `await`.

</section>
</custom-tabs>

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin
{{#include ../snippets/kotlin/src/main/kotlin/Client.kt}}
```

</section>

<div slot="title">Swift</div>
<section>

```swift
{{#include ../snippets/swift/Sources/Client.swift}}
```

Call `publishHello()` from an asynchronous application entry point.

</section>

<div slot="title">C#</div>
<section>

```csharp
{{#include ../snippets/csharp/Client.cs:client}}
```

Call `ClientExample.PublishHello()` from an asynchronous entry point.

</section>
</custom-tabs>

## Read the program

Every version performs the same four operations.

### 1. Create a temporary identity

`Keys.generate` creates a fresh key pair. Running the example again produces another author.

### 2. Construct the client

`Client` creates a relay pool with in-memory storage. The same instance is used to connect and publish.

### 3. Register and connect the relay

Adding the URL registers the relay; `connect` starts its managed connection work.

The example uses `wss://relay.damus.io` only as an accessible tutorial endpoint. Public relay uptime and write policy
are outside the SDK's control, so a rejection or timeout does not necessarily mean the program is assembled
incorrectly.

### 4. Build, sign, and publish

The builder creates a NIP-01 text note.

`send_event` and its language equivalents wait for relay acknowledgements and return both the event ID and the relays
that accepted it. Inspect this output when delivery guarantees matter; a successful call does not mean that every
configured relay accepted the event.

The output has this shape; the actual ID and relay set vary on every run:

```text
Published note1... to [wss://relay.damus.io/]
```

No explicit shutdown call is required. When the client is dropped, its relay connections and background tasks are
stopped automatically.

The next three chapters take apart the values used here: [keys and signers](keys.md), [events](events.md), and
[filters](filters.md).
