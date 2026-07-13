// swift-tools-version: 5.5
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "NostrSnippets",
    platforms: [.macOS(.v12)],
    dependencies: [
        .package(url: "https://github.com/nostrdevkit/nostr-sdk-swift", from: "0.44.2")
    ],
    targets: [
        .executableTarget(
            name: "NostrSnippets",
            dependencies: [
                .product(name: "NostrSDK", package: "nostr-sdk-swift"),
            ],
            path: "Sources"),
    ]
)
