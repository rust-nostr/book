# Keys and signers

Every event is attributed to a public key and authorized by a signature. The SDK separates the value that identifies an
author from the mechanism that produces that signature:

- `PublicKey` identifies an author and is safe to distribute.
- `SecretKey` is private key material.
- `Keys` contains a matching pair and signs directly.
- a signer provides a public key and signatures without exposing its secret key.

The examples use `Keys` to keep signing visible. Use the signer interface when another component or device owns the
secret.

## Generate and parse an identity

The following code creates a temporary identity, encodes its public key as bech32, and parses it again.

<custom-tabs category="lang">

<div slot="title">Rust</div>
<section>

```rust
{{#include ../snippets/rust/src/bin/protocol.rs:imports}}
{{#include ../snippets/rust/src/bin/protocol.rs:keys}}
```

</section>

<div slot="title">Python</div>
<section>

```python
{{#include ../snippets/python/src/core.py:imports}}
{{#include ../snippets/python/src/core.py:keys}}
```

</section>

<div slot="title">JavaScript</div>
<section>

<custom-tabs category="javascript-runtime">

<div slot="title">Node.js</div>
<section>

```typescript
{{#include ../snippets/js/node/src/core.ts:imports}}
{{#include ../snippets/js/node/src/core.ts:keys}}
```

</section>

<div slot="title">Web</div>
<section>

```typescript
{{#include ../snippets/js/web/src/core.ts:imports}}
{{#include ../snippets/js/web/src/core.ts:keys}}
```

</section>

<div slot="title">React Native</div>
<section>

```typescript
{{#include ../snippets/js/react-native/src/core.ts:imports}}
{{#include ../snippets/js/react-native/src/core.ts:keys}}
```

</section>
</custom-tabs>

</section>

<div slot="title">Kotlin</div>
<section>

```kotlin
{{#include ../snippets/kotlin/src/main/kotlin/Core.kt:imports}}
{{#include ../snippets/kotlin/src/main/kotlin/Core.kt:keys}}
```

</section>

<div slot="title">Swift</div>
<section>

```swift
{{#include ../snippets/swift/Sources/Core.swift:imports}}
{{#include ../snippets/swift/Sources/Core.swift:keys}}
```

</section>

<div slot="title">C#</div>
<section>

```csharp
{{#include ../snippets/csharp/Core.cs:header}}
{{#include ../snippets/csharp/Core.cs:keys}}
{{#include ../snippets/csharp/Core.cs:footer}}
```

</section>
</custom-tabs>

`Keys.generate` creates a new identity every time. Use it for tests or account creation, not when an existing identity
is expected.

Public-key parsing accepts the supported hex and bech32 forms. Keep the parsed `PublicKey` as a typed value inside the
application and encode it only at input or output boundaries.

## Keys or signer

`Keys` signs locally. The signer interface covers hardware, remote signers, browser extensions, and other external
implementations. In both cases the SDK flow is the same:

```text
EventBuilder --> unsigned event --> signer --> Event --> Client
```

External signing can be asynchronous, rejected, or cancelled. Once signed, the resulting `Event` is independent of the
signer and can be passed to the client.

With an identity available, the next chapter constructs the value it signs: an [event](events.md).
