import { env } from '@/constants/env';

export const API_BASE_URL = env.API_URL;

export const API_ENDPOINTS = {
  health: '/api/v1/health',

  auth: {
    mobileLogin: '/api/v1/auth/mobile/login',
    refresh: '/api/v1/auth/refresh',
    logout: '/api/v1/auth/logout',
  },

  users: {
    base: '/api/v1/users',
    byId: (id: string) => `/api/v1/users/${id}`,
  },

  appUsers: {
    base: '/api/v1/app-users',
    byId: (id: string) => `/api/v1/app-users/${id}`,
    byUserId: (userId: string) => `/api/v1/app-users/user/${userId}`,
    status: (id: string) => `/api/v1/app-users/${id}/status`,
  },
} as const;
