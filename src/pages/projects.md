# Projects

The `rust-nostr` project is split up into several repositories.

## Libraries

| Project          | Description                                                                   | Repository                                   | Lead Maintainer  |
|------------------|-------------------------------------------------------------------------------|----------------------------------------------|------------------|
| `nostr`          | Rust implementation of the nostr protocol, high-level libraries, NWC and more | https://github.com/rust-nostr/nostr          | [Yuki Kishimoto] |
| `negentropy`     | Rust implementation of the negentropy protocol                                | https://github.com/rust-nostr/negentropy     | [Yuki Kishimoto] |
| `android-signer` | A library to interact with Android Signers (NIP-55)                           | https://github.com/rust-nostr/android-signer | [Yuki Kishimoto] |

## Bindings

| Project                  | Description                                | Repository                                           | Lead Maintainer              |
|--------------------------|--------------------------------------------|------------------------------------------------------|------------------------------|
| `nostr-sdk-ffi`          | Nostr SDK - Native language bindings       | https://github.com/rust-nostr/nostr-sdk-ffi          | [Yuki Kishimoto]             |
| `nostr-sdk-js`           | Nostr SDK - JavaScript/TypeScript bindings | https://github.com/rust-nostr/nostr-sdk-js           | [Yuki Kishimoto]             |
| `nostr-sdk-flutter`      | Nostr SDK - Flutter bindings               | https://github.com/rust-nostr/nostr-sdk-flutter      | **Looking for a maintainer** |
| `nostr-sdk-swift`        | Nostr SDK - Swift Package                  | https://github.com/rust-nostr/nostr-sdk-swift        | (depends on nostr-sdk-ffi)   |
| `nostr-sdk-react-native` | Nostr SDK - React Native Package           | https://github.com/rust-nostr/nostr-sdk-react-native | (depends on nostr-sdk-ffi)   |

## Documentation

| Project | Description                                                            | Repository                         | Lead Maintainer |
|---------|------------------------------------------------------------------------|------------------------------------|-----------------|
| `book`  | Book with documentation and examples for all the `rust-nostr` projects | https://github.com/rust-nostr/book |                 |

## Binaries

| Project         | Description                                               | Repository                                  | Lead Maintainer              |
|-----------------|-----------------------------------------------------------|---------------------------------------------|------------------------------|
| `nostr-rest`    | A bridge for interacting with nostr relays using rest API | https://github.com/rust-nostr/nostr-rest    |                              |
| `nostr-desktop` | Nostr Desktop Client                                      | https://github.com/rust-nostr/nostr-desktop | **Looking for a maintainer** |

<!-- Links of maintainers -->
[Yuki Kishimoto]: https://yukikishimoto.com
