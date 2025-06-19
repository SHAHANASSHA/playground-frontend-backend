#!/bin/bash

set -e

# Get last tag or default to v0.0.0
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")
echo "Last tag: $LAST_TAG"

# Get commits since last tag
COMMITS=$(git log ${LAST_TAG}..HEAD --oneline)

# Initialize version parts from last tag
VERSION=$(echo "$LAST_TAG" | sed 's/^v//')
IFS='.' read -r MAJOR MINOR PATCH <<< "$VERSION"

# Flag to track what to bump
bump_patch=false
bump_minor=false
bump_major=false

# Check each commit message
while read -r line; do
    [[ "$line" =~ major ]] && bump_major=true
    [[ "$line" =~ minor ]] && bump_minor=true
    [[ "$line" =~ patch ]] && bump_patch=true
done <<< "$COMMITS"

# Decide bump logic: major > minor > patch
if $bump_major; then
    ((MAJOR++))
    MINOR=0
    PATCH=0
elif $bump_minor; then
    ((MINOR++))
    PATCH=0
elif $bump_patch; then
    ((PATCH++))
else
    echo "No version keywords found in recent commits. Skipping tagging."
    exit 0
fi

NEW_TAG="v${MAJOR}.${MINOR}.${PATCH}"
echo "New version: $NEW_TAG"

# Check if tag already exists
if git rev-parse "$NEW_TAG" >/dev/null 2>&1; then
    echo "Tag $NEW_TAG already exists."
else
    git tag "$NEW_TAG"
    git push origin "$NEW_TAG"
    echo "Tagged and pushed $NEW_TAG"
fi

