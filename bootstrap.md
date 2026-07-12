# Boilerworks React Native Expo -- Bootstrap

> Expo React Native + TypeScript mobile template. `styled-components/native` theming (light/dark), Redux Toolkit + Apollo Client, React Navigation static navigator, i18next, react-hook-form, JWT auth with proactive refresh.

This is the primary conventions document. All agent shims (`CLAUDE.md`, `AGENTS.md`, `CALLIOPE.md`) point here.

An agent given this document and a business requirement should be able to generate correct, idiomatic code without exploring the codebase.

For deeper architectural context (layer dependency rules, theme data flow, token lifecycle, navigation stack decision tree) see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). For non-obvious project facts and decisions see [`memory.md`](memory.md).

---

## What's Already Built

| Layer       | What's there                                                                                                    |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| Runtime     | Expo SDK 54 + React Native 0.81, TypeScript 5.9, Yarn 4                                                         |
| UI          | ~25 themed components (Button, Input, Card, Chip, Carousel, BottomSheet, DashboardChart, GenericCalendarList, …) |
| Theming     | `styled-components/native` with light/dark slices per component; runtime theme switching via `useTheme()`      |
| State       | Redux Toolkit with typed `useAppDispatch` / `useAppSelector` hooks, `createAsyncThunk` pattern, redux-persist  |
| GraphQL     | Apollo Client alongside REST, shared JWT, reactive refresh on `UNAUTHENTICATED`                                |
| REST        | `apiClient` singleton with typed methods, proactive + reactive JWT refresh, 401 retry queue                    |
| Auth        | JWT state machine (`Initial` → `Unauthenticated` / `Onboarding` / `Authenticated`); tokens in `expo-secure-store` |
| Forms       | react-hook-form with themed `Input` / `Textarea` components                                                    |
| Navigation  | React Navigation static navigator; stacks gated by auth hooks                                                   |
| i18n        | i18next with `en` / `es` locale files, namespaced keys                                                         |
| Persistence | `PersistStorage` (AsyncStorage) + `secureStoreAdapter` (redux-persist over expo-secure-store)                  |
| Animations  | Reanimated 4 + Skia                                                                                            |
| CI          | GitHub Actions: unit tests + lint + EAS preview build on push to `main`                                        |

---

## Key Paths

- App entry: `src/App.tsx` (fonts + `ThemeProvider` + `AppNavigator`)
- Source root: `src/`
- TS path alias: `@/*` → `src/*` (see `tsconfig.json`)

---

## Directory Map

| Path              | Contents                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| `src/components/` | Reusable UI components (see Component Inventory below)                                                        |
| `src/screens/`    | Route screens — some single-file, complex ones as folders with nested `components/`                          |
| `src/navigation/` | React Navigation stacks + types                                                                               |
| `src/theme/`      | Light/dark themes, `styled-components` module augmentation, `useThemeValues()`                                |
| `src/store/`      | Redux slices (`auth`, `onboarding`, `signup`), typed selectors, `classifyApiError`, `storePurge`             |
| `src/api/`        | `apiClient`, `apolloClient`, endpoint config, response models (`models/`), request types (`requests/`)       |
| `src/contexts/`   | App-level state (e.g. `PageMainScrollContext`)                                                                |
| `src/i18n/`       | i18next setup + `en.json` / `es.json` locale files                                                           |
| `src/hooks/`      | Custom React hooks — import directly from the file (no barrel export)                                         |
| `src/storage/`    | `authStorage` (expo-secure-store), `languageStorage`, `secureStoreAdapter` (redux-persist WebStorage adapter) |
| `src/services/`   | `PersistStorage` — typed AsyncStorage wrapper (string / boolean / number / object)                            |
| `src/constants/`  | `colors`, `env`, `device`, `animation`, `ui`, `branding`                                                     |
| `src/utils/`      | `color.ts` (hexToRgba), `logger.ts` (dev-only console wrapper)                                                |

---

## Component Structure Patterns

**Export Conventions:**

- Components use `export default <ComponentName>` (not named exports).
- No re-exports from `index.tsx` — import directly from specific files (e.g., `./types`, `./context`, `./consts`).
- Example: `import CalendarDay from './CalendarDay';` and `import { CalendarDataProvider } from './CalendarDay/context';`

Common reusable component folder layout (examples: `src/components/Button/`, `src/components/Chip/`, `src/components/Container/`):

- `index.tsx` — component implementation, `export default <Name>`
- `styled.ts` / `styled.tsx` — `styled-components/native` definitions
- `types.ts` — public prop types + theme slice types (variants / sizes / etc.)
- `theme.ts` — exports component theme slice(s), typically `light<Name>Theme` and `dark<Name>Theme`

Notes:

- Many components also `export { <VariantType>, <SizeType> }` from `index.tsx` (see `src/components/Button/index.tsx`).
- Complex / compound components have nested subcomponents as subfolders (example: `src/components/Carousel/`):
  - Root: `Carousel/index.tsx`, `styled.ts`, `types.ts`, `theme.ts`
  - Subcomponents: `Carousel/CarouselItem/`, `Carousel/CarouselPagination/`, `Carousel/PaginationDot/` (each typically `index.tsx` + `styled.ts`)

---

## Component Inventory

### Themed components (have `theme.ts`)

| Component              | Purpose                                                    | Key props / variants                                                                                                                                                         |
| ---------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Avatar`               | Image / initials / icon avatar                             | `size` (xs–xl), `variant` (solid/gradient/outline), `source`, `initials`, `iconName`, `onPress`                                                                              |
| `BottomSheet`          | Gorhom bottom sheet wrapper with custom handle/backdrop    | `title`, `snapPoints`, `index`, `onClose`, `enableDynamicSizing`, `enablePanDownToClose`; subcomponents: `Backdrop/`, `BottomSheetTextInput/`, `Handle/`                     |
| `Button`               | Multi-variant pressable button                             | `variant` (primary/secondary/outline/ghost/ghost-no-spacing), `size` (xs–lg), `loading`, `disabled`, `fullWidth`, `leftIcon`, `rightIcon`, `hapticFeedback`                  |
| `Card`                 | Pressable wrapper with shadow + Reanimated enter/exit      | `variant` (default/smallPadding), `onPress`, `entering`, `exiting`                                                                                                           |
| `Carousel`             | Horizontal auto-scrolling carousel with pagination         | `items`, `height`, `width`, `spacing`, `autoPlay`, `autoPlayInterval`, `withPagination`; subcomponents: `CarouselItem/`, `CarouselPagination/`, `PaginationDot/`             |
| `Checkbox`             | Checkbox with label, description, shape options            | `checked`, `onToggle`, `label`, `description`, `disabled`, `iconShape` (rounded/square)                                                                                      |
| `Chip`                 | Interactive badge with icons; haptic feedback              | `variant` (primary/secondary), `size` (large/medium), `selected`, `disabled`, `leftIcon`, `rightIcon`                                                                        |
| `Container`            | Safe-area scroll wrapper, optional keyboard avoidance      | `variant` (default/nopadding), `keyboardAvoiding`, `noInsets`, `edges`                                                                                                       |
| `DashboardHeader`      | User greeting header with avatar + action buttons          | `title`, `subtitle`, `userInitials`, `userImage`, `onBellPress`, `onCalendarPress`                                                                                           |
| `Input`                | react-hook-form text input with validation + error display | `control`, `name`, `rules`, `title`, `errorMessage`, `rightIcon`, `enablePasswordToggle`, `fullWidth`                                                                        |
| `MessageCard`          | Dismissible alert / notification card                      | `title`, `message`, `colorVariant` (primary/secondary/neutral/error), `size` (sm/md/lg), `onClose`                                                                           |
| `PhaseIconRenderer`    | Cycle phase icon with bleeding-level indicator             | `phase: CyclePhase`, `color`, `bleedingLevel`, `size`                                                                                                                        |
| `Picker`               | `@react-native-picker/picker` wrapper (platform-aware)     | Generic `<T>`; static `Picker.Item`; Android wraps in container                                                                                                              |
| `RoundedHeaderSection` | Safe-area header with rounded bottom corners               | `children`, `testID`                                                                                                                                                         |
| `StepIndicator`        | Linear progress bar (steps completed vs total)             | `totalSteps`, `currentStep`                                                                                                                                                  |
| `Textarea`             | react-hook-form multiline input + error display            | `control`, `name`, `rules`, `title`, `errorMessage`, `minHeight`, `fullWidth`                                                                                                |

### Unthemed folder components

| Component             | Purpose                                              | Key props / features                                                                                                                                 |
| --------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CalendarPicker`      | `@react-native-community/datetimepicker` wrapper     | `label`, `placeholder`, `value`, `onChange`, `minimumDate`, `maximumDate`; platform modal vs inline                                                   |
| `DashboardChart`      | Skia circular arc chart (cycle/pregnancy progress)   | `currentUnit`, `totalUnits`, `segments` (max 4), `indicator`, `centerContent`, `staticMarkers`; subcomponents: `AnimatedDot/`, `StaticMarkerItem/`    |
| `Flex`                | Flexbox layout shorthand                             | `direction`, `align`, `justify`, `wrap`, `gap`, `rowGap`, `columnGap`, `flex`, `fullWidth`, `fullHeight`                                              |
| `GenericCalendarList` | Virtualized horizontal calendar with infinite scroll | `selectedDate`, `renderItem`, `dataFetchCallbacks`, `containerHeight`, `itemWidth`, `autoScrollToToday`; inverted FlatList; context for selected date |
| `Icons`               | Untitled UI icon set wrapper                         | `name: UntitledUIIconName`, `size`, `color`                                                                                                           |
| `PressableOpacity`    | Reanimated pressable with opacity transition         | `activeOpacity` (default 0.7)                                                                                                                         |
| `TermsSheet`          | Bottom sheet TOS display (i18n sections)             | Ref-forwarded; snap 40 % / 90 %; sections: intro, privacy, usage, limitations, contact                                                                |
| `Text`                | Typography with extensive font/style options         | `size`, `family` (MenckenStd variants / AreaNormal), `weight`, `color`, `align`, `transform`, `numberOfLines`                                         |

### Single-file components

| Component      | Purpose                                        | Key props                              |
| -------------- | ---------------------------------------------- | -------------------------------------- |
| `TabBarSpacer` | Reserves tab bar height using safe area insets | `extraSpacing?: number` (default 8 px) |

---

## Conventions

### Styling / Theming (styled-components)

- Styling library: `styled-components/native`.
- Theme provider: `src/theme/ThemeContext.tsx`. Exposes `useTheme()` (app theme mode + setter) and wraps `StyledThemeProvider`.
- Theme values hook: `src/theme/hooks.ts` exports `useThemeValues()` — reads the `styled-components` theme object via `ThemeContext`.
- Theme typing: `src/theme/styled.d.ts` augments `DefaultTheme` with `src/theme/types.ts`.
- Theme composition: `src/theme/themes.ts` builds `lightTheme` / `darkTheme` and injects per-component slices (`avatar`, `bottomSheet`, `button`, `card`, `carousel`, `checkbox`, `chip`, `container`, `dashboardHeader`, `input`, `messageCard`, `phaseIconRenderer`, `picker`, `roundedHeaderSection`, `stepIndicator`, `textarea`).

Conventions used in styled files:

- Dynamic styling via helper functions returning `` css`...` `` (see `src/components/Button/styled.tsx`, `src/components/Chip/styled.tsx`).
- Prefer theme-driven values (e.g. `theme.button.colors.primary.background`).
- Use transient props with `$` prefix when you don't want props forwarded to native views (e.g. `ScrollSpacer $width/$height` in `src/components/Carousel/styled.ts`).

### Screens

- Screens live in `src/screens/` and are exported as named screen components (e.g. `export const SettingsScreen = ...`) or default exports (e.g. `src/screens/AuthScreen/index.tsx`).
- Simple screens may define `styled.*` components inline (e.g. `src/screens/Home/index.tsx`).
- Complex screens have `components/` subfolders with `index.tsx` + `styled.ts` per subcomponent (e.g. `src/screens/AuthScreen/components/*`).
- Screen module pattern example: `src/screens/AuthScreen/`
  - Entry: `index.tsx` (screen container + orchestration)
  - Local constants: `constants.ts`
  - Subcomponents: `components/<Name>/index.tsx` + `styled.ts`
- Every new screen gets a JSDoc block at the top of `index.tsx` describing what it does, what store state it reads/writes, and any nav params.

### Navigation

- Root navigation in `src/navigation/AppNavigator.tsx` using `createStaticNavigation` + `createNativeStackNavigator`.
- Auth/app routing gated by auth hooks from `src/store/auth/hooks.ts` (`useIsAuthenticated`, `useIsUnauthenticated`, `useIsOnboarding`) — auth state lives in the Redux `auth` slice, not a context.
- Navigation typing:
  - Param list is derived from the static navigator: `src/navigation/types/RootTypes.ts` exports `RootStackParamList = StaticParamList<typeof RootStack>`.
  - Global React Navigation augmentation lives in `src/navigation/types/types.d.ts` (`ReactNavigation.RootParamList extends RootStackParamList`), so `useNavigation()` / `navigation.navigate(...)` pick up these types.
  - Screens commonly use `StaticScreenProps<...>` from `@react-navigation/native`.

### i18n

- i18next setup: `src/i18n/index.ts` (loads locale JSON from `src/i18n/locales/`).
- In components/screens, translations accessed via `useTranslation()` and string keys (e.g. `t('auth.login.title')`).
- Key naming: `<namespace>.<element>.<property>` — e.g. `auth.login.title`, `settings.deleteConfirmation.message`.

| Namespace              | Covers                                              |
| ---------------------- | --------------------------------------------------- |
| `auth`                 | Login, register, forgot-password sheets             |
| `home`                 | Home screen                                         |
| `settings`             | Settings screen (theme, language, logout, delete)   |
| `navigation`           | Tab labels                                          |
| `common`               | Shared labels (save, cancel, required, etc.)        |
| `button`               | Generic button labels                               |
| `terms`                | Terms & Privacy screen                              |
| `accessibilityGenerics`| Shared a11y labels                                  |

**Rule:** every new user-visible string needs an entry in **both** `en.json` and `es.json` before use.

### Redux

- Store: `src/store/store.ts` — configured with Redux Toolkit (`configureStore`).
- Types: `src/store/types.ts` — exports `RootState` and `AppDispatch` (inferred; never manually update).
- Typed hooks: `src/store/hooks.ts` — **always** use these instead of raw `useDispatch` / `useSelector`:
  - `useAppDispatch()` — typed dispatch hook
  - `useAppSelector(selector)` — typed selector hook
- Slices: `src/store/<feature>/index.ts` — use `createSlice` for sync reducers, `createAsyncThunk` for async actions with `extraReducers`.
- Selectors: `src/store/<feature>/selectors.ts` — use `createAppSelector` from `src/store/utils.ts` (typed `createSelector`).
- `src/store/storePurge.ts` — `registerPersistor(p)` / `purgeStore()`: call `purgeStore()` on logout to wipe persisted state.
- `extractApiErrors(error)` in `src/store/utils.ts` — extracts `ApiError[]` from axios error responses; use in slice `rejected` handlers.

**Registered slices in `store.ts`:**

- `auth` — JWT, decoded JWT, user profile, `AuthStatus`; thunks: `restoreSession`, `login`, `logout`; action: `tokenRefreshed`
- `onboarding` — onboarding flow state; action: `completeOnboarding`
- `signup` — user registration; thunk: `signup` (POST `/users`, then auto-dispatches `login`)

### API Client

Public surface of `apiClient` (singleton from `src/api/client.ts`):

- `apiClient.get<TRes, TParams>(url, params?, config?)` — typed GET
- `apiClient.post<TRes, TReq>(url, body, config?)` — typed POST
- `apiClient.put / patch / delete` — same shape
- `apiClient.setAuthToken(token | null)` — sets `Authorization: Bearer <token>` on all future requests; decodes and caches the expiry; pass `null` to clear
- `apiClient.bootstrapToken(storedJwt)` — call once during app bootstrap; proactively refreshes if the token is expiring within 60 s, returns the active JWT (or `null` on failure)
- `apiClient.setOnTokenRefreshed(cb)` — register a callback invoked with the new JWT after any successful refresh (proactive or reactive)
- `apiClient.setOnSessionExpired(cb)` — register a callback invoked when a refresh fails and the session is cleared

**Token lifecycle:**

1. **Bootstrap** — call `apiClient.bootstrapToken(jwt)` after reading from storage; it calls `setAuthToken` and may proactively refresh before the first API call.
2. **Proactive refresh** — if the cached expiry is within 60 s, the request interceptor refreshes automatically before forwarding the request. Concurrent requests arriving during the refresh are queued and retried with the new token.
3. **Reactive refresh (401)** — the response interceptor catches 401s on non-auth endpoints, performs one refresh, retries the original request, and resolves any other queued 401s. A second 401 on the same request is not retried.
4. **Auth endpoints** (`API_ENDPOINTS.auth.*`) never receive an `Authorization` header — the interceptor strips it automatically.

**File layout:**

- API models (responses): `src/api/models/<feature>/<Name>.ts` — one interface per file.
- API request types: `src/api/requests/<feature>/<Name>.ts` — one interface per file.
- API endpoints: `src/api/config.ts` — all endpoint paths as `API_ENDPOINTS` const.
- API client: `src/api/client.ts` — `ApiClient` class singleton exported as `apiClient`.

### GraphQL (Apollo Client)

Apollo Client is set up alongside `apiClient`. Use `useQuery` / `useMutation` directly in screens/components — no Redux thunks needed for GraphQL calls.

**Setup files:**

- `src/api/apolloClient.ts` — `createApolloClient(onSessionExpired)` factory; composed links: `authLink` → `errorLink` → `httpLink`
- `src/App.tsx` `ApolloClientProvider` — instantiates the client once inside the Redux `<Provider>`; wires session expiry to `dispatch(logout())`
- `src/constants/env.ts` `env.GRAPHQL_URL` — GraphQL endpoint, set via `EXPO_PUBLIC_GRAPHQL_URL`

**Defining queries and mutations:**

Co-locate queries with the component that uses them, or place in a `queries.ts` file next to the screen:

```ts
import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      id
      displayName
    }
  }
`;
```

**useQuery:**

```ts
import { useQuery } from '@apollo/client';
import { GET_PROFILE } from './queries';

const { data, loading, error } = useQuery(GET_PROFILE);
```

**useMutation:**

```ts
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from './queries';

const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE);

await updateProfile({ variables: { displayName: 'New Name' } });
```

**Cache invalidation / refetch:**

```ts
// refetch a query after mutation:
const [createPost] = useMutation(CREATE_POST, {
  refetchQueries: [{ query: GET_FEED }],
});

// or evict a cached item imperatively:
import { useApolloClient } from '@apollo/client';
const apolloClient = useApolloClient();
apolloClient.cache.evict({ id: 'Post:123' });
apolloClient.cache.gc();
```

**Rules:**

- Use Apollo only for GraphQL endpoints. REST calls continue through `apiClient` + Redux thunks.
- Do **not** call `useQuery` / `useMutation` from Redux slices or thunks.
- Error handling: Apollo surfaces errors in the `error` return value of `useQuery` / `useMutation`. Map them to i18n strings in the component, same as REST errors.
- On `UNAUTHENTICATED`, Apollo's `errorLink` attempts one token refresh via `apiClient.bootstrapToken()` before calling `onSessionExpired`. A `retried` context flag prevents infinite loops.

### API Calls in Redux (thunk pattern)

All REST API calls go through `createAsyncThunk` — never call `apiClient` directly from a component.

**Slice file structure:**

```
src/store/<feature>/
  index.ts     ← slice + thunks
  types.ts     ← state interface + status enum
  selectors.ts ← typed selectors
```

**State shape convention:**

```ts
// types.ts
export enum WidgetStatus { Idle = 'idle', Success = 'success' }

export interface WidgetState {
  status: WidgetStatus;
  isLoading: boolean;
  error: ApiErrorType | null;   // use ApiError[] | null for validation errors
  data: WidgetResponse['data'] | null;
}
```

**Thunk — simple (classify error into enum):**

Use when the caller only needs to know *what kind of error* occurred (network, 401, etc.):

```ts
export const fetchWidget = createAsyncThunk<
  WidgetResponse['data'],    // fulfilled payload
  string,                    // arg (widget id)
  { rejectValue: ApiErrorType }
>('widget/fetch', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get<WidgetResponse, void>(
      API_ENDPOINTS.widgets.byId(id)
    );
    return data.data;
  } catch (e) {
    return rejectWithValue(classifyApiError(e));
  }
});
```

**Thunk — validation errors (array of field errors):**

Use when the API returns field-level validation errors (e.g. create/update forms):

```ts
export const createWidget = createAsyncThunk<
  WidgetResponse['data'],
  CreateWidgetRequest,
  { rejectValue: ApiError[] }
>('widget/create', async (request, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post<WidgetResponse, CreateWidgetRequest>(
      API_ENDPOINTS.widgets.base,
      request
    );
    return data.data;
  } catch (error) {
    const apiErrors = extractApiErrors(error);
    if (apiErrors) return rejectWithValue(apiErrors);
    throw error;   // re-throw unexpected errors (network, 500, etc.)
  }
});
```

**extraReducers:**

```ts
const widgetSlice = createSlice({
  name: 'widget',
  initialState,
  reducers: { resetWidget: () => initialState },
  extraReducers: builder => {
    builder
      .addCase(fetchWidget.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWidget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.status = WidgetStatus.Success;
      })
      .addCase(fetchWidget.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? ApiErrorType.Unknown;
      });
  },
});
```

**Selectors:**

```ts
// selectors.ts
import { createAppSelector } from '@/store/utils';
import type { RootState } from '@/store/types';

const selectWidget = (state: RootState) => state.widget;

export const selectWidgetData    = createAppSelector(selectWidget, s => s.data);
export const selectWidgetLoading = createAppSelector(selectWidget, s => s.isLoading);
export const selectWidgetError   = createAppSelector(selectWidget, s => s.error);
```

**Register the slice** in `src/store/store.ts`:

```ts
import widgetReducer from './widget';

reducer: { ...existing, widget: widgetReducer }
```

`RootState` and `AppDispatch` in `src/store/types.ts` are inferred — no manual update needed.

**Use in a component:**

```ts
const dispatch = useAppDispatch();
const data     = useAppSelector(selectWidgetData);
const loading  = useAppSelector(selectWidgetLoading);
const error    = useAppSelector(selectWidgetError);

dispatch(fetchWidget(id));

if (error === ApiErrorType.NetworkError) { /* show offline banner */ }
```

**Dispatching across slices:** A slice's `extraReducers` can listen to thunks/actions from *other* slices. Example: auth slice listens to `completeOnboarding` (a sync action from the onboarding slice) to advance `AuthStatus`. Prefer this over importing `store` directly.

**Normalized state (collections of items):** When a slice holds a list of items by ID (e.g. a feed, a message list), use `createEntityAdapter` instead of a plain array. It provides `upsertMany`, `removeOne`, etc. and generates `selectAll` / `selectById` selectors for free. Use plain `data: Item[]` for single-item or simple cases.

### Persistence

- Generic persistence wrapper: `src/services/persist-storage.ts` — `PersistStorage` class; typed AsyncStorage wrapper with `get` / `set` / `remove` for string, boolean, number, and object values.
- Feature-specific storage helpers live in `src/storage/`:
  - `authStorage` — JWT + refresh token via `expo-secure-store`
  - `languageStorage` — user language preference
  - `secureStoreAdapter` — redux-persist `WebStorage` adapter over `expo-secure-store`

**Rule:** auth tokens and other sensitive values must go through `expo-secure-store`, never `AsyncStorage`.

### Custom Hooks

All hooks live in `src/hooks/`. Import from the file directly (no barrel export).

| Hook                     | Purpose                                                              | When to use                                                                       |
| ------------------------ | -------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `useAppBootstrap`        | Wires `apiClient` token/session callbacks to Redux dispatch          | Call once in `App.tsx` inside `<Provider>`, outside any screen                    |
| `useCallbackRef`         | Returns a stable function ref that always calls the latest closure   | Pass callbacks to Reanimated worklets or memoized children without adding to deps |
| `useDebouncedCallback`   | Debounces a callback with `flush` / `cancel`; supports `leading` mode | Search inputs, resize handlers                                                    |
| `useResponsiveFontSize`  | Scales a font size linearly from a 390 px baseline                   | One-off responsive text outside the `Text` component                              |
| `useUnmount`             | Runs a cleanup function exactly once on unmount                      | Cleanup that must not re-run on re-renders                                        |
| `useColorScheme`         | Returns current color scheme (`light` / `dark`)                      | When you need scheme outside the theme system                                     |

### Constants

All constants live in `src/constants/`. They are plain values — **not** theme tokens. Use theme tokens (via `useThemeValues()`) for anything that must change between light/dark; use constants for things that never vary by theme.

| File           | Exports                                                                          | Use for                                                                       |
| -------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `animation.ts` | `DEFAULT_FADE_IN`, `DEFAULT_FADE_OUT`, `DEFAULT_LAYOUT_TRANSITION`                | Reanimated enter/exit animations on `Animated.View`                           |
| `branding.ts`  | `BRAND_NAME`                                                                     | App name string (sourced from `EXPO_PUBLIC_APP_NAME` env var)                 |
| `colors.ts`    | `Colors` (palette), `FontFamily`, `BODY_FONT`, `ACCENT_FONT`, `customFonts`      | Raw palette + font loading map used in `App.tsx` and theme files              |
| `colors.js`    | `Colors` (CommonJS)                                                              | **Only** used in `app.config.js` — do not import in app code                  |
| `device.ts`    | `IS_ANDROID`, `IS_IOS`, `IS_SMALL_DEVICE`                                        | Platform guards and small-screen layout tweaks                                |
| `env.ts`       | `env` (typed config object), `IS_DEV`, `IS_STAGING`, `IS_PROD`                   | **All** env-var access — never read `process.env` directly in app code        |
| `ui.ts`        | `WRAPPER_SPACING` (24 px), `TAB_BAR_HEIGHT` (95 px)                              | Layout spacing that must match across screens                                 |

### Auth State Machine

`AuthStatus` enum lives in `src/store/auth/types.ts`. The navigator in `src/navigation/AppNavigator.tsx` uses auth hooks to gate which stack is visible.

```
Initial ──restoreSession──▶ Unauthenticated  (no stored token)
Initial ──restoreSession──▶ Onboarding       (token found, no app-user profile)
Initial ──restoreSession──▶ Authenticated    (token found + profile complete)

Unauthenticated ──signup──▶ Onboarding
Unauthenticated ──login───▶ Authenticated

Onboarding ──completeOnboarding──▶ Authenticated

Authenticated ──logout / session expired──▶ Unauthenticated
```

- `Initial` state: navigator shows nothing (splash screen is visible).
- Stack selection is driven by `useIsUnauthenticated`, `useIsOnboarding`, `useIsAuthenticated` hooks from `src/store/auth/hooks.ts`.
- `restoreSession` thunk is dispatched once in `AppNavigator` on mount.

### Error Handling

Error classification lives in `src/api/errors.ts`.

```ts
enum ApiErrorType { Timeout, NetworkError, Unauthorized, NotFound, Validation, ServerError, Unknown }
classifyApiError(e: unknown): ApiErrorType
```

Pattern for a slice:

1. In `createAsyncThunk`, the thunk throws on failure (axios does this automatically).
2. In `extraReducers` `rejected` handler: call `classifyApiError(action.error)` and store the result in `state.error`.
3. Use `extractApiErrors(error)` from `src/store/utils.ts` when you need the raw `ApiError[]` array from a validation response.
4. In the component: select `state.error` and map `ApiErrorType` to a user-facing i18n string.

### Forms

react-hook-form is the only form library used. `Input` and `Textarea` components accept `control`, `name`, and `rules` props directly.

**Rules must be module-level constants** — never define validation objects inline in JSX (they re-create on every render and break memoization).

```ts
// good — module level
const EMAIL_RULES = {
  required: t('common.required'),
  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('common.invalidEmail') },
};

// then in JSX:
<Input control={control} name="email" rules={EMAIL_RULES} />
```

Error messages are surfaced via the `errorMessage` prop (pass `errors.fieldName?.message`).

### Logging

Use `src/utils/logger.ts`, never raw `console.*`. It's a no-op in production builds.

---

## Adding a new module

### Add a new screen

1. Create `src/screens/<Name>/index.tsx` (and optionally `styled.ts`, `components/`).
2. Add a JSDoc block at the top of `index.tsx` describing what the screen does, what store state it reads/writes, and any nav params.
3. Decide which stack it belongs to (`LoginStack`, `OnboardingStack`, or `AppStack`) and add it to the relevant file in `src/navigation/`.
4. `RootStackParamList` is auto-derived from the static navigator — no manual type update needed, but verify with TypeScript after adding.
5. Add i18n keys under the appropriate namespace in `en.json` + `es.json`.

### Add a new themed component

1. Create `src/components/<Name>/` with `index.tsx`, `styled.ts`, `types.ts`, `theme.ts`.
2. In `theme.ts`: export `light<Name>Theme` and `dark<Name>Theme`.
3. In `src/theme/types.ts`: add a `<name>: <NameTheme>` property to the `Theme` interface.
4. In `src/theme/themes.ts`: compose `light<Name>Theme` into `lightTheme` and `dark<Name>Theme` into `darkTheme`.
5. Use `useThemeValues()` or the `theme` prop in styled components to access `theme.<name>.*`.

### Add a new store slice

1. Create `src/store/<feature>/index.ts` using `createSlice` / `createAsyncThunk`.
2. Create `src/store/<feature>/selectors.ts` using `createAppSelector` from `src/store/utils.ts`.
3. Register the reducer in `src/store/store.ts` under `reducer: { ..., <feature>: <feature>Reducer }`.
4. `RootState` and `AppDispatch` in `src/store/types.ts` are inferred from the store — no manual update needed.

### Add a new REST endpoint

1. Add the path to `API_ENDPOINTS` in `src/api/config.ts`.
2. Create response model at `src/api/models/<feature>/<Name>.ts`.
3. Create request type at `src/api/requests/<feature>/<Name>.ts` (if needed).
4. Call `apiClient.<method><ResponseType, RequestType>(API_ENDPOINTS.<path>, ...)` from a thunk.

### Add a new GraphQL query / mutation

1. Co-locate with the component in a `queries.ts` file using `gql`.
2. Call with `useQuery` or `useMutation` directly in the component.
3. Map errors to i18n strings in the component — do not push GraphQL errors through Redux.

### Add a new i18n string

1. Add the key under the correct namespace in `src/i18n/locales/en.json`.
2. Add the same key with a translated value in `src/i18n/locales/es.json`.
3. Use `t('namespace.key')` in components via `useTranslation()`.

---

## Git Conventions

**Commits:**

- Single-line subject only — no body, no bullet points.
- Format: `type(scope): short description` (conventional commits).
- Example: `feat(auth): set token before profile fetch`

**Pull Requests:**

- Title: short, under 70 characters, same conventional-commit format as commits.
- Body: 2–4 bullet points max covering what changed and why. No lengthy prose.

---

## Common Commands

```bash
yarn install          # install deps (also runs patch-package via postinstall)
yarn start            # Expo dev server
yarn ios              # Launch iOS simulator
yarn android          # Launch Android emulator
yarn web              # Web preview
yarn lint             # ESLint
yarn format           # Prettier (write)
yarn format:check     # Prettier (check) — used in CI
yarn test             # Jest
yarn test:watch       # Jest watch mode
yarn test:ci          # Jest CI mode
yarn optimize-images  # Compress PNGs under src/assets/images/
```
