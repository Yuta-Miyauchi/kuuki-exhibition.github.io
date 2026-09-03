#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOCAL_NODE_DIR="$(find "$ROOT_DIR/.tools" -maxdepth 1 -type d -name 'node-v*-linux-x64' -print | sort -V | tail -n 1)"

if [[ -n "$LOCAL_NODE_DIR" && -x "$LOCAL_NODE_DIR/bin/node" ]]; then
  export PATH="$LOCAL_NODE_DIR/bin:$PATH"
fi

cd "$ROOT_DIR"
npm run check
