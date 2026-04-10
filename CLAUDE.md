# Claude — Boilerworks React Native Expo

Primary conventions doc: [`bootstrap.md`](bootstrap.md)
Context seed: [`memory.md`](memory.md)

Read both before writing any code.

---

## Claude-specific notes

- Prefer `Edit` over rewriting whole files with `Write`.
- Package manager is **Yarn 4** (pinned in `package.json` `packageManager`). Never run `npm install`.
- Run `yarn lint`, `yarn format:check`, and `yarn test` before committing. All three are enforced in CI.
- **Never call `apiClient` directly from a component** — REST calls go through `createAsyncThunk` in a slice.
- **Never call `useQuery` / `useMutation` from Redux slices or thunks** — Apollo is component-scoped only.
- **Always use `useAppDispatch` and `useAppSelector`** from `src/store/hooks.ts` — never raw `useDispatch` / `useSelector`.
- **Form validation rules must be module-level constants** — defining them inline in JSX re-creates them on every render and breaks memoization.
- **Auth tokens live in `expo-secure-store`** (via `src/storage/authStorage.ts`), never in `AsyncStorage`.
- **Never log with raw `console.*`** — use `src/utils/logger.ts`, which is a no-op in production.
- **Transient props use the `$` prefix** in styled-components so they aren't forwarded to native views.
- **Every user-visible string must exist in both `en.json` and `es.json`** before use.
- When adding a themed component, remember to extend `Theme` in `src/theme/types.ts` AND compose the slice into both `lightTheme` and `darkTheme` in `src/theme/themes.ts`. Missing either one will crash at runtime.
- No rebases. No AI co-authorship lines in commits. Single-line conventional-commit subjects.
