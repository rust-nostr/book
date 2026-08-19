# Installation

<custom-tabs category="lang">

<div slot="title">Rust</div>
<section>

The Rust crates are published on crates.io as [`nostr`](https://crates.io/crates/nostr) and
[`nostr-sdk`](https://crates.io/crates/nostr-sdk). For protocol-only code:

```toml
[dependencies]
nostr = "0.45"
```

For a networked application:

```toml
[dependencies]
nostr-sdk = "0.45"
```

Both crates require Rust 1.85 or later. Start with default features; chapters that require another crate or an opt-in feature show it where it is used. 
See [`nostr`](https://docs.rs/nostr) and [`nostr-sdk`](https://docs.rs/nostr-sdk) feature lists.

</section>

<div slot="title">Python</div>
<section>

Python 3.9 or later is required. Install the package from [PyPI](https://pypi.org/project/nostr-sdk):

```bash
pip install nostr-sdk==0.45.1
```

### Supported platforms

Prebuilt wheels contain the native library for these targets:

| OS            | x86_64 | aarch64 | armv7 | i686 | riscv64 |
|---------------|:------:|:-------:|:-----:|:----:|:-------:|
| Android       |   ❌   |   ❌    |  ❌   |  ❌  |   ❌    |
| Linux (GLIBC) |   ✅   |   ✅    |  ✅   |  ✅  |   ❌    |
| Linux (MUSL)  |   ✅   |   ✅    |  ✅   |  ✅  |   ❌    |
| FreeBSD       |   ❌   |   ❌    |  ❌   |  ❌  |   ❌    |
| macOS         |   ✅   |   ✅    |  ❌   |  ❌  |   ❌    |
| Windows       |   ✅   |   ✅    |  ❌   |  ✅  |   ❌    |

### No running event loop

Normal client calls work inside `asyncio.run`. A custom database, websocket implementation, or admission policy can be
called from an SDK-owned thread instead. If an asynchronous callback fails with `no running event loop`, register the
application loop before constructing that callback:

```python
{{#include ../snippets/python/src/event_loop.py}}
```

Call this from inside the application's running async entry point, not at module import time.

</section>

<div slot="title">JavaScript</div>
<section>

Install exactly one package for the target runtime from the NostrDevKit npm organization.

<custom-tabs category="javascript-runtime">

<div slot="title">Node.js</div>
<section>

```bash
npm install @nostrdevkit/nostr-sdk-node@0.45.1
```

Node.js 20 or later is required.

| OS            | x86_64 | aarch64 | armv7 | i686 | riscv64 |
|---------------|--------|---------|-------|------|---------|
| Android       | ❌     | ❌      | ❌    | ❌   | ❌      |
| iOS           | ❌     | ❌      | ❌    | ❌   | ❌      |
| Linux (GLIBC) | ✅     | ✅      | ❌    | ❌   | ❌      |
| Linux (MUSL)  | ✅     | ✅      | ❌    | ❌   | ❌      |
| FreeBSD       | ❌     | ❌      | ❌    | ❌   | ❌      |
| macOS         | ✅     | ✅      | ❌    | ❌   | ❌      |
| Windows       | ✅     | ✅      | ❌    | ❌   | ❌      |

</section>

<div slot="title">Web</div>
<section>

```bash
npm install @nostrdevkit/nostr-sdk-web@0.45.1
```

Use a bundler that emits the package's WebAssembly asset. Call `await uniffiInitAsync()` once before constructing any
generated SDK type.

| Runtime      | Supported |
|--------------|-----------|
| Web browsers | ✅        |
| Node.js      | ❌        |
| React Native | ❌        |

</section>

<div slot="title">React Native</div>
<section>

```bash
npm install @nostrdevkit/nostr-sdk-react-native@0.45.1
```

React Native 0.76 or later with the New Architecture enabled is required.

| Platform      | x86_64 | aarch64 | armv7 | i686 |
|---------------|--------|---------|-------|------|
| Android       | ✅     | ✅      | ✅    | ✅   |
| iOS device    | ❌     | ✅      | ❌    | ❌   |
| iOS simulator | ✅     | ✅      | ❌    | ❌   |

</section>
</custom-tabs>

</section>

<div slot="title">Kotlin</div>
<section>

Select one artifact for the application target:

```kotlin
dependencies {
    implementation("org.nostrdevkit:nostr-sdk:0.45.1")     // Android, minSdk 21
    implementation("org.nostrdevkit:nostr-sdk-jvm:0.45.1") // JVM 11+
    implementation("org.nostrdevkit:nostr-sdk-kmp:0.45.1") // Kotlin Multiplatform
}
```

Types are imported from `org.nostrdevkit.sdk`. The Android artifact requires API 21 or later, the standalone JVM
artifact requires Java 11 or later, and the KMP JVM target requires Java 17.

### Supported platforms

| OS            | x86_64 | aarch64 | armv7 | i686 | riscv64 | Package                          |
|---------------|:------:|:-------:|:-----:|:----:|:-------:|----------------------------------|
| Android       |   ✅   |   ✅    |  ✅   |  ✅  |   ❌    | `nostr-sdk`, `nostr-sdk-kmp`     |
| iOS           |   ✅   |   ✅    |  ❌   |  ❌  |   ❌    | `nostr-sdk-kmp`                  |
| Linux (GLIBC) |   ✅   |   ✅    |  ✅   |  ✅  |   ✅    | `nostr-sdk-jvm`, `nostr-sdk-kmp` |
| Linux (MUSL)  |   ✅   |   ✅    |  ✅   |  ✅  |   ✅    | `nostr-sdk-jvm`, `nostr-sdk-kmp` |
| FreeBSD       |   ✅   |   ✅    |  ❌   |  ❌  |   ❌    | `nostr-sdk-jvm`, `nostr-sdk-kmp` |
| macOS         |   ✅   |   ✅    |  ❌   |  ❌  |   ❌    | `nostr-sdk-jvm`, `nostr-sdk-kmp` |
| Windows       |   ✅   |   ✅    |  ❌   |  ✅  |   ❌    | `nostr-sdk-jvm`, `nostr-sdk-kmp` |

### JNA dependency

Some Gradle configurations do not expose the binding's JNA dependency to application code. If compilation fails with
`class file for com.sun.jna.Pointer not found`, add JNA explicitly for the selected target:

```kotlin
dependencies {
    implementation("net.java.dev.jna:jna:5.17.0@aar") // Android
    implementation("net.java.dev.jna:jna:5.15.0")     // JVM
}
```

Use only the line matching the target. Kotlin Multiplatform projects should add the JVM dependency to `jvmMain` and
the AAR variant to `androidMain`.

</section>

<div slot="title">Swift</div>
<section>

Add the [`nostr-sdk-swift`](https://github.com/nostrdevkit/nostr-sdk-swift) repository in Xcode, or declare the package
directly:

```swift
.package(url: "https://github.com/nostrdevkit/nostr-sdk-swift", exact: "0.45.1")
```

### Supported platforms

| OS             | x86_64 | aarch64 | armv7 | i686 |
|----------------|:------:|:-------:|:-----:|:----:|
| iOS 14+ device |   ❌   |   ✅    |  ❌   |  ❌  |
| iOS Simulator  |   ✅   |   ✅    |  ❌   |  ❌  |
| Mac Catalyst   |   ✅   |   ✅    |  ❌   |  ❌  |
| macOS 12+      |   ✅   |   ✅    |  ❌   |  ❌  |
| visionOS       |   ❌   |   ❌    |  ❌   |  ❌  |
| watchOS        |   ❌   |   ❌    |  ❌   |  ❌  |
| tvOS           |   ❌   |   ❌    |  ❌   |  ❌  |

</section>

<div slot="title">C#</div>
<section>

.NET 6 or later is required. Install the package from [NuGet](https://www.nuget.org/packages/Nostr.Sdk):

```bash
dotnet add package Nostr.Sdk --version 0.45.1
```

### Supported platforms

| OS            | x86_64 | aarch64 | armv7 | i686 | riscv64 |
|---------------|:------:|:-------:|:-----:|:----:|:-------:|
| Android       |   ✅   |   ✅    |  ✅   |  ✅  |   ❌    |
| iOS device    |   ❌   |   ✅    |  ❌   |  ❌  |   ❌    |
| iOS Simulator |   ✅   |   ✅    |  ❌   |  ❌  |   ❌    |
| Linux (GLIBC) |   ✅   |   ✅    |  ✅   |  ✅  |   ✅    |
| Linux (MUSL)  |   ✅   |   ✅    |  ✅   |  ✅  |   ✅    |
| FreeBSD       |   ✅   |   ✅    |  ❌   |  ❌  |   ❌    |
| macOS         |   ✅   |   ✅    |  ❌   |  ❌  |   ❌    |
| Windows       |   ✅   |   ✅    |  ❌   |  ✅  |   ❌    |

</section>
</custom-tabs>

Continue with [Hello, Nostr!](hello.md) once the package is available to the project.
