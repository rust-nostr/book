# Collecting events

`fetch_events` runs the same kind of finite request as `stream_events`, but buffers matching events and returns a
deduplicated collection only after the request terminates. It is convenient for a small result set that must be sorted,
compared, or passed to an API expecting a collection.

Prefer [streaming](stream.md) when events can be processed independently, the response size is uncertain, or latency
to the first result matters.

Choose between the two finite request shapes based on the consumer:

| Requirement | Prefer |
|---|---|
| Process each event independently | `stream_events` |
| Start work before all relays reach EOSE | `stream_events` |
| Keep memory bounded by downstream capacity | `stream_events` |
| Sort or compare the complete small result set | `fetch_events` |
| Pass a collection to an existing API | `fetch_events` |

`fetch_events` is not more authoritative than a stream. It uses the same relay request and termination model, then
materializes the successful events for convenience. The tradeoff is that the caller receives no value until the
operation ends and does not retain per-item relay provenance.

<custom-tabs category="lang">

<div slot="title">Rust</div>
<section>

```rust
{{#include ../snippets/rust/src/bin/read.rs:imports}}

{{#include ../snippets/rust/src/bin/read.rs:fetch}}
```

</section>

<div slot="title">Python</div>
<section>

```python
{{#include ../snippets/python/src/read.py:imports}}

{{#include ../snippets/python/src/read.py:fetch}}
```

</section>

<div slot="title">JavaScript</div>
<section>

<custom-tabs category="javascript-runtime">

<div slot="title">Node.js</div>
<section>

```typescript
{{#include ../snippets/js/node/src/read.ts:imports}}

{{#include ../snippets/js/node/src/read.ts:fetch}}
```

</section>

<div slot="title">Web</div>
<section>

```typescript
{{#include ../snippets/js/web/src/read.ts:imports}}

{{#include ../snippets/js/web/src/read.ts:fetch}}
```

</section>

<div slot="title">React Native</div>
<section>

```typescript
{{#include ../snippets/js/react-native/src/read.ts:imports}}

{{#include ../snippets/js/react-native/src/read.ts:fetch}}
```

</section>
</custom-tabs>

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin
{{#include ../snippets/kotlin/src/main/kotlin/Read.kt:imports}}

{{#include ../snippets/kotlin/src/main/kotlin/Read.kt:fetch}}
```

</section>

<div slot="title">Swift</div>
<section>

```swift
{{#include ../snippets/swift/Sources/Read.swift:imports}}

{{#include ../snippets/swift/Sources/Read.swift:fetch}}
```

</section>

<div slot="title">C#</div>
<section>

```csharp
{{#include ../snippets/csharp/Read.cs:header}}

{{#include ../snippets/csharp/Read.cs:fetch}}
{{#include ../snippets/csharp/Read.cs:footer}}
```

</section>
</custom-tabs>

The filter and timeout are the same as in the stream example. Only the consuming shape changes: this call waits for
termination and returns a collection.

## Bound the collection

The filter limit is applied by each relay, not once to the merged collection. Use a selective filter, a timeout, and a
global event cap when a strict collection bound is required.

The SDK validates and deduplicates returned events by ID. Replaceable events and deletions still follow database and
NIP semantics rather than simple ID deduplication.

Fetch errors that prevent target resolution or request creation fail the operation. Relay-specific behavior can still
produce a valid but incomplete collection. If the feature needs to know which relay supplied or failed to supply each
result, use the stream form, where relay provenance and per-item errors remain visible.

Use fetch when the complete, bounded collection is the desired output. Use stream when provenance or early processing
must remain visible.

Both finite forms end on an exit policy. The next chapter covers a request intended to stay open: a
[live subscription](subscribe.md).
