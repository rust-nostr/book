# Events

An event is the immutable, signed unit exchanged by Nostr applications. Its ID commits to the author's public key,
creation time, kind, tags, and content; changing any of those fields produces a different event and requires a new
signature.

`EventBuilder` collects kind, content, tags, and an optional timestamp. Finalization creates the canonical unsigned
representation; signing produces the `Event` that can be verified, serialized, stored, or published.

Because its ID and signature cover its fields, a finished `Event` is immutable.

## Build, verify, and decode

This example creates a text note, verifies it, round-trips its protocol JSON, and verifies the decoded value again:

<custom-tabs category="lang">

<div slot="title">Rust</div>
<section>

```rust
{{#include ../snippets/rust/src/bin/protocol.rs:imports}}

{{#include ../snippets/rust/src/bin/protocol.rs:event}}
```

</section>

<div slot="title">Python</div>
<section>

```python
{{#include ../snippets/python/src/core.py:imports}}

{{#include ../snippets/python/src/core.py:event}}
```

</section>

<div slot="title">JavaScript</div>
<section>

<custom-tabs category="javascript-runtime">

<div slot="title">Node.js</div>
<section>

```typescript
{{#include ../snippets/js/node/src/core.ts:imports}}

{{#include ../snippets/js/node/src/core.ts:event}}
```

</section>

<div slot="title">Web</div>
<section>

```typescript
{{#include ../snippets/js/web/src/core.ts:imports}}

{{#include ../snippets/js/web/src/core.ts:event}}
```

</section>

<div slot="title">React Native</div>
<section>

```typescript
{{#include ../snippets/js/react-native/src/core.ts:imports}}

{{#include ../snippets/js/react-native/src/core.ts:event}}
```

</section>
</custom-tabs>

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin
{{#include ../snippets/kotlin/src/main/kotlin/Core.kt:imports}}

{{#include ../snippets/kotlin/src/main/kotlin/Core.kt:event}}
```

</section>

<div slot="title">Swift</div>
<section>

```swift
{{#include ../snippets/swift/Sources/Core.swift:imports}}

{{#include ../snippets/swift/Sources/Core.swift:event}}
```

</section>

<div slot="title">C#</div>
<section>

```csharp
{{#include ../snippets/csharp/Core.cs:header}}

{{#include ../snippets/csharp/Core.cs:event}}
{{#include ../snippets/csharp/Core.cs:footer}}
```

</section>
</custom-tabs>

## Event identity and retries

Changing any signed input produces a different event ID and requires a new signature. Retain the signed `Event` and
resend it when retrying publication.

Rebuilding from an `EventBuilder` is a new creation attempt. With the default timestamp it creates a new event, even if
the displayed content is identical. That may be intentional for a new note, but it is not an idempotent retry.

The next chapter uses typed event fields to describe a relay query with a [filter](filters.md).
