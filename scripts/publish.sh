#!/usr/bin/env bash

set -euo pipefail

dry_run=false
requested_version=""

while (($# > 0)); do
  case "$1" in
    --dry-run)
      dry_run=true
      shift
      ;;
    --version)
      if (($# < 2)); then
        echo "error: --version requires a value" >&2
        exit 2
      fi
      requested_version="$2"
      shift 2
      ;;
    *)
      echo "error: unknown argument: $1" >&2
      exit 2
      ;;
  esac
done

if [[ "$(git branch --show-current)" != "main" ]]; then
  echo "error: releases must be created from main" >&2
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "error: commit or stash all changes before publishing" >&2
  exit 1
fi

git fetch --quiet origin main --tags

local_head="$(git rev-parse HEAD)"
remote_head="$(git rev-parse origin/main)"
if [[ "$local_head" != "$remote_head" ]]; then
  echo "error: local main must exactly match origin/main before publishing" >&2
  exit 1
fi

if [[ -n "$requested_version" ]]; then
  version="${requested_version#v}"
else
  latest_tag="$(git tag --list 'v[0-9]*.[0-9]*.[0-9]*' --sort=-v:refname | head -n 1)"
  if [[ -z "$latest_tag" ]]; then
    version="1.0.0"
  else
    latest_version="${latest_tag#v}"
    IFS=. read -r major minor patch <<< "$latest_version"
    version="${major}.${minor}.$((patch + 1))"
  fi
fi

if [[ ! "$version" =~ ^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$ ]]; then
  echo "error: VERSION must be a stable semantic version such as 1.2.0" >&2
  exit 2
fi

tag="v${version}"
if git rev-parse --verify --quiet "refs/tags/${tag}" >/dev/null; then
  echo "error: tag ${tag} already exists" >&2
  exit 1
fi

echo "Release tag: ${tag}"
echo "Commit: ${local_head}"

npm run build

if [[ "$dry_run" == "true" ]]; then
  echo "Dry run complete. No tag or remote changes were created."
  exit 0
fi

git tag -a "$tag" -m "Release ${tag}"

if ! git push --atomic origin main "$tag"; then
  git tag -d "$tag" >/dev/null
  echo "error: push failed; removed the local ${tag} tag" >&2
  exit 1
fi

echo "Published ${tag}. GitHub Actions will deploy it to Cloudflare Pages."
