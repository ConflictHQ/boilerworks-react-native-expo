# GitHub Actions — EAS Development Build Setup

## Overview

On every push to `develop`, the workflow in `.github/workflows/eas-update.yml` triggers an EAS development build for both iOS and Android.

The `eas.json` is **not committed** — it is generated at runtime by `scripts/generate-eas-config.js` using environment variables configured in GitHub.

---

## Required GitHub Configuration

Go to your repository: **Settings → Secrets and variables → Actions**

### Secrets

> Secrets are encrypted and used for sensitive values.

| Name              | Description              | Where to get it                                                                                       |
| ----------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `EXPO_AUTH_TOKEN` | EAS authentication token | [expo.dev → Account Settings → Access Tokens](https://expo.dev/accounts/[you]/settings/access-tokens) |

### Variables

> Variables are non-sensitive and visible in logs.

| Name                 | Description                              | Example value                          |
| -------------------- | ---------------------------------------- | -------------------------------------- |
| `EAS_OWNER`          | EAS account or org that owns the project | `your-eas-owner`                       |
| `EAS_PROJECT_ID`     | EAS project ID                           | `95f931b2-0bd2-4ef1-867b-442e9d15ccf9` |
| `APP_BASE_NAME`      | Display name of the app                  | `MyApp`                                |
| `APP_BASE_SLUG`      | EAS project slug                         | `myapp`                                |
| `APP_BASE_BUNDLE_ID` | iOS bundle identifier base               | `com.example.app`                      |
| `APP_BASE_PACKAGE`   | Android package name base                | `com.example.app`                      |

---

## How the Build Works

The `development` profile in the generated `eas.json` appends `.dev` to the bundle ID and package name:

- iOS: `com.example.app.dev`
- Android: `com.example.app.dev`

To change these suffixes, add optional variables:

| Name                     | Default    | Description                          |
| ------------------------ | ---------- | ------------------------------------ |
| `DEV_BUNDLE_ID_SUFFIX`   | `.dev`     | Suffix for development bundle ID     |
| `STAGE_BUNDLE_ID_SUFFIX` | `.staging` | Suffix for preview/staging bundle ID |

---

## One-time EAS Setup

Before the first build, make sure the EAS project exists under the correct owner:

```bash
# Log in as the owner account
eas login

# Link or create the project (run once)
eas init
```

This will give you the `EAS_PROJECT_ID` to add to GitHub secrets.

---

## Triggering a Build

Push to the `develop` branch:

```bash
git push origin develop
```

Monitor the build at: [expo.dev/accounts/your-eas-owner/projects/your-slug/builds](https://expo.dev)

---

## Local Testing

Test the config generation locally before pushing:

```bash
# Make sure .env is populated, then:
node scripts/generate-eas-config.js

# Verify the output
cat eas.json
```