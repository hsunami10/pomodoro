#!/bin/bash

# Exit immediately if a non-zero status is returned.
set -e

gitroot=$(git rev-parse --show-toplevel || echo ".")
if [ ! -d "${gitroot}" ]; then
  exit 1
fi

cd "$gitroot"

TS_TSX_JSON_DIFFED_FILES=$(git diff HEAD --cached --name-only --line-prefix="$gitroot/" --diff-filter=ACMR -- '*.tsx' '*.ts' '*.json')
TS_TSX_DIFFED_FILES=$(git diff HEAD --cached --name-only --line-prefix="$gitroot/" --diff-filter=ACMR -- '*.tsx' '*.ts')

############
# Prettier #
############

cd "$gitroot/frontend"

if [ -n "$TS_TSX_JSON_DIFFED_FILES" ]; then
  # Ensure there aren't prettier problems.
  echo "Running Prettier..."
  if echo "$TS_TSX_JSON_DIFFED_FILES" | xargs npm run --silent prettier; then
    : # no-op
  else
    e=$? # return code from if
    if [ "${e}" -eq "1" ]; then
      echo "Your files aren't pretty. Let me fix that for you..."
      npm run --silent prettier:fix -- "$TS_TSX_JSON_DIFFED_FILES"
    elif [ "${e}" -gt "1" ]; then
      echo "prettier returned an exit code > 1."
      exit ${e}
    fi
  fi
  echo "prettier complete!"
  echo "$TS_TSX_JSON_DIFFED_FILES" | xargs git add
fi

##########
# ESLint #
##########

if [ -n "$TS_TSX_DIFFED_FILES" ]; then
  # Ensure there aren't eslint problems.
  echo "Running ESLint..."
  if echo "$TS_TSX_DIFFED_FILES" | xargs npm run --silent lint; then
    : # no-op
  else
    e=$? # return code from if
    if [ "${e}" -eq "1" ]; then
      echo "Your files aren't linted correctly. Attempting to fix for you..."
      npm run --silent lint:fix -- "$TS_TSX_DIFFED_FILES"
    elif [ "${e}" -gt "1" ]; then
      echo "eslint returned an exit code > 1."
      exit ${e}
    fi
  fi
  echo "eslint complete!"
  echo "$TS_TSX_DIFFED_FILES" | xargs git add

  # Run tsc on changed files.
  # Ensure types check out
  # echo "Running strict tsc checks..."
  # yarn tsc
  # echo "$TS_TSX_DIFFED_FILES" | xargs git add
  # echo "tsc type-checking complete!"
fi
