# Boilerworks React Native Expo Memory

This file is the **AI context seed** for the Boilerworks React Native Expo template. It captures decisions, constraints, and non-obvious facts that are not derivable from reading the code.

For conventions and patterns, see [`bootstrap.md`](bootstrap.md). For deeper architectural context see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Project purpose

This is a **template**, not a deployed app. Forkers clone it, rename, point it at their own backend, and ship. Nothing in this repo talks to a production API — the `apiClient` endpoints are conventional paths that will 404 until someone implements them server-side.

---

## Key architectural decisions

| Decision                                                            | Why                                                                                                                                                        |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `styled-components/native` for styling, **not** NativeWind/Tailwind | Theming is the product. Per-component `theme.ts` slices give type-safe light/dark switching without runtime class parsing. Object-based theming > utility classes for mobile. |
| Redux Toolkit **AND** Apollo Client (both)                          | REST + GraphQL coexist. REST uses RTK thunks so errors feed back into slice state for loading/error UI; GraphQL uses Apollo hooks directly in components. |
| JWT auth with proactive + reactive refresh                          | Proactive refresh (60 s before expiry) avoids the double-request penalty of reactive-only. Reactive 401 retry is the safety net.                           |
| `expo-secure-store` for auth tokens, not `AsyncStorage`             | Compliance + iOS Keychain / Android Keystore backing. Tokens never touch the JS-accessible AsyncStorage.                                                    |
| Static React Navigation (`createStaticNavigation`), not dynamic     | `RootStackParamList` is auto-derived via `StaticParamList<typeof RootStack>`. Adding a screen requires no manual type updates.                              |
| Yarn 4 (Berry), not npm                                             | Workspace-ready, faster installs, better caching. `.yarn/` is committed. `packageManager` field in `package.json` enforces it.                              |
| `@/*` path alias → `src/*`                                          | Every import starts with `@/` instead of relative `../../../`. Avoids brittle relative paths when files move.                                              |
| Reanimated 4 + Skia                                                 | Worklet-based animations and Skia-backed canvases (see `DashboardChart`) — the heavy motion pieces live here.                                              |
| i18next with only `en` / `es` seeded                                | Two locales as a working example; add more by dropping JSON into `src/i18n/locales/`.                                                                      |

---

## Things that bite newcomers

- **Never call `apiClient` directly from a component** — all REST goes through a `createAsyncThunk` in a slice. The auth slice (`login`, `signup`, `restoreSession`) is the reference pattern.
- **Never call `useQuery` / `useMutation` from Redux slices or thunks** — Apollo is component-scoped only.
- **`useAppDispatch` / `useAppSelector`, not raw `useDispatch` / `useSelector`** — the typed versions live in `src/store/hooks.ts`.
- **Validation rules must be module-level constants** — defining them inline in JSX re-creates them every render, breaks react-hook-form memoization, and causes flaky validation.
- **Adding a themed component is a 3-file dance** — create the slice in `src/components/<Name>/theme.ts`, extend `Theme` in `src/theme/types.ts`, AND compose into both `lightTheme` and `darkTheme` in `src/theme/themes.ts`. Skipping any step crashes at runtime, not at compile time.
- **Transient props use the `$` prefix** (`$width`, `$height`) so styled-components doesn't forward them to the native view — forgetting this causes React Native warnings about unknown props.
- **Every new string needs `en.json` AND `es.json`** — there is no fallback. A missing key in `es.json` renders the key string literal.
- **`src/constants/colors.js`** (CommonJS) exists only for `app.config.js`. **Do not import it in app code** — use `src/constants/colors.ts` instead.
- **Never read `process.env` directly in app code** — use `src/constants/env.ts` which wraps `EXPO_PUBLIC_*` vars with typed access.
- **`console.log` in production code is dead code** — `src/utils/logger.ts` is a no-op in production builds. Use it anyway so lint passes and intent is clear.
- **App identity is env-driven** — `app.config.js` reads `APP_BASE_NAME` / `APP_BASE_SLUG` / `APP_BASE_BUNDLE_ID` / `APP_BASE_PACKAGE` from `.env`. Renaming the app does not require source changes.
- **EAS Project ID is env-driven** — `EAS_PROJECT_ID` and `EAS_OWNER` live in `.env`, never hardcoded in source or README.

---

## Known stubs (intentional, do not "fix")

The template has three intentional stubs that require a backend to complete. They all follow the existing template patterns — finishing them is a forker decision, not a template fix.

| Stub                 | File                                                              | What's expected                                                                                                                              |
| -------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Account deletion** | `src/screens/Settings/index.tsx` (`handleDeleteAccount`)          | Wire a `deleteAccount` thunk that calls `apiClient.delete(API_ENDPOINTS.users.me)`, then dispatches `logout` + `purgeStore()` on fulfilled. |
| **Forgot password**  | `src/screens/AuthScreen/components/ForgotPasswordSheet/index.tsx` | Wire `handleValidSubmit` to a `requestPasswordReset` thunk that POSTs to `API_ENDPOINTS.auth.forgotPassword`.                                |
| **Terms content**    | `src/components/TermsContent/index.tsx`                           | Replace `TERMS_MARKDOWN` (currently empty) with actual TOS + privacy policy markdown.                                                        |

A fuller description lives in the "Known Stubs" section of [`README.md`](README.md).

---

## Template conventions (family-wide)

This template ships with the standard Boilerworks baseline: `LICENSE` (MIT, Copyright Conflict LLC), `CODE_OF_CONDUCT.md` (Contributor Covenant), `SECURITY.md` (security@weareconflict.com), `CONTRIBUTING.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `bootstrap.md`, and this `memory.md`. All sibling Boilerworks repos follow the same pattern — see `../boilerworks-hono-micro`, `../boilerworks-django-micro`, etc. for references.

- Commits: single-line conventional-commit subjects. No body. No AI co-authorship lines. Ever.
- No rebases.
- Plans and specs live on GitHub issues, not in markdown files in the repo.
- Pre-flight check before any commit: `yarn lint && yarn format:check && yarn test`.
