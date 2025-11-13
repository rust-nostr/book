# Fetching events

Request the events and wait until all relays return the result.

## Initialize the client

For fetching events is usually<sup>1</sup> not required a signer, so we can create a `Client` without signer.
Then, add the relays and connect.

<custom-tabs category="lang">
<div slot="title">Rust</div>
<section>

```rust,ignore
{{#include ../../../../snippets/rust/src/req/fetch.rs:client}}
```

</section>

<div slot="title">Python</div>
<section>

```python,ignore
{{#include ../../../../snippets/python/src/req/fetch.py:client}}
```

</section>

<div slot="title">JavaScript</div>
<section>

```typescript,ignore
{{#include ../../../../snippets/js/src/req/fetch.ts:client}}
```

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin,ignore
{{#include ../../../../snippets/kotlin/src/main/kotlin/req/Fetch.kt:client}}
```

</section>

<div slot="title">Swift</div>
<section>

```swift,ignore
{{#include ../../../../snippets/swift/Sources/Req/Fetch.swift:client}}
```

</section>

<div slot="title">C#</div>
<section>

```cs,ignore
{{#include ../../../../snippets/csharp/Req/Fetch.cs:client}}
```

</section>

<div slot="title">Flutter</div>
<section>

```dart,ignore
{{#include ../../../../snippets/flutter/lib/req/fetch.dart:client}}
```

</section>
</custom-tabs>

<small>1. In some cases is required the signer to preform the NIP-42 authentication (i.e., to access to private/paid relays).</small>

## Fetch

After building the client and connecting the relays, we can create a [`Filter`](../../messages/filters.md) and perform our first fetch.

<custom-tabs category="lang">
<div slot="title">Rust</div>
<section>

```rust,ignore
{{#include ../../../../snippets/rust/src/req/fetch.rs:fetch}}
```

</section>

<div slot="title">Python</div>
<section>

```python,ignore
{{#include ../../../../snippets/python/src/req/fetch.py:fetch}}
```

</section>

<div slot="title">JavaScript</div>
<section>

```typescript,ignore
{{#include ../../../../snippets/js/src/req/fetch.ts:fetch}}
```

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin,ignore
{{#include ../../../../snippets/kotlin/src/main/kotlin/req/Fetch.kt:fetch}}
```

</section>

<div slot="title">Swift</div>
<section>

```swift,ignore
{{#include ../../../../snippets/swift/Sources/Req/Fetch.swift:fetch}}
```

</section>

<div slot="title">C#</div>
<section>

```cs,ignore
{{#include ../../../../snippets/csharp/Req/Fetch.cs:fetch}}
```

</section>

<div slot="title">Flutter</div>
<section>

```dart,ignore
{{#include ../../../../snippets/flutter/lib/req/fetch.dart:fetch}}
```

</section>
</custom-tabs>

## Fetch from specific relays

You may want to fetch the events from specific relays:

<custom-tabs category="lang">
<div slot="title">Rust</div>
<section>

```rust,ignore
{{#include ../../../../snippets/rust/src/req/fetch.rs:fetch-from}}
```

</section>

<div slot="title">Python</div>
<section>

```python,ignore
{{#include ../../../../snippets/python/src/req/fetch.py:fetch-from}}
```

</section>

<div slot="title">JavaScript</div>
<section>

```typescript,ignore
{{#include ../../../../snippets/js/src/req/fetch.ts:fetch-from}}
```

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin,ignore
{{#include ../../../../snippets/kotlin/src/main/kotlin/req/Fetch.kt:fetch-from}}
```

</section>

<div slot="title">Swift</div>
<section>

```swift,ignore
{{#include ../../../../snippets/swift/Sources/Req/Fetch.swift:fetch-from}}
```

</section>

<div slot="title">C#</div>
<section>

```cs,ignore
{{#include ../../../../snippets/csharp/Req/Fetch.cs:fetch-from}}
```

</section>

<div slot="title">Flutter</div>
<section>

```dart,ignore
{{#include ../../../../snippets/flutter/lib/req/fetch.dart:fetch-from}}
```

</section>
</custom-tabs>

```admonish warning
The specified relays must be already added and connected!
```

## Full example

<custom-tabs category="lang">
<div slot="title">Rust</div>
<section>

```rust,ignore
{{#include ../../../../snippets/rust/src/req/fetch.rs:full}}
```

</section>

<div slot="title">Python</div>
<section>

```python,ignore
{{#include ../../../../snippets/python/src/req/fetch.py:full}}
```

</section>

<div slot="title">JavaScript</div>
<section>

```typescript,ignore
{{#include ../../../../snippets/js/src/req/fetch.ts:full}}
```

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin,ignore
{{#include ../../../../snippets/kotlin/src/main/kotlin/req/Fetch.kt:full}}
```

</section>

<div slot="title">Swift</div>
<section>

```swift,ignore
{{#include ../../../../snippets/swift/Sources/Req/Fetch.swift:full}}
```

</section>

<div slot="title">C#</div>
<section>

```cs,ignore
{{#include ../../../../snippets/csharp/Req/Fetch.cs:full}}
```

</section>

<div slot="title">Flutter</div>
<section>

```dart,ignore
{{#include ../../../../snippets/flutter/lib/req/fetch.dart:full}}
```

</section>
</custom-tabs>
