import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { persistReducer } from 'redux-persist';
import { secureStoreAdapter } from '@/storage/secureStoreAdapter';

import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/config';
import type { MobileLoginResponse } from '@/api/models/auth/MobileLoginResponse';
import type { LoginRequest } from '@/api/requests/auth/LoginRequest';
import type { LogoutRequest } from '@/api/requests/auth/LogoutRequest';
import type { JwtPayload } from '@/api/models/auth/JwtPayload';
import type { UserResponse } from '@/api/models/users/UserResponse';
import { authStorage } from '@/storage/authStorage';
import { logger } from '@/utils/logger';
import {
  classifyApiError,
  ApiErrorType,
  isNetworkError,
  isTimeoutError,
} from '@/api/errors';
import { AuthStatus, type AuthState, type UserProfile } from './types';
import { completeOnboarding } from '@/store/onboarding';
import { purgeStore } from '@/store/storePurge';
import { env } from '@/constants/env';
import { MOCK_JWT, MOCK_PROFILE } from './mockAuth';

const initialState: AuthState = {
  jwt: null,
  decodedJwt: null,
  profile: null,
  status: AuthStatus.Initial,
  isStale: false,
  isLoading: false,
  error: null,
};

const decodeJwt = (jwt: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(jwt);
  } catch {
    return null;
  }
};

const fetchProfile = async (jwt: string): Promise<UserProfile> => {
  const decoded = decodeJwt(jwt);
  if (!decoded?.sub) throw new Error('Malformed JWT: missing sub claim');
  const userId = decoded.sub;

  const userResponse = await apiClient.get<UserResponse, void>(
    API_ENDPOINTS.users.byId(userId)
  );

  return {
    id: userResponse.data.data.id,
    attributes: userResponse.data.data.attributes,
  };
};

export const restoreSession = createAsyncThunk<
  { jwt: string; profile: UserProfile; isStale?: boolean } | null,
  void,
  { state: { auth: AuthState } }
>('auth/restoreSession', async (_, { getState }) => {
  logger.log('[auth] restoreSession: checking stored token');
  if (env.ENABLE_MOCK_LOGIN) {
    const storedJwt = await authStorage.getJwt();
    if (storedJwt === MOCK_JWT) {
      logger.log('[auth] restoreSession: mock session found');
      return { jwt: MOCK_JWT, profile: MOCK_PROFILE };
    }
  }
  const jwt = await authStorage.getJwt();
  if (!jwt) {
    logger.log('[auth] restoreSession: no token, unauthenticated');
    return null;
  }

  let activeJwt: string | null = null;
  try {
    activeJwt = await apiClient.bootstrapToken(jwt);
    if (!activeJwt) {
      logger.log(
        '[auth] restoreSession: token expired and refresh failed, unauthenticated'
      );
      return null;
    }

    const profile = await fetchProfile(activeJwt);
    logger.log('[auth] restoreSession: session restored, user', profile.id);
    return { jwt: activeJwt, profile };
  } catch (e) {
    if (isNetworkError(e) || isTimeoutError(e)) {
      const persistedProfile = getState().auth.profile;
      if (persistedProfile) {
        logger.warn('[auth] restoreSession: offline, using cached profile');
        return {
          jwt: activeJwt ?? jwt,
          profile: persistedProfile,
          isStale: true,
        };
      }
    }
    throw e;
  }
});

export const login = createAsyncThunk<
  { jwt: string; profile: UserProfile },
  LoginRequest,
  { rejectValue: ApiErrorType }
>('auth/login', async (request, { rejectWithValue }) => {
  try {
    if (env.ENABLE_MOCK_LOGIN && request.email === env.MOCK_EMAIL && request.password === env.MOCK_PASSWORD) {
      logger.log('[auth] login: mock mode — bypassing API');
      apiClient.setAuthToken(MOCK_JWT);
      await Promise.all([
        authStorage.setJwt(MOCK_JWT),
        authStorage.setRefreshToken('mock-refresh-token'),
      ]);
      return { jwt: MOCK_JWT, profile: MOCK_PROFILE };
    }
    logger.log('[auth] login: attempting for', request.email);
    const { data: authData } = await apiClient.post<
      MobileLoginResponse,
      LoginRequest
    >(API_ENDPOINTS.auth.mobileLogin, request);

    apiClient.setAuthToken(authData.jwt);
    const profile = await fetchProfile(authData.jwt);
    logger.log('[auth] login: success, user', profile.id);
    await Promise.all([
      authStorage.setJwt(authData.jwt),
      authStorage.setRefreshToken(authData.refreshToken),
    ]);
    return { jwt: authData.jwt, profile };
  } catch (e) {
    return rejectWithValue(classifyApiError(e));
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  logger.log('[auth] logout: starting');
  const refreshToken = await authStorage.getRefreshToken();

  try {
    if (refreshToken) {
      await apiClient.post<void, LogoutRequest>(API_ENDPOINTS.auth.logout, {
        refreshToken,
      });
      logger.log('[auth] logout: server logout ok');
    }
  } catch (e) {
    logger.warn('[auth] logout: server logout failed (best-effort)', e);
  }

  await authStorage.clearAll();
  apiClient.setAuthToken(null);
  purgeStore();
  logger.log('[auth] logout: local session cleared');
});

const resetAuthState = (state: AuthState) => {
  state.jwt = null;
  state.decodedJwt = null;
  state.profile = null;
  state.status = AuthStatus.Unauthenticated;
  state.isStale = false;
  state.error = null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    tokenRefreshed: (state, action: PayloadAction<string>) => {
      logger.log('[auth] tokenRefreshed: updating jwt in store');
      state.jwt = action.payload;
      state.decodedJwt = decodeJwt(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(restoreSession.pending, state => {
        state.isLoading = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          const { jwt, profile, isStale = false } = action.payload;
          // Respect persisted Authenticated status so completeOnboarding is sticky
          const hasProfile = state.status === AuthStatus.Authenticated;
          state.jwt = jwt;
          state.decodedJwt = decodeJwt(jwt);
          state.profile = profile;
          state.isStale = isStale;
          state.status = hasProfile
            ? AuthStatus.Authenticated
            : AuthStatus.Onboarding;
          logger.log(
            `[auth] status → ${state.status} (restoreSession${isStale ? ', offline/stale' : ''})`
          );
        } else {
          state.status = AuthStatus.Unauthenticated;
          logger.log(
            '[auth] status → Unauthenticated (restoreSession: no token)'
          );
        }
      })
      .addCase(restoreSession.rejected, state => {
        state.isLoading = false;
        state.status = AuthStatus.Unauthenticated;
        logger.warn(
          '[auth] status → Unauthenticated (restoreSession rejected)'
        );
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
        logger.log('[auth] login pending');
      })
      .addCase(login.fulfilled, (state, action) => {
        const { jwt, profile } = action.payload;
        state.isLoading = false;
        state.jwt = jwt;
        state.decodedJwt = decodeJwt(jwt);
        state.profile = profile;
        state.isStale = false;
        // Mock login skips onboarding; real logins enter Onboarding first
        state.status = env.ENABLE_MOCK_LOGIN ? AuthStatus.Authenticated : AuthStatus.Onboarding;
        logger.log(`[auth] status → ${state.status} (login)`);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? ApiErrorType.Unknown;
        logger.warn('[auth] login rejected:', action.payload);
      })
      .addCase(completeOnboarding, state => {
        state.status = AuthStatus.Authenticated;
        logger.log('[auth] status → Authenticated (completeOnboarding)');
      })
      .addCase(logout.fulfilled, state => {
        resetAuthState(state);
        logger.log('[auth] status → Unauthenticated (logout)');
      })
      .addCase(logout.rejected, state => {
        resetAuthState(state);
        logger.warn('[auth] status → Unauthenticated (logout rejected)');
      });
  },
});

export const { tokenRefreshed } = authSlice.actions;
export const authBaseReducer = authSlice.reducer;

const authPersistConfig = {
  key: 'auth',
  storage: secureStoreAdapter,
  whitelist: ['jwt', 'decodedJwt', 'profile', 'status'],
};

export default persistReducer(authPersistConfig, authSlice.reducer);