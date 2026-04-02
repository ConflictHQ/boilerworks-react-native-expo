import{ env } from '@/constants/env';
import type { UserProfile } from './types';

const MOCK_USER_ID = '00000000-0000-0000-0000-000000000001';

const base64url = (obj: object): string =>
  btoa(JSON.stringify(obj))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

const MOCK_JWT_HEADER = base64url({ alg: 'HS256', typ: 'JWT' });
const MOCK_JWT_PAYLOAD = base64url({
  sub: MOCK_USER_ID,
  roles: ['user'],
  iat: 1700000000,
  exp: 9999999999,
  aud: 'app',
  iss: 'mock',
});

export const MOCK_JWT = `${MOCK_JWT_HEADER}.${MOCK_JWT_PAYLOAD}.mock-signature`;

export const MOCK_PROFILE: UserProfile = {
  id: MOCK_USER_ID,
  attributes: {
    email: env.MOCK_EMAIL,
    firstName: 'Demo',
    lastName: 'User',
    fullName: 'Demo User',
  },
};
