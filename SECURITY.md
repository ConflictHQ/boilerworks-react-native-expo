# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Boilerworks, please report it responsibly.

**Do not open a public issue.**

Instead, email **security@weareconflict.com** with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will acknowledge your report within 48 hours and aim to release a fix within 7 days for critical issues.

## Supported Versions

| Version | Supported |
| ------- | --------- |
| latest  | Yes       |

## Security Best Practices

When building on this template:

- Never commit `.env` files or secrets. Use `.env.example` as the canonical reference and keep real values out of source control.
- Store auth tokens and other sensitive values in `expo-secure-store` (see `src/storage/authStorage.ts`), never in `AsyncStorage`.
- Use HTTPS for all API traffic. `EXPO_PUBLIC_API_URL` and `EXPO_PUBLIC_GRAPHQL_URL` should never point at `http://` in staging or production.
- Review EAS build profiles (`eas.json`) before cutting a production build — confirm channel, distribution, and env vars are correct.
- Rotate any keys or secrets that were ever embedded in `EXPO_PUBLIC_*` variables; those are bundled into the app and visible to anyone who inspects the build.
- Keep dependencies up to date. Run `yarn upgrade-interactive` periodically and monitor advisories for `expo`, `react-native`, and native modules.
- Review `src/utils/logger.ts` — the dev-only wrapper must stay dev-only. Never log tokens, request bodies, or PII in production.
