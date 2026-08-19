# Release checklist

1. Update the SDK pins in the snippet manifests and installation examples.
2. Update examples and platform requirements affected by the release.
3. Run `just build` and the snippet checks supported by the local toolchains.
4. Review the rendered book in `output/html`.
5. Open a pull request and wait for every CI job, including the macOS Swift build.
6. Merge to `master`; deployment starts only after the complete CI matrix passes.

API reference links intentionally target the current documentation instead of a pinned release. Only installation
examples and validation manifests are versioned.
