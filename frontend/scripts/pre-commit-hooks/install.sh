#!/bin/bash

set -e

gitroot=$(git rev-parse --show-toplevel || echo ".")
if [ ! -d "${gitroot}" ]; then
  exit 1
fi

pre_commit_file="${gitroot}/.git/hooks/pre-commit" # Target file
prettier_eslint_file="${gitroot}/frontend/scripts/pre-commit-hooks/prettier_eslint.sh"

if [ ! -f "$prettier_eslint_file" ]; then
  echo "prettier_eslint.sh does not exist at path $prettier_eslint_file"
  exit 1
fi

if [ ! -f "${pre_commit_file}" ]; then
  cp "$gitroot/.git/hooks/pre-commit.sample" "$pre_commit_file"
else
  rm "$pre_commit_file"
  cp "$gitroot/.git/hooks/pre-commit.sample" "$pre_commit_file"
fi

echo "#!/bin/sh" >"$pre_commit_file"
{
  echo ""
  echo "sh $prettier_eslint_file"
  echo ""
} >>"$pre_commit_file"
chmod a+x "$pre_commit_file"

echo "Installation finished!"
exit 0
