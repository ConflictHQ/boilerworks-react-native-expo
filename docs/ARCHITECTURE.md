# Architecture Reference

## Layer Dependency Rules

```
screens / navigation
        │
        ▼
  store (slices, thunks)
        │
        ▼
  api (client, models, requests)
        │
        ▼
  services / storage
        │
        ▼
  constants / utils / theme
```

- **Screens** may import from store, components, hooks, constants, utils, theme. Never from other screens.
- **Store slices** may import from api, storage, constants, utils. Never from screens or components.
- **API layer** may import from constants (`API_ENDPOINTS`, `env`). Never from store or screens.
- **Components** may import from theme, constants, hooks, utils. Never from store (pass data via props) or screens.
- **Hooks** may import from store, api, constants, utils. Never from screens or components.

## Theme Data Flow

```
src/constants/colors.ts   ← raw palette (hex values)
        │
        ▼
src/components/<Name>/theme.ts   ← per-component light/dark slices
        │
        ▼
src/theme/themes.ts   ← composes all slices into lightTheme / darkTheme
        │
        ▼
src/theme/ThemeContext.tsx   ← wraps app in StyledThemeProvider
        │
        ▼
styled-components/native `theme` prop   ← consumed in styled.ts files
        │
        ▼
src/theme/hooks.ts `useThemeValues()`   ← consumed imperatively in components
```

`src/theme/styled.d.ts` augments `DefaultTheme` so TypeScript knows the shape of `theme` everywhere.

## Auth Token Lifecycle

```
App launch
  └─ AppNavigator mounts
       └─ dispatch(restoreSession())
            └─ authStorage.getJwt()
                 ├─ null → AuthStatus.Unauthenticated
                 └─ jwt found
                      └─ apiClient.bootstrapToken(jwt)
                           ├─ token still valid → setAuthToken, AuthStatus.Authenticated/Onboarding
                           └─ token expiring (<60 s) → refresh first, then set
```

During the session, `apiClient` handles token maintenance automatically:

- **Proactive refresh**: request interceptor checks expiry before every call; if within 60 s it refreshes first and queues concurrent requests.
- **Reactive refresh (401)**: response interceptor catches 401s, refreshes once, retries. A second 401 kills the session.
- **Callbacks**: `setOnTokenRefreshed` → dispatches `tokenRefreshed` (persists new JWT). `setOnSessionExpired` → dispatches `logout`.

Both callbacks are registered in `useAppBootstrap` (called from `App.tsx`).

## Navigation Stack Decision Tree

```
Where does the new screen belong?

Is the user unauthenticated?
  Yes → LoginStack  (src/navigation/LoginStack.ts)

Is the user in onboarding (has JWT, no profile)?
  Yes → OnboardingStack  (src/navigation/OnboardingStack.ts)

Is the user fully authenticated?
  Yes → Is it a tab?
          Yes → add to bottom tab navigator in AppStack
          No  → add as a stack screen in AppStack (src/navigation/AppStack.ts)
```

The three groups (`Auth`, `Onboarding`, `App`) are rendered conditionally via the `if` hook in `RootStack` (see `src/navigation/AppNavigator.tsx`). Only one group is active at a time.

## Redux Persist Scope

Only the `auth` slice is persisted (via `redux-persist` + `secureStoreAdapter`). All other slices reset on app restart. To persist a new slice:

1. Wrap its reducer with `persistReducer(config, reducer)` in its `index.ts`.
2. The `store.ts` serializable-check config already ignores redux-persist actions.

Call `purgeStore()` from `src/store/storePurge.ts` on logout to wipe all persisted state.

## GraphQL Client (Apollo)

Apollo Client runs **alongside** the REST `apiClient` — it does not replace it.

```
src/api/apolloClient.ts   ← createApolloClient() factory (pure: no Redux/React imports)
        │
        ▼
src/App.tsx ApolloClientProvider   ← instantiates client once; wires onSessionExpired → logout
        │
        ▼
<ApolloProvider>   ← wraps PersistGate and below
        │
        ▼
useQuery / useMutation   ← consumed directly in screens/components
```

**Token lifecycle with Apollo:**

Apollo does **not** refresh tokens. The existing `apiClient` interceptors keep the JWT in SecureStore current. Apollo's `authLink` reads `authStorage.getJwt()` at request time — it always gets the fresh value that `apiClient` last stored.

**Session expiry:** Apollo's `errorLink` detects `UNAUTHENTICATED` GraphQL errors and attempts one token refresh via `apiClient.bootstrapToken()` before giving up. If the refresh succeeds, the original operation is retried automatically. If it fails (or a retry also returns `UNAUTHENTICATED`), `onSessionExpired` is called, which dispatches the Redux `logout()` thunk.

**Layer rules for Apollo:** same as REST — screens and components call `useQuery`/`useMutation` directly; queries/mutations live in the file that uses them (or a co-located `queries.ts`). Store slices do **not** call Apollo.