## Installing the library

<custom-tabs category="lang">

<div slot="title">Rust</div>
<section>

Add the `nostr-sdk` dependency in your `Cargo.toml` file:

```toml
[dependencies]
nostr-sdk = "0.41"
```

Alternatively, you can add it directly from `git` source:

```toml
[dependencies]
nostr-sdk = { git = "https://github.com/rust-nostr/nostr", tag = "v0.41.0" }
```

```admonish info
To use a specific commit, use `rev` instead of `tag`.
```

Import the library in your code:

```rust,ignore
use nostr_sdk::prelude::*;
```

</section>

<div slot="title">Python</div>
<section>

The `nostr-sdk` package is available on the public PyPI:

```bash
pip install nostr-sdk 
```

Alternatively, you can manually add the dependency in your `requrements.txt`, `setup.py`, etc.:

```
nostr-sdk==0.41.0
```

Import the library in your code:

```python,ignore
from nostr_sdk import *
```

### Requirements and supported platforms

Requires Python 3.9 or above.

The following OS and architectures are supported:

| OS      | x86_64 | aarch64 | armv7 | i686 |
|---------|--------|---------|-------|------|
| Linux   | ✅      | ✅       | ❌     | ✅*   |
| macOS   | ✅      | ✅       | ❌     | ❌    |
| Windows | ✅      | ✅*      | ❌     | ✅*   |

<small>* Supported from 0.42.0 or above.</small>

### Known issues

#### No running event loop

If you receive `no running event loop` error at runtime, add the following line to your code:

```python,ignore
import asyncio
from nostr_sdk import uniffi_set_event_loop

uniffi_set_event_loop(asyncio.get_running_loop())
```

</section>

<div slot="title">JavaScript</div>
<section>

The `nostr-sdk` package is available on the public [npmjs](https://npmjs.com):

```bash
npm i @rust-nostr/nostr-sdk
```

Alternatively, you can manually add the dependency in your `package.json` file:

```json
{
    "dependencies": {
        "@rust-nostr/nostr-sdk": "0.41.1"
    }
}
```

### WASM

This library to work **require** to load the WASM code.

#### Load in **async** context

```typescript,ignore
import { loadWasmAsync } from "@rust-nostr/nostr-sdk";

async function main() {
    // Load WASM
    await loadWasmAsync();

    // ...
}

main();
```

#### Load in **sync** context

```typescript,ignore
import { loadWasmSync } from "@rust-nostr/nostr-sdk";

function main() {
    // Load WASM
    loadWasmSync();

    // ...
}

main();
```

</section>

<div slot="title">Kotlin</div>
<section>

Add the following library to your Gradle dependencies:

### Android

```kotlin
repositories {
    mavenCentral()
}

dependencies { 
    implementation("org.rust-nostr:nostr-sdk:0.41.0")
}
```

### JVM

```kotlin
repositories {
    mavenCentral()
}

dependencies { 
    implementation("org.rust-nostr:nostr-sdk-jvm:0.41.0")
}
```

### Import the library

Import the library in your code:

```kotlin
import rust.nostr.sdk.*
```

### Supported platforms

The following OS and architectures are supported:

| OS      | x64 | aarch64 | armv7 | i686 | Package         |
|---------|-----|---------|-------|------|-----------------|
| Android | ✅   | ✅       | ✅     | ✅    | `nostr-sdk`     |
| Linux   | ✅   | ✅       | ❌     | ✅    | `nostr-sdk-jvm` |
| macOS   | ✅   | ✅       | ❌     | ❌    | `nostr-sdk-jvm` |
| Windows | ✅   | ✅       | ❌     | ✅    | `nostr-sdk-jvm` |

### Known issues

#### JNA dependency

Depending on the JVM version you use, you might not have the JNA dependency on your classpath. The exception thrown will be

```bash
class file for com.sun.jna.Pointer not found
```

The solution is to add JNA as a dependency like so:

##### Android 

```kotlin
dependencies {
    implementation("net.java.dev.jna:jna:5.15.0@aar")
}
```

##### JVM

```kotlin
dependencies {
    implementation("net.java.dev.jna:jna:5.15.0")
}
```

</section>

<div slot="title">Swift</div>
<section>

### Xcode

Via `File > Add Packages...`, add

```
https://github.com/rust-nostr/nostr-sdk-swift.git
```

as a package dependency in Xcode.

### Swift Package

Add the following to the dependency array in your `Package.swift`:

``` swift
.package(url: "https://github.com/rust-nostr/nostr-sdk-swift.git", from: "0.41.0"),
```

### Supported platforms

The following OS and architectures are supported:

| OS               | x86_64 | aarch64 | armv7 | i686 |
|------------------|--------|---------|-------|------|
| iOS (>=14.0)     | ❌      | ✅       | ❌     | ❌    |
| iOS Simulator    | ✅      | ✅       | ❌     | ❌    |
| Mac Catalyst     | ✅      | ✅       | ❌     | ❌    |
| macOS (>=12.0)   | ✅      | ✅       | ❌     | ❌    |
| visionOS (>=1.0) | ❌      | ❌       | ❌     | ❌    |
| watchOS          | ❌      | ❌       | ❌     | ❌    |
| tvOS             | ❌      | ❌       | ❌     | ❌    |

</section>

<div slot="title">C#</div>
<section>

### Import the library

The `Nostr.Sdk` package is available on [nuget](https://www.nuget.org/packages/Nostr.Sdk):

```bash
dotnet add package Nostr.Sdk --version 0.41.0
```

### Requirements and supported platforms

Requires .NET 6.0 or above.

The following OS and architectures are supported:

| OS      | x86_64 | aarch64 | armv7 | i686 |
|---------|--------|---------|-------|------|
| Linux   | ✅      | ✅       | ❌     | ✅    |
| macOS   | ✅      | ✅       | ❌     | ❌    |
| Windows | ✅      | ✅       | ❌     | ✅    |

</section>

<div slot="title">Flutter</div>
<section>

Add the following code to your package:

```yaml
nostr_sdk:
    git:
        url: https://github.com/rust-nostr/nostr-sdk-flutter.git
        ref: 22f12c9ba52daebe8ba98f65f02ffe63fab886a8
```

</section>
</custom-tabs>
