# Contributing to Boilerworks React Native Expo

Thank you for your interest in contributing!

## Getting Started

1. Fork the repository
2. Clone your fork
3. Run `yarn install` (see README.md for full local-dev setup)
4. Copy `.env.example` to `.env` and fill in the values
5. Run `yarn start` to launch the Expo dev server
6. Create a feature branch from `main`

## Development Process

1. Pick an issue from the project board
2. Comment your plan on the issue before starting
3. Create a branch: `feature/issue-number-description` or `fix/issue-number-description`
4. Make your changes following `bootstrap.md` conventions
5. Write or update tests
6. Run lint, format, and tests (see README.md for commands)
7. Submit a pull request

## Code Style

See [`bootstrap.md`](bootstrap.md) for project conventions and [`CLAUDE.md`](CLAUDE.md) for the full component inventory, directory map, and recipes. Run `yarn lint` and `yarn format:check` before committing.

## Testing

All new features need tests. All bug fixes need regression tests. Use `@testing-library/react-native` for component tests and Jest for unit tests. Run with `yarn test`.

## Commit Messages

- Single-line subject only — no body, no bullet points.
- Conventional commits format: `type(scope): short description`
- Example: `feat(auth): set token before profile fetch`

## Pull Requests

- Title: short, under 70 characters, conventional-commit format.
- Body: 2–4 bullet points covering what changed and why.

## Questions?

Open an issue or start a discussion in this repository.
