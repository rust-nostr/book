# Nostr Dev Kit

Nostr Dev Kit is a set of libraries for building Nostr clients, services, and relays. It provides protocol types,
signing, relay communication, storage integrations, and an embeddable relay implementation through a consistent API.

This book is a short path from installation to a working application. It introduces the core types, publishes an
event, then adds queries, subscriptions, persistent storage, Negentropy sync, and an embedded relay. It is not an API
catalog or a guide to the Nostr protocol.

## What this book assumes

You should already know what relays, events, kinds, tags, public keys, and NIPs are. The book does not reintroduce the
protocol. No previous Nostr Dev Kit experience is required.

## How to use this book

Read [Getting started](overview.md) through [Hello, Nostr!](hello.md) with one language selected. The next
chapters explain the same program's building blocks before introducing additional networking behavior.

Code in the language tabs comes from the snippet projects and is checked in CI against the pinned release. Network
examples use public relays, whose availability and policies remain outside the SDK's control.

Start with [Choose a library](overview.md). If the SDK is already installed, go directly to [Hello, Nostr!](hello.md).
