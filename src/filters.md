# Filters

A `Filter` describes a set of events without prescribing which relay should answer the query. Keeping those concerns
separate lets the same filter target the whole pool, one relay, or a manually selected group.

Filter composition follows two rules:

- constraints inside one filter are combined with **AND**;
- multiple filters in one request are combined with **OR**.

For example, one filter containing an author and a text-note kind asks for text notes by that author. Two separate
filters, one for the author and one for the kind, also match every event by that author and every text note by anyone.

A filter can constrain IDs, authors, kinds, timestamps, tags, and the number of stored results requested from each
relay.

## Construct a bounded filter

The example limits the author, kind, lower time boundary, and number of stored results requested from each relay:

<custom-tabs category="lang">

<div slot="title">Rust</div>
<section>

```rust
{{#include ../snippets/rust/src/bin/protocol.rs:imports}}

{{#include ../snippets/rust/src/bin/protocol.rs:filter}}
```

</section>

<div slot="title">Python</div>
<section>

```python
{{#include ../snippets/python/src/core.py:imports}}

{{#include ../snippets/python/src/core.py:filter}}
```

</section>

<div slot="title">JavaScript</div>
<section>

<custom-tabs category="javascript-runtime">

<div slot="title">Node.js</div>
<section>

```typescript
{{#include ../snippets/js/node/src/core.ts:imports}}

{{#include ../snippets/js/node/src/core.ts:filter}}
```

</section>

<div slot="title">Web</div>
<section>

```typescript
{{#include ../snippets/js/web/src/core.ts:imports}}

{{#include ../snippets/js/web/src/core.ts:filter}}
```

</section>

<div slot="title">React Native</div>
<section>

```typescript
{{#include ../snippets/js/react-native/src/core.ts:imports}}

{{#include ../snippets/js/react-native/src/core.ts:filter}}
```

</section>
</custom-tabs>

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin
{{#include ../snippets/kotlin/src/main/kotlin/Core.kt:imports}}

{{#include ../snippets/kotlin/src/main/kotlin/Core.kt:filter}}
```

</section>

<div slot="title">Swift</div>
<section>

```swift
{{#include ../snippets/swift/Sources/Core.swift:imports}}

{{#include ../snippets/swift/Sources/Core.swift:filter}}
```

</section>

<div slot="title">C#</div>
<section>

```csharp
{{#include ../snippets/csharp/Core.cs:header}}

{{#include ../snippets/csharp/Core.cs:filter}}
{{#include ../snippets/csharp/Core.cs:footer}}
```

</section>
</custom-tabs>

This asks each relay for at most 20 text notes by the selected key at or after the timestamp. All four constraints are
in one filter, so they are combined with AND.

## Compose AND and OR deliberately

Suppose an application needs text notes from Alice or Bob. One filter with both authors expresses that request:

```text
authors = [Alice, Bob] AND kinds = [TextNote]
```

Suppose it instead needs Alice's text notes plus Bob's metadata. That requires two filters:

```text
(authors = [Alice] AND kinds = [TextNote])
OR
(authors = [Bob] AND kinds = [Metadata])
```

Each additional filter is another OR branch and can expand the response.

Tag filters follow the same rule. Multiple accepted values for one tag name are alternatives within that constraint;
constraints for different tag names must all match. Use the typed single-letter tag APIs where available instead of
assembling `#` field names as strings.

## Time windows

`since` and `until` are inclusive. Use them to bound a request to the history relevant to the application.

When maintaining local history, reconcile a bounded filter with [Negentropy sync](sync.md) instead of walking through
relay history page by page. Sync compares event IDs and transfers only the missing events.

For a live subscription, `since` also prevents an unbounded initial history. `limit` bounds stored results from each
relay but does not replace a time window.

## Understand pool-wide results

The limit is applied by each relay, not globally across the pool. Results can overlap or arrive out of order; the SDK
validates and deduplicates them by event ID. Relay selection remains separate and is added by the request target.

Filters become network work only when paired with a [client and request target](client.md).
