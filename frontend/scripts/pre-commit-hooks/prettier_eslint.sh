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
  if npm run --silent prettier -- "$TS_TSX_JSON_DIFFED_FILES"; then
    # if echo "$TS_TSX_JSON_DIFFED_FILES" | xargs npx prettier --check; then
    echo
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
  git add "$TS_TSX_JSON_DIFFED_FILES"
fi

##########
# ESLint #
##########

if [ -n "$TS_TSX_DIFFED_FILES" ]; then
  # Ensure there aren't eslint problems.
  echo "Running ESLint..."
  if npm run --silent lint -- "$TS_TSX_DIFFED_FILES"; then
    # if echo "$TS_TSX_DIFFED_FILES" | xargs npx eslint; then
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
  git add "$TS_TSX_DIFFED_FILES"

  # Run tsc on changed files.
  # Ensure types check out
  # echo "Running strict tsc checks..."
  # yarn tsc
  # git add $TS_TSX_DIFFED_FILES
  # echo "tsc type-checking complete!"
fi
