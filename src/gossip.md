# Gossip

Gossip lets the client select relays for the public keys involved in an operation instead of sending every request to
every relay in the pool. It learns read and write relays from NIP-65 lists, inbox relays from NIP-17 lists, and relay
hints observed in events.

The gossip store is separate from the event database. It contains relay-selection data and the information needed to
refresh it. SQLite is recommended when the platform supports it because that knowledge survives restarts; the
in-memory store is useful for Web, tests, and short-lived processes.

## Configure the client

<custom-tabs category="lang">

<div slot="title">Rust</div>
<section>

Rust provides the stores as separate crates. Add the SQLite store to the existing SDK dependencies:

```toml
[dependencies]
{{#include ../snippets/rust/Cargo.toml:gossip-sqlite-dependency}}
```

For an ephemeral store, use this dependency instead:

```toml
{{#include ../snippets/rust/Cargo.toml:gossip-memory-dependency}}
```

```rust
{{#include ../snippets/rust/src/bin/gossip.rs:gossip}}
```

</section>

<div slot="title">Python</div>
<section>

```python
{{#include ../snippets/python/src/gossip.py:gossip}}
```

</section>

<div slot="title">JavaScript</div>
<section>

<custom-tabs category="javascript-runtime">

<div slot="title">Node.js</div>
<section>

```typescript
{{#include ../snippets/js/node/src/gossip.ts:gossip}}
```

</section>

<div slot="title">Web</div>
<section>

```typescript
{{#include ../snippets/js/web/src/gossip.ts:gossip}}
```

The Web package does not expose SQLite, so gossip data is rebuilt after a page reload.

</section>

<div slot="title">React Native</div>
<section>

```typescript
{{#include ../snippets/js/react-native/src/gossip.ts:gossip}}
```

Pass an absolute path inside the application's data directory as `databasePath`.

</section>
</custom-tabs>

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin
{{#include ../snippets/kotlin/src/main/kotlin/Gossip.kt:gossip}}
```

On Android, pass a path inside the application files directory.

</section>

<div slot="title">Swift</div>
<section>

```swift
{{#include ../snippets/swift/Sources/Gossip.swift:gossip}}
```

Pass a path inside Application Support or another application-owned directory.

</section>

<div slot="title">C#</div>
<section>

```csharp
{{#include ../snippets/csharp/Gossip.cs:gossip}}
```

</section>
</custom-tabs>

`ClientBuilder.gossip` enables gossip routing. The discovery relays are marked with `DISCOVERY`, so they are used to
refresh relay lists rather than as general read and write relays. Configure more than one discovery relay so one
unavailable service does not prevent updates.

Requests, subscriptions, sync, and publishing continue to use their normal APIs. With automatic targets, filters and
events containing public keys allow the client to select the corresponding discovered relays. Explicit or manual
targets remain explicit and bypass automatic gossip selection.
