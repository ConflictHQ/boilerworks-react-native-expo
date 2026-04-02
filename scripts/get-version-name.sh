#!/bin/sh

# Get version script
# Usage: ./get-version.sh <stage|prod>
# Returns version without 'v' prefix

ENVIRONMENT=${1:-"stage"}
GITHUB_TOKEN=${GITHUB_TOKEN}
REPOSITORY=${GITHUB_REPOSITORY}

# Check for GitHub token
if [ -z "$GITHUB_TOKEN" ] && command -v gh >/dev/null 2>&1; then
  # Try to get token from gh CLI
  if gh auth status >/dev/null 2>&1; then
    echo "🔑 Using GitHub CLI authentication..." >&2
    GITHUB_TOKEN=$(gh auth token)
  fi
fi

# Set repository if not provided
if [ -z "$REPOSITORY" ] && [ -n "$(git remote get-url origin 2>/dev/null)" ]; then
  REPO_URL=$(git remote get-url origin)
  REPOSITORY=$(echo "$REPO_URL" | sed 's/.*github\.com[:/]\([^/]*\/[^/]*\)\.git.*/\1/' | sed 's/.*github\.com[:/]\([^/]*\/[^/]*\).*/\1/')
fi

case $ENVIRONMENT in
  "stage")
    echo "🔍 Getting latest draft version..." >&2
    
    if [ -n "$GITHUB_TOKEN" ] && [ -n "$REPOSITORY" ]; then
      echo "📡 Using GitHub API with token..." >&2
      VERSION=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
        "https://api.github.com/repos/$REPOSITORY/releases" | \
        jq -r '.[] | select(.draft == true and .prerelease == true) | .tag_name' | head -1)
      
      if [ -n "$VERSION" ] && [ "$VERSION" != "null" ]; then
        echo "📋 Latest draft: $VERSION" >&2
        echo "$VERSION" | sed 's/^v//'
      else
        echo "❌ No draft release found, falling back to prod..." >&2
        # Fallback to prod logic
        PROD_VERSION=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
          "https://api.github.com/repos/$REPOSITORY/releases" | \
          jq -r '.[] | select(.draft == false and .prerelease == false) | .tag_name' | head -1)
        
        if [ -n "$PROD_VERSION" ] && [ "$PROD_VERSION" != "null" ]; then
          echo "📋 Using latest release: $PROD_VERSION" >&2
          echo "$PROD_VERSION" | sed 's/^v//'
        else
          echo "⚠️  No releases found, using git tags..." >&2
          LATEST_TAG=$(git tag --sort=-version:refname | head -n 1)
          if [ -n "$LATEST_TAG" ]; then
            echo "📋 Latest git tag: $LATEST_TAG" >&2
            echo "$LATEST_TAG" | sed 's/^v//'
          else
            echo "❌ No git tags found, defaulting to 0.0.0" >&2
            echo "0.0.0"
          fi
        fi
      fi
    elif command -v gh >/dev/null 2>&1; then
      echo "📡 Using GitHub CLI..." >&2
      VERSION=$(gh release list --limit 50 --json tagName,isDraft,isPrerelease | \
        jq -r '.[] | select(.isDraft == true and .isPrerelease == true) | .tagName' | head -1)
      
      if [ -n "$VERSION" ] && [ "$VERSION" != "null" ]; then
        echo "📋 Latest draft: $VERSION" >&2
        echo "$VERSION" | sed 's/^v//'
      else
        echo "❌ No draft release found" >&2
        exit 1
      fi
    else
      echo "❌ Neither GITHUB_TOKEN nor 'gh' CLI available" >&2
      echo "Set GITHUB_TOKEN + GITHUB_REPOSITORY or install 'gh' CLI" >&2
      exit 1
    fi
    ;;
    
  "prod")
    echo "🔍 Getting latest production version..." >&2
    
    if [ -n "$GITHUB_TOKEN" ] && [ -n "$REPOSITORY" ]; then
      echo "📡 Using GitHub API with token..." >&2
      VERSION=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
        "https://api.github.com/repos/$REPOSITORY/releases" | \
        jq -r '.[] | select(.draft == false and .prerelease == false) | .tag_name' | head -1)
      
      if [ -n "$VERSION" ] && [ "$VERSION" != "null" ]; then
        echo "📋 Latest release: $VERSION" >&2
        echo "$VERSION" | sed 's/^v//'
      else
        echo "❌ No published release found, trying git tags..." >&2
        LATEST_TAG=$(git tag --sort=-version:refname | head -n 1)
        if [ -n "$LATEST_TAG" ]; then
          echo "📋 Latest git tag: $LATEST_TAG" >&2
          echo "$LATEST_TAG" | sed 's/^v//'
        else
          echo "❌ No git tags found, defaulting to 0.0.0" >&2
          echo "0.0.0"
        fi
      fi
    elif command -v gh >/dev/null 2>&1; then
      echo "📡 Using GitHub CLI..." >&2
      VERSION=$(gh release list --limit 50 --json tagName,isDraft,isPrerelease | \
        jq -r '.[] | select(.isDraft == false and .isPrerelease == false) | .tagName' | head -1)
      
      if [ -n "$VERSION" ] && [ "$VERSION" != "null" ]; then
        echo "📋 Latest release: $VERSION" >&2
        echo "$VERSION" | sed 's/^v//'
      else
        echo "❌ No published release found, trying git tags..." >&2
        LATEST_TAG=$(git tag --sort=-version:refname | head -n 1)
        if [ -n "$LATEST_TAG" ]; then
          echo "📋 Latest git tag: $LATEST_TAG" >&2
          echo "$LATEST_TAG" | sed 's/^v//'
        else
          echo "❌ No git tags found, defaulting to 0.0.0" >&2
          echo "0.0.0"
        fi
      fi
    else
      # Fallback to git tags if no API access  
      echo "⚠️  Using git fallback..." >&2
      LATEST_TAG=$(git tag --sort=-version:refname | head -n 1)
      
      if [ -n "$LATEST_TAG" ]; then
        echo "📋 Latest git tag: $LATEST_TAG" >&2
        echo "$LATEST_TAG" | sed 's/^v//'
      else
        echo "❌ No git tags found, defaulting to 0.0.0" >&2
        echo "0.0.0"
      fi
    fi
    ;;
    
  *)
    echo "⚠️  Unknown environment '$ENVIRONMENT', defaulting to prod..." >&2
    
    if [ -n "$GITHUB_TOKEN" ] && [ -n "$REPOSITORY" ]; then
      echo "📡 Using GitHub API with token..." >&2
      VERSION=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
        "https://api.github.com/repos/$REPOSITORY/releases" | \
        jq -r '.[] | select(.draft == false and .prerelease == false) | .tag_name' | head -1)
      
      if [ -n "$VERSION" ] && [ "$VERSION" != "null" ]; then
        echo "📋 Latest release: $VERSION" >&2
        echo "$VERSION" | sed 's/^v//'
      else
        echo "❌ No published release found, trying git tags..." >&2
        LATEST_TAG=$(git tag --sort=-version:refname | head -n 1)
        if [ -n "$LATEST_TAG" ]; then
          echo "📋 Latest git tag: $LATEST_TAG" >&2
          echo "$LATEST_TAG" | sed 's/^v//'
        else
          echo "❌ No git tags found, defaulting to 0.0.0" >&2
          echo "0.0.0"
        fi
      fi
    elif command -v gh >/dev/null 2>&1; then
      echo "📡 Using GitHub CLI..." >&2
      VERSION=$(gh release list --limit 50 --json tagName,isDraft,isPrerelease | \
        jq -r '.[] | select(.isDraft == false and .isPrerelease == false) | .tagName' | head -1)
      
      if [ -n "$VERSION" ] && [ "$VERSION" != "null" ]; then
        echo "📋 Latest release: $VERSION" >&2
        echo "$VERSION" | sed 's/^v//'
      else
        echo "❌ No published release found, trying git tags..." >&2
        LATEST_TAG=$(git tag --sort=-version:refname | head -n 1)
        if [ -n "$LATEST_TAG" ]; then
          echo "📋 Latest git tag: $LATEST_TAG" >&2
          echo "$LATEST_TAG" | sed 's/^v//'
        else
          echo "❌ No git tags found, defaulting to 0.0.0" >&2
          echo "0.0.0"
        fi
      fi
    else
      # Fallback to git tags if no API access  
      echo "⚠️  Using git fallback..." >&2
      LATEST_TAG=$(git tag --sort=-version:refname | head -n 1)
      
      if [ -n "$LATEST_TAG" ]; then
        echo "📋 Latest git tag: $LATEST_TAG" >&2
        echo "$LATEST_TAG" | sed 's/^v//'
      else
        echo "❌ No git tags found, defaulting to 0.0.0" >&2
        echo "0.0.0"
      fi
    fi
    ;;
esac