# Streaming events

Most finite reads should start with `stream_events`. The SDK opens a short-lived request, validates and deduplicates
matching events across the selected relays, and yields each result as soon as it arrives. The application can begin
work immediately and does not need to retain the complete result set in memory.

This is different from a live subscription. A finite stream normally ends at end-of-stored-events (EOSE), when all
relay streams end, or when its timeout expires. A [live subscription](subscribe.md) remains registered until it is
closed.

For a pool request, EOSE happens per relay. One relay may finish immediately, another may yield events first, and a
third may fail or reach the timeout. The SDK merges those independent flows into one stream while preserving the relay
URL on each item.

The following example reads up to 20 text notes per relay and applies a ten-second upper bound:

<custom-tabs category="lang">

<div slot="title">Rust</div>
<section>

```rust
{{#include ../snippets/rust/src/bin/read.rs:imports}}
{{#include ../snippets/rust/src/bin/read.rs:stream}}
```

</section>

<div slot="title">Python</div>
<section>

```python
{{#include ../snippets/python/src/read.py:imports}}
{{#include ../snippets/python/src/read.py:stream}}
```

</section>

<div slot="title">JavaScript</div>
<section>

<custom-tabs category="javascript-runtime">

<div slot="title">Node.js</div>
<section>

```typescript
{{#include ../snippets/js/node/src/read.ts:imports}}
{{#include ../snippets/js/node/src/read.ts:stream}}
```

</section>

<div slot="title">Web</div>
<section>

```typescript
{{#include ../snippets/js/web/src/read.ts:imports}}
{{#include ../snippets/js/web/src/read.ts:stream}}
```

</section>

<div slot="title">React Native</div>
<section>

```typescript
{{#include ../snippets/js/react-native/src/read.ts:imports}}
{{#include ../snippets/js/react-native/src/read.ts:stream}}
```

</section>
</custom-tabs>

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin
{{#include ../snippets/kotlin/src/main/kotlin/Read.kt:imports}}
{{#include ../snippets/kotlin/src/main/kotlin/Read.kt:stream}}
```

</section>

<div slot="title">Swift</div>
<section>

```swift
{{#include ../snippets/swift/Sources/Read.swift:imports}}
{{#include ../snippets/swift/Sources/Read.swift:stream}}
```

</section>

<div slot="title">C#</div>
<section>

```csharp
{{#include ../snippets/csharp/Read.cs:header}}
{{#include ../snippets/csharp/Read.cs:stream}}
{{#include ../snippets/csharp/Read.cs:footer}}
```

</section>
</custom-tabs>

`ReqTarget.auto` resolves eligible relays, the timeout bounds the operation, and `next` yields merged relay outcomes.
The loop can process the first event without waiting for every relay or buffering the complete result set.

## Stream items

Each item is one relay outcome. Rust returns a relay URL with `Result<Event, _>`; the bindings expose the URL and either
an event or an error.

Process successful events even if another relay reports an error. Events are validated and deduplicated by ID before
they reach the client stream, so seeing the same event on several relays does not require application-level
deduplication for that request. The relay URL remains useful for diagnostics and for features whose policy depends on
where an event was observed.

The stream completes when `next` returns no item. EOSE applies to the queried relays; it is not a claim that no other
relay has matching events.

## Request targets and termination

The filter describes what should match; the request target describes where it should be requested. `ReqTarget.auto`
uses relays with read capability and can incorporate relay discovery when [gossip](gossip.md) is enabled. `single` and `manual`
targets are available when the application needs exact relay selection or different filters per relay.

EOSE is the default successful completion policy; the timeout is the upper bound when completion does not arrive.
Other exit policies are available in the API reference. Stop consuming and release the stream when the caller has
enough data.

Use [collecting events](fetch.md) when the next operation genuinely requires the complete result set.
