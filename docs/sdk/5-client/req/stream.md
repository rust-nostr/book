# Streaming events

Request and immediately receive the events; terminate the stream when all relays satisfy the exit condition.

## Initialize the stream

After building the client and connecting the relays, we can create a [`Filter`](../../messages/filters.md) and initialize the stream.

<custom-tabs category="lang">
<div slot="title">Rust</div>
<section>

```rust,ignore
{{#include ../../../../snippets/rust/src/req/stream.rs:init-stream}}
```

</section>

<div slot="title">Python</div>
<section>

```python,ignore
{{#include ../../../../snippets/python/src/req/stream.py:init-stream}}
```

</section>

<div slot="title">JavaScript</div>
<section>

```typescript,ignore
{{#include ../../../../snippets/js/src/req/stream.ts:init-stream}}
```

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin,ignore
{{#include ../../../../snippets/kotlin/src/main/kotlin/req/Stream.kt:init-stream}}
```

</section>

<div slot="title">Swift</div>
<section>

```swift,ignore
{{#include ../../../../snippets/swift/Sources/Req/Stream.swift:init-stream}}
```

</section>

<div slot="title">C#</div>
<section>

```cs,ignore
{{#include ../../../../snippets/csharp/Req/Stream.cs:init-stream}}
```

</section>

<div slot="title">Flutter</div>
<section>

```dart,ignore
{{#include ../../../../snippets/flutter/lib/req/stream.dart:init-stream}}
```

</section>
</custom-tabs>

## Consume the stream

Now that we have the stream, we can consume it and handle the received [`Event`](../../event/index.md):

<custom-tabs category="lang">
<div slot="title">Rust</div>
<section>

```rust,ignore
{{#include ../../../../snippets/rust/src/req/stream.rs:consume-stream}}
```

</section>

<div slot="title">Python</div>
<section>

```python,ignore
{{#include ../../../../snippets/python/src/req/stream.py:consume-stream}}
```

</section>

<div slot="title">JavaScript</div>
<section>

```typescript,ignore
{{#include ../../../../snippets/js/src/req/stream.ts:consume-stream}}
```

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin,ignore
{{#include ../../../../snippets/kotlin/src/main/kotlin/req/Stream.kt:consume-stream}}
```

</section>

<div slot="title">Swift</div>
<section>

```swift,ignore
{{#include ../../../../snippets/swift/Sources/Req/Stream.swift:consume-stream}}
```

</section>

<div slot="title">C#</div>
<section>

```cs,ignore
{{#include ../../../../snippets/csharp/Req/Stream.cs:consume-stream}}
```

</section>

<div slot="title">Flutter</div>
<section>

```dart,ignore
{{#include ../../../../snippets/flutter/lib/req/stream.dart:consume-stream}}
```

</section>
</custom-tabs>

## Full example

<custom-tabs category="lang">
<div slot="title">Rust</div>
<section>

```rust,ignore
{{#include ../../../../snippets/rust/src/req/stream.rs:full}}
```

</section>

<div slot="title">Python</div>
<section>

```python,ignore
{{#include ../../../../snippets/python/src/req/stream.py:full}}
```

</section>

<div slot="title">JavaScript</div>
<section>

```typescript,ignore
{{#include ../../../../snippets/js/src/req/stream.ts:full}}
```

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin,ignore
{{#include ../../../../snippets/kotlin/src/main/kotlin/req/Stream.kt:full}}
```

</section>

<div slot="title">Swift</div>
<section>

```swift,ignore
{{#include ../../../../snippets/swift/Sources/Req/Stream.swift:full}}
```

</section>

<div slot="title">C#</div>
<section>

```cs,ignore
{{#include ../../../../snippets/csharp/Req/Stream.cs:full}}
```

</section>

<div slot="title">Flutter</div>
<section>

```dart,ignore
{{#include ../../../../snippets/flutter/lib/req/stream.dart:full}}
```

</section>
</custom-tabs>
