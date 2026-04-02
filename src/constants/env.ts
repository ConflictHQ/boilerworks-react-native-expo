type Environment = 'development' | 'staging' | 'production';

const ENVIRONMENT =
  (process.env.EXPO_PUBLIC_ENVIRONMENT as Environment) ?? 'development';

const schemeByEnvironment: Record<Environment, string> = {
  production: process.env.EXPO_PUBLIC_SCHEME ?? 'boilerworks',
  staging: process.env.EXPO_PUBLIC_SCHEME
    ? `${process.env.EXPO_PUBLIC_SCHEME}-staging`
    : 'boilerworks-staging',
  development: process.env.EXPO_PUBLIC_SCHEME
    ? `${process.env.EXPO_PUBLIC_SCHEME}-dev`
    : 'boilerworks-dev',
};

export const env = {
  API_URL: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000',
  GRAPHQL_URL: process.env.EXPO_PUBLIC_GRAPHQL_URL ?? 'http://localhost:3000/graphql',
  ENVIRONMENT,
  ENABLE_MOCKS: process.env.EXPO_PUBLIC_ENABLE_MOCKS === 'true',
  ENABLE_MOCK_LOGIN: process.env.EXPO_PUBLIC_ENABLE_MOCK_LOGIN === 'true',
  MOCK_EMAIL: process.env.EXPO_PUBLIC_MOCK_EMAIL ?? 'demo@example.com',
  MOCK_PASSWORD: process.env.EXPO_PUBLIC_MOCK_PASSWORD ?? 'password',
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN ?? null,
  SCHEME: schemeByEnvironment[ENVIRONMENT],
} as const;

export const IS_DEV = env.ENVIRONMENT === 'development';
export const IS_STAGING = env.ENVIRONMENT === 'staging';
export const IS_PROD = env.ENVIRONMENT === 'production';
