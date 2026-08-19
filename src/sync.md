# Negentropy sync

Finite reads ask relays to send matching events. Sync instead compares the event IDs in the local database with those
on each target relay using [NIP-77 Negentropy](https://github.com/nostr-protocol/nips/blob/master/77.md), then transfers
only the missing events allowed by the selected direction.

Sync requires a database with a meaningful local event set. Running it against a fresh in-memory client only compares
the relay with temporary process state.

Use sync for startup catch-up, reconnect recovery, backup, or reconciliation. Use [streaming](stream.md) when events
should be processed immediately without maintaining a local replica. The target relay must support NIP-77.

## Reconcile a bounded set

The example downloads up to 20 matching text notes into the database.

<custom-tabs category="lang">

<div slot="title">Rust</div>
<section>

```rust
{{#include ../snippets/rust/src/bin/database.rs:imports}}
{{#include ../snippets/rust/src/bin/database.rs:sync}}
```

</section>

<div slot="title">Python</div>
<section>

```python
{{#include ../snippets/python/src/database.py:imports}}
{{#include ../snippets/python/src/database.py:sync}}
```

</section>

<div slot="title">JavaScript</div>
<section>

<custom-tabs category="javascript-runtime">

<div slot="title">Node.js</div>
<section>

```typescript
{{#include ../snippets/js/node/src/database.ts:imports}}
{{#include ../snippets/js/node/src/database.ts:sync}}
```

</section>

<div slot="title">Web</div>
<section>

The Web package does not bundle a persistent database. Implement `NostrDatabase` over browser storage and pass it to
`ClientBuilder.database` before using sync. An in-memory sync is intentionally not shown because it does not provide a
durable local replica.

</section>

<div slot="title">React Native</div>
<section>

```typescript
{{#include ../snippets/js/react-native/src/database.ts:imports}}
{{#include ../snippets/js/react-native/src/database.ts:sync}}
```

</section>
</custom-tabs>

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin
{{#include ../snippets/kotlin/src/main/kotlin/Database.kt:imports}}
{{#include ../snippets/kotlin/src/main/kotlin/Database.kt:sync}}
```

</section>

<div slot="title">Swift</div>
<section>

```swift
{{#include ../snippets/swift/Sources/Database.swift:imports}}
{{#include ../snippets/swift/Sources/Database.swift:sync}}
```

Pass a URL-derived path inside Application Support or another application-owned directory.

</section>

<div slot="title">C#</div>
<section>

```csharp
{{#include ../snippets/csharp/Database.cs:header}}
{{#include ../snippets/csharp/Database.cs:sync}}
{{#include ../snippets/csharp/Database.cs:footer}}
```

</section>
</custom-tabs>

The example selects downward sync so it cannot publish local events. Adjust the filter's authors, kinds, tags, and
limit to match the data set the application needs locally.

After sync, inspect the returned relay outcome before treating the local view as reconciled, then query the database.
Add a live subscription when new events must continue arriving after sync ends. The current direction, targeting,
timeout, progress, and result APIs belong in the references collected in [Where to go next](next-steps.md), rather
than being duplicated here.
