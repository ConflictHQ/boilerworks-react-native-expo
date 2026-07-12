# Calliope — Boilerworks React Native Expo
<!-- Agent shim for https://github.com/calliopeai/calliope-cli -->

Primary conventions doc: [`bootstrap.md`](bootstrap.md)
Context seed: [`memory.md`](memory.md)

Read both before writing any code.

---

## Project-specific notes

- Package manager is Yarn 4 (never `npm install`); run `yarn lint`, `yarn format:check`, and `yarn test` before committing — all three are CI-enforced.
- REST goes through `createAsyncThunk` in a slice (never call `apiClient` from a component); Apollo `useQuery`/`useMutation` are component-scoped only, never in slices or thunks.
- Always use `useAppDispatch`/`useAppSelector` from `src/store/hooks.ts`; auth tokens live in `expo-secure-store` (`src/storage/authStorage.ts`), never AsyncStorage.
- Log via `src/utils/logger.ts`, never raw `console.*`; transient styled-components props use the `$` prefix so they aren't forwarded to native views.
- Every user-visible string must exist in both `en.json` and `es.json`; new themed components must extend `Theme` in `src/theme/types.ts` and compose into both `lightTheme` and `darkTheme`.
- Form validation rules must be module-level constants — defining them inline in JSX breaks memoization.
