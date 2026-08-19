[private]
default:
	@just --list

# Install book dependencies.
init:
	@test "$(mdbook --version 2>/dev/null)" = "mdbook v0.5.4" || \
	cargo binstall -y --force mdbook --version 0.5.4 || \
	cargo install --locked --force mdbook --version 0.5.4
	@test "$(mdbook-linkcheck2 --version 2>/dev/null)" = "mdbook-linkcheck2 0.12.2" || \
	cargo install --locked --force mdbook-linkcheck2 --version 0.12.2
	@test "$(mdbook-snippets --version 2>/dev/null)" = "mdbook-snippets 0.2.0" || \
	cargo install --locked --force --path snippets-processor

# Build the book and validate links.
build: init
	mdbook build

# Serve the book on localhost:3000.
serve: init
	mdbook serve

# Compile and type-check every snippet project.
test:
	cargo test --manifest-path snippets-processor/Cargo.toml
	cd snippets && just test

# Run all production checks.
check: build test

# Uninstall development tools.
clean:
	cargo uninstall mdbook
	cargo uninstall mdbook-linkcheck2
	cargo uninstall mdbook-snippets
