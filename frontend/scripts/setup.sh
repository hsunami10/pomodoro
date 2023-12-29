#!/bin/bash

set -e

gitroot=$(git rev-parse --show-toplevel || echo ".")
if [ ! -d "${gitroot}" ]; then
  exit 1
fi

sh "$gitroot/frontend/scripts/pre-commit-hooks/install.sh"

# TODO: Add brew, itermocil, etc. automatic installation here.
