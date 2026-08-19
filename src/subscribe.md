# Live subscriptions

A subscription remains active and delivers matching events until it is closed. Open the notification stream before
subscribing so an event arriving immediately after the request cannot be missed by the consumer.

Use this shape when the application needs future events continuously. For a bounded read of stored events, use a
[finite event stream](stream.md) instead.

A subscription is pool state, not merely an iterator returned to one function. The client records it, sends it to
eligible relays, restores it after reconnection where possible, and emits matching events through the shared
notification stream. The returned subscription ID is how application code identifies that state later.

## Avoid the startup race

Client notifications are observed from the moment a notification stream is created; they are not a replay log. The
safe order is therefore:

1. create the notification stream;
2. build a bounded filter and request target;
3. subscribe and retain the returned subscription ID;
4. consume notifications and select events for that ID;
5. unsubscribe during teardown.

Reversing the first two runtime operations can lose an event that arrives after the relay accepts the subscription but
before the application starts observing notifications.

This order protects the local handoff between subscription setup and consumption. 
If a feature needs a complete initial view followed by updates, design an overlap:

1. Start observing notifications.
2. Subscribe with a `since` boundary that overlaps the intended initial history.
3. Fetch or stream the bounded initial history.
4. Merge both paths by event ID and order them using feature semantics.
5. Continue with live notifications.

The overlap trades possible duplicates for avoiding a gap. Event IDs make duplicates straightforward to remove;
recovering an event that was never requested is harder.

<custom-tabs category="lang">

<div slot="title">Rust</div>
<section>

```rust
{{#include ../snippets/rust/src/bin/live.rs}}
```

</section>

<div slot="title">Python</div>
<section>

```python
{{#include ../snippets/python/src/live.py}}
```

</section>

<div slot="title">JavaScript</div>
<section>

<custom-tabs category="javascript-runtime">

<div slot="title">Node.js</div>
<section>

```typescript
{{#include ../snippets/js/node/src/live.ts}}
```

</section>

<div slot="title">Web</div>
<section>

```typescript
{{#include ../snippets/js/web/src/live.ts}}
```

</section>

<div slot="title">React Native</div>
<section>

```typescript
{{#include ../snippets/js/react-native/src/live.ts}}
```

</section>
</custom-tabs>

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin
{{#include ../snippets/kotlin/src/main/kotlin/Live.kt}}
```

</section>

<div slot="title">Swift</div>
<section>

```swift
{{#include ../snippets/swift/Sources/Live.swift}}
```

</section>

<div slot="title">C#</div>
<section>

```csharp
{{#include ../snippets/csharp/Live.cs}}
```

</section>
</custom-tabs>

The example stops after the first matching event only to remain finite.

## Route notifications by subscription ID

The notification stream also carries relay status and other client-wide activity. For event notifications, compare the
subscription ID with the ID returned by `subscribe`.

Subscription setup returns successful and failed relay outcomes. The pool restores active subscriptions after
reconnection where possible, but this does not recover events missed while a relay was unavailable. Use a bounded
catch-up read when that gap matters.

## Close the subscription

Unsubscribing closes the matching relay-side state and prevents it from being restored after reconnection. If the
client itself is dropped, its remaining subscriptions and connections stop with it.

The next chapter uses [Negentropy sync](sync.md) to reconcile a durable local view after startup or a connection gap.
