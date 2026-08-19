#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

for runtime in node web react-native; do
    npm install --legacy-peer-deps --prefix "${SCRIPT_DIR}/${runtime}"
    npm run check --prefix "${SCRIPT_DIR}/${runtime}"
done
