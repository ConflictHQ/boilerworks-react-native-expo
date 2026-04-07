# Boilerworks Mobile

[![Open in Expo Go]()]()

---

## Try the App

Scan with **Expo Go** to open the latest update:

[<img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" height="40">](https://apps.apple.com/app/expo-go/id982107779)
[<img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" height="40">](https://play.google.com/store/apps/details?id=host.exp.exponent)

![Expo QR (development)](https://qr.expo.dev/eas-update?projectId=95f931b2-0bd2-4ef1-867b-442e9d15ccf9&channelId=019cb7d2-6b29-7077-99b8-2bc5643e1e04)

---

## Local Development

**1. Install dependencies:**

```sh
npm install
```

**2. Copy and fill in environment variables:**

```sh
cp .env.example .env
```

**3. Start the dev server:**

```sh
npx expo start
```

Scan the QR in your terminal with Expo Go.

---

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

---

## CI

| Workflow                | Trigger                                 | Action                              |
| ----------------------- | --------------------------------------- | ----------------------------------- |
| `eas-preview-build.yml` | Push to `main`                          | EAS preview build for iOS & Android |
| `unit-tests.yml`        | Push / PR to `main`, `develop`, `stage` | Lint, format, unit tests            |

---

## GraphQL

Apollo Client is configured alongside the REST client. Set the GraphQL endpoint in `.env`:

```sh
EXPO_PUBLIC_GRAPHQL_URL=https://api.example.com/graphql
```

Authentication is handled automatically — the same JWT used for REST calls is injected by Apollo's auth link.

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

---

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

---

## Resources

- [Expo docs](https://docs.expo.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Update](https://docs.expo.dev/eas-update/introduction/)
- [React Navigation](https://reactnavigation.org/)
