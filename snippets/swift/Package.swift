// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "NostrSnippets",
    platforms: [.macOS(.v12)],
    dependencies: [
        .package(url: "https://github.com/nostrdevkit/nostr-sdk-swift", exact: "0.45.1")
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
