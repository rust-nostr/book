# Nostr Dev Kit Book

This repository contains the source for the Nostr Dev Kit onboarding guide.

## Requirements

- [Rust](https://www.rust-lang.org/tools/install)
- [just](https://github.com/casey/just)
- The toolchains for any binding snippets you want to check

Install the pinned mdBook tools and serve the book:

```bash
just init
just serve
```

Run the book build, link checker, and all locally supported snippet checks with:

```bash
just check
```

Swift snippets are compiled by CI on macOS. The generated site is written to
`output/html`.

## Updating the SDK release

Update the SDK pins in the snippet manifests and installation examples. Run `just build` and the snippet checks supported
by the local toolchains; CI runs the complete language matrix.
