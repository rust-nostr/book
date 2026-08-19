# Databases

The client database is the local event store used by queries and reconciliation. It indexes events by Nostr filters
and applies protocol storage rules such as replacement and deletion.

Configure a persistent backend before building the client when local history must
survive restarts or be used by [Negentropy sync](sync.md).

## Use LMDB

Rust provides LMDB through the separate [`nostr-lmdb`](https://docs.rs/nostr-lmdb) crate. The native bindings include
`NostrLmdb` in the `nostr-sdk` package. Other Rust backends are listed in the
[Nostr repository](https://github.com/nostrdevkit/nostr).

The usual setup is to open one database for an application-owned path, pass it to `ClientBuilder`, and query it through
the client. Binding-specific differences are noted in their tabs.

<custom-tabs category="lang">

<div slot="title">Rust</div>
<section>

Add the backend alongside `nostr-sdk`:

```toml
[dependencies]
{{#include ../snippets/rust/Cargo.toml:database-dependency}}
```

```rust
{{#include ../snippets/rust/src/bin/database.rs:imports}}
{{#include ../snippets/rust/src/bin/database.rs:database}}
```

</section>

<div slot="title">Python</div>
<section>

```python
{{#include ../snippets/python/src/database.py:imports}}
{{#include ../snippets/python/src/database.py:database}}
```

</section>

<div slot="title">JavaScript</div>
<section>

<custom-tabs category="javascript-runtime">

<div slot="title">Node.js</div>
<section>

```typescript
{{#include ../snippets/js/node/src/database.ts:imports}}
{{#include ../snippets/js/node/src/database.ts:database}}
```

</section>

<div slot="title">Web</div>
<section>

The Web package exposes the database interface but does not bundle a persistent backend. Implement `NostrDatabase`
over browser storage and pass it to `ClientBuilder.database`; the default in-memory store is not a replacement for
durable browser data.

</section>

<div slot="title">React Native</div>
<section>

```typescript
{{#include ../snippets/js/react-native/src/database.ts:imports}}
{{#include ../snippets/js/react-native/src/database.ts:database}}
```

Pass an absolute path inside the application's data directory as `databasePath`.

</section>
</custom-tabs>

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin
{{#include ../snippets/kotlin/src/main/kotlin/Database.kt:imports}}
{{#include ../snippets/kotlin/src/main/kotlin/Database.kt:database}}
```

On Android, use a path inside the application files directory rather than a relative path.

</section>

<div slot="title">Swift</div>
<section>

```swift
{{#include ../snippets/swift/Sources/Database.swift:imports}}
{{#include ../snippets/swift/Sources/Database.swift:database}}
```

Pass a URL-derived path inside Application Support or another application-owned directory.

</section>

<div slot="title">C#</div>
<section>

```csharp
{{#include ../snippets/csharp/Database.cs:header}}
{{#include ../snippets/csharp/Database.cs:database}}
{{#include ../snippets/csharp/Database.cs:footer}}
```

</section>
</custom-tabs>

`client.database().query()` is a local operation. It does not contact relays and an empty result says only that no
matching event is currently stored. Use a finite request when the feature needs a fresh network read, or sync before
querying when the local store is the application's read model.

## How events reach the store

Validated events received through client requests and subscriptions are available to the configured database. Sync
also writes events downloaded from relays. Applications may call `save_event` directly for an already verified event,
but that method assumes verification has happened; do not use it as an ingestion path for untrusted wire data.

Database filters use the same `Filter` type as relay requests, but a local query has no network freshness or relay
provenance. Use a relay request for fresh remote data, or sync first when the database is the application's local view.
