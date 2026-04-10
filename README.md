# Boilerworks React Native Expo

> Mobile template -- Expo React Native + TypeScript. Styled-components theming (light/dark), Redux Toolkit + Apollo Client, React Navigation, i18next, react-hook-form, JWT auth with proactive refresh. Ships with ~25 themed components, EAS build profiles, and GitHub Actions CI.

Production-ready Expo boilerplate for building mobile apps with a consistent design system, typed state, and a batteries-included API layer (REST + GraphQL sharing a single JWT lifecycle).

## Stack

| Layer           | Technology                                                                 |
| --------------- | -------------------------------------------------------------------------- |
| Runtime         | Expo SDK 54 + React Native 0.81 (TypeScript 5.9)                           |
| UI              | `styled-components/native` with per-component light/dark theme slices      |
| State           | Redux Toolkit + redux-persist (typed hooks, `createAsyncThunk`)            |
| REST            | `apiClient` (axios) with proactive + reactive JWT refresh                  |
| GraphQL         | Apollo Client (shared JWT, `UNAUTHENTICATED` → refresh via `apiClient`)    |
| Navigation      | React Navigation static navigator (`@react-navigation/native-stack`)       |
| Forms           | react-hook-form                                                            |
| i18n            | i18next (`en` / `es` locales)                                              |
| Storage         | `expo-secure-store` for auth tokens, AsyncStorage for everything else      |
| Animations      | Reanimated 4 + Skia                                                        |
| Tooling         | ESLint, Prettier, Jest + `@testing-library/react-native`                   |
| Package manager | Yarn 4                                                                     |

## Quick Start

```bash
yarn install
cp .env.example .env    # fill in EAS_OWNER, EAS_PROJECT_ID, EXPO_PUBLIC_API_URL, etc.
yarn start              # Expo dev server — scan the QR with Expo Go
```

Install **Expo Go** on a physical device to preview the running app:

[<img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" height="40">](https://apps.apple.com/app/expo-go/id982107779)
[<img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" height="40">](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Commands

```bash
yarn start              # Expo dev server
yarn ios                # Launch iOS simulator
yarn android            # Launch Android emulator
yarn web                # Web preview
yarn lint               # ESLint
yarn format             # Prettier (write)
yarn format:check       # Prettier (check) — used in CI
yarn test               # Jest
yarn test:watch         # Jest watch mode
yarn reset-project      # Wipe template artifacts from src/
yarn optimize-images    # Compress PNGs under src/assets/images/
```

## Environment Configuration

All runtime config is driven by environment variables. Copy `.env.example` to `.env` and fill in the values. App identity (name, slug, bundle ID, deep-link scheme) is driven by `APP_BASE_*` vars consumed by `app.config.js` — renaming your app doesn't require touching any source files.

Key variables:

| Variable                  | Purpose                                                                    |
| ------------------------- | -------------------------------------------------------------------------- |
| `APP_BASE_NAME`           | Display name (e.g. `Boilerworks`)                                          |
| `APP_BASE_SLUG`           | Expo slug                                                                  |
| `APP_BASE_BUNDLE_ID`      | iOS bundle identifier                                                      |
| `APP_BASE_PACKAGE`        | Android package name                                                       |
| `EAS_OWNER`               | EAS account owner                                                          |
| `EAS_PROJECT_ID`          | EAS project UUID (required for `eas build` / `eas update`)                 |
| `EXPO_PUBLIC_API_URL`     | REST API base URL (no trailing slash)                                      |
| `EXPO_PUBLIC_GRAPHQL_URL` | Apollo Client GraphQL endpoint                                             |
| `EXPO_PUBLIC_ENVIRONMENT` | `development` / `staging` / `production` — drives `IS_DEV` / `IS_STAGING` |
| `EXPO_PUBLIC_SENTRY_DSN`  | Optional — leave empty to disable error reporting                          |

See `.env.example` for the full list including feature flags and mock-login toggles.

## Preview Build

A preview build is triggered automatically on every push to `main`.

**To build manually:**

```sh
eas build --profile preview --platform all
```

**To publish an OTA update:**

```sh
eas update --branch development --message "your message" --platform ios
eas update --branch development --message "your message" --platform android
```

> See [docs/github-actions-setup.md](docs/github-actions-setup.md) for GitHub Actions setup.

## CI

| Workflow                | Trigger                                 | Action                              |
| ----------------------- | --------------------------------------- | ----------------------------------- |
| `eas-preview-build.yml` | Push to `main`                          | EAS preview build for iOS & Android |
| `unit-tests.yml`        | Push / PR to `main`, `develop`, `stage` | Lint, format, unit tests            |

## GraphQL

Apollo Client is configured alongside the REST client. Set the GraphQL endpoint in `.env`:

```sh
EXPO_PUBLIC_GRAPHQL_URL=https://api.example.com/graphql
```

Authentication is handled automatically — the same JWT used for REST calls is injected by Apollo's auth link. A `UNAUTHENTICATED` error triggers one refresh via `apiClient.bootstrapToken()` before the session is cleared.

### Basic usage

**Query:**

```ts
import { gql, useQuery } from '@apollo/client';

const GET_FEED = gql`
  query GetFeed {
    feed {
      id
      title
    }
  }
`;

function FeedScreen() {
  const { data, loading, error } = useQuery(GET_FEED);
  // ...
}
```

**Mutation:**

```ts
import { gql, useMutation } from '@apollo/client';

const CREATE_POST = gql`
  mutation CreatePost($title: String!) {
    createPost(title: $title) {
      id
      title
    }
  }
`;

function NewPostScreen() {
  const [createPost, { loading }] = useMutation(CREATE_POST);

  const handleSubmit = async (title: string) => {
    await createPost({ variables: { title } });
  };
}
```

> For full Apollo Client docs see [apollographql.com/docs/react](https://www.apollographql.com/docs/react/).

## Image Optimization

Compress PNG assets under `src/assets/images/` using `sharp`.

```sh
yarn optimize-images        # apply optimizations
yarn optimize-images:dry    # preview savings without writing
```

Options can be passed directly:

```sh
yarn node scripts/optimize-images.js --path src/assets/images/quote-background.png --max-width 750
```

| Flag                 | Default    | Description                         |
| -------------------- | ---------- | ----------------------------------- |
| `--max-width N`      | `1080`     | Resize images wider than N px       |
| `--quality N`        | `9`        | PNG compression level (1–9)         |
| `--path <file\|dir>` | all assets | Target a specific file or directory |

## Project Structure

See [`bootstrap.md`](bootstrap.md) for a high-level directory map and conventions overview. Full component inventory, patterns, and recipes live in [`CLAUDE.md`](CLAUDE.md). For deeper architectural context (layer dependency rules, theme data flow, token lifecycle, navigation decision tree) see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Known Stubs

These screens and components are intentionally left unwired so forkers can plug in their own backend. They all follow the existing template patterns (Redux thunks calling `apiClient`, i18n-driven copy). None of them need invention — pick one up and wire it like the existing `login` / `signup` thunks in `src/store/auth/`.

| Stub                 | File                                                               | What's missing                                                                                | Suggested wiring                                                                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Account deletion** | `src/screens/Settings/index.tsx` (`handleDeleteAccount`, ~line 57) | Confirm handler currently logs to console instead of calling the API                          | Add a `deleteAccount` thunk in `src/store/auth/` that calls `apiClient.delete(API_ENDPOINTS.users.me)`. On `fulfilled`, dispatch `logout` and `purgeStore()` (see `src/store/storePurge.ts`).      |
| **Forgot password**  | `src/screens/AuthScreen/components/ForgotPasswordSheet/index.tsx` (`handleValidSubmit`, ~line 60) | Submit handler flips the UI to the "check your email" state without calling anything          | Either add a `requestPasswordReset` thunk (POST to a new `API_ENDPOINTS.auth.forgotPassword`) or pass an `onSubmit` prop from the parent. Map errors to i18n via `classifyApiError`.               |
| **Terms content**    | `src/components/TermsContent/index.tsx`                            | `TERMS_MARKDOWN` is an empty string                                                           | Replace with your app's real TOS + privacy policy in markdown, or move the copy into `src/i18n/locales/en.json` + `es.json` under the `terms` namespace and render translated sections.            |

For any thunk you add, register it in the relevant slice's `extraReducers` and wire the `pending` / `fulfilled` / `rejected` states to `isLoading` and `error` fields on the slice state — same pattern the auth slice already uses.

## Want to help build this?

See [CONTRIBUTING.md](CONTRIBUTING.md) and [`bootstrap.md`](bootstrap.md) for conventions.

## Resources

- [Expo docs](https://docs.expo.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Update](https://docs.expo.dev/eas-update/introduction/)
- [React Navigation](https://reactnavigation.org/)

---

Boilerworks is a [Conflict](https://weareconflict.com) brand. CONFLICT is a registered trademark of Conflict LLC.
