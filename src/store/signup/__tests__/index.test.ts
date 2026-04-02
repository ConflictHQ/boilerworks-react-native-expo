import { configureStore } from '@reduxjs/toolkit';
import signupReducer, { signup, resetSignup } from '../index';
import { SignupStatus } from '../types';
import type { SignupState } from '../types';
import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/config';
import { login } from '@/store/auth';
import type { ApiError } from '@/api/models/ApiErrorResponse';
import type { CreateUserRequest } from '@/api/requests/users/CreateUserRequest';

jest.mock('@/api/client');
jest.mock('@/store/auth');
jest.mock('@/utils/logger');

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const MOCK_USER_ID = 'user-abc-123';

const MOCK_USER_DATA = {
  type: 'users' as const,
  id: MOCK_USER_ID,
  attributes: {
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    fullName: 'Jane Doe',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
};

const POST_USER_RESPONSE = { data: { data: MOCK_USER_DATA } };

const MOCK_API_ERRORS: ApiError[] = [
  {
    status: '422',
    code: 'validation_error',
    title: 'Validation Error',
    detail: 'Email has already been taken',
  },
];

const makeAxiosApiError = (errors: ApiError[]) =>
  Object.assign(new Error('Unprocessable Entity'), {
    isAxiosError: true,
    response: { status: 422, data: { errors } },
  });

const makeAxiosNonApiError = () =>
  Object.assign(new Error('Network Error'), {
    isAxiosError: true,
    response: undefined,
    code: 'ERR_NETWORK',
  });

const FULL_REQUEST: CreateUserRequest = {
  email: 'jane@example.com',
  password: 'secret123',
  firstName: 'Jane',
  lastName: 'Doe',
};

const MINIMAL_REQUEST: CreateUserRequest = {
  email: 'jane@example.com',
  password: 'secret123',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const initialState: SignupState = {
  status: SignupStatus.Idle,
  isLoading: false,
  errors: null,
};

const makeStore = () => configureStore({ reducer: { signup: signupReducer } });

/**
 * Returns a mock thunk that, when dispatched, resolves to a Promise
 * augmented with `.unwrap()` — matching RTK's actual dispatch return shape.
 */
const makeLoginDispatchResult = (resolves: boolean) =>
  jest.fn().mockReturnValue(
    Object.assign(Promise.resolve({}), {
      unwrap: resolves
        ? () => Promise.resolve({})
        : () => Promise.reject(new Error('login failed')),
    })
  );

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('signup reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(login).mockReturnValue(makeLoginDispatchResult(true) as never);
  });

  describe('initial state', () => {
    it('should return initial state', () => {
      expect(signupReducer(undefined, { type: 'unknown' })).toEqual(
        initialState
      );
    });
  });

  describe('resetSignup', () => {
    it('should reset from loading state', () => {
      const state = signupReducer(
        { ...initialState, isLoading: true },
        resetSignup()
      );
      expect(state).toEqual(initialState);
    });

    it('should reset from Success state with errors', () => {
      const doneState: SignupState = {
        status: SignupStatus.Success,
        isLoading: false,
        errors: MOCK_API_ERRORS,
      };
      expect(signupReducer(doneState, resetSignup())).toEqual(initialState);
    });

    it('should reset from PartialSuccess state', () => {
      const partialState: SignupState = {
        status: SignupStatus.PartialSuccess,
        isLoading: false,
        errors: null,
      };
      expect(signupReducer(partialState, resetSignup())).toEqual(initialState);
    });
  });

  describe('signup thunk — reducer state transitions', () => {
    it('signup.pending — sets isLoading=true and clears prior errors', () => {
      const stateWithErrors: SignupState = {
        ...initialState,
        errors: MOCK_API_ERRORS,
      };
      const action = signup.pending('', FULL_REQUEST);
      const state = signupReducer(stateWithErrors, action);
      expect(state.isLoading).toBe(true);
      expect(state.errors).toBeNull();
      expect(state.status).toBe(SignupStatus.Idle);
    });

    it('signup.fulfilled with loginFailed=false — isLoading=false, status=Success', () => {
      const action = signup.fulfilled(
        { user: MOCK_USER_DATA, loginFailed: false },
        '',
        FULL_REQUEST
      );
      const state = signupReducer({ ...initialState, isLoading: true }, action);
      expect(state.isLoading).toBe(false);
      expect(state.status).toBe(SignupStatus.Success);
    });

    it('signup.fulfilled — does not clear prior errors', () => {
      const stateWithErrors: SignupState = {
        ...initialState,
        isLoading: true,
        errors: MOCK_API_ERRORS,
      };
      const action = signup.fulfilled(
        { user: MOCK_USER_DATA, loginFailed: false },
        '',
        FULL_REQUEST
      );
      const state = signupReducer(stateWithErrors, action);
      expect(state.errors).toEqual(MOCK_API_ERRORS);
    });

    it('signup.fulfilled with loginFailed=true — isLoading=false, status=PartialSuccess', () => {
      const action = signup.fulfilled(
        { user: MOCK_USER_DATA, loginFailed: true },
        '',
        FULL_REQUEST
      );
      const state = signupReducer({ ...initialState, isLoading: true }, action);
      expect(state.isLoading).toBe(false);
      expect(state.status).toBe(SignupStatus.PartialSuccess);
    });

    it('signup.rejected with payload — isLoading=false, errors set to payload, status unchanged', () => {
      const action = signup.rejected(null, '', FULL_REQUEST, MOCK_API_ERRORS);
      const state = signupReducer({ ...initialState, isLoading: true }, action);
      expect(state.isLoading).toBe(false);
      expect(state.errors).toEqual(MOCK_API_ERRORS);
      expect(state.status).toBe(SignupStatus.Idle);
    });

    it('signup.rejected without payload — isLoading=false, errors=null', () => {
      const action = signup.rejected(
        new Error('unexpected'),
        '',
        FULL_REQUEST,
        undefined
      );
      const state = signupReducer({ ...initialState, isLoading: true }, action);
      expect(state.isLoading).toBe(false);
      expect(state.errors).toBeNull();
    });
  });

  describe('signup thunk — behaviour', () => {
    it('calls apiClient.post with the users endpoint and correct body', async () => {
      jest.mocked(apiClient.post).mockResolvedValue(POST_USER_RESPONSE);
      const store = makeStore();
      await store.dispatch(signup(FULL_REQUEST));
      expect(apiClient.post).toHaveBeenCalledWith(
        API_ENDPOINTS.users.base,
        expect.objectContaining({
          email: FULL_REQUEST.email,
          password: FULL_REQUEST.password,
          firstName: 'Jane',
          lastName: 'Doe',
        })
      );
    });

    it('defaults firstName and lastName to empty strings when omitted', async () => {
      jest.mocked(apiClient.post).mockResolvedValue(POST_USER_RESPONSE);
      const store = makeStore();
      await store.dispatch(signup(MINIMAL_REQUEST));
      expect(apiClient.post).toHaveBeenCalledWith(
        API_ENDPOINTS.users.base,
        expect.objectContaining({ firstName: '', lastName: '' })
      );
    });

    it('dispatches login with email and password after successful post', async () => {
      jest.mocked(apiClient.post).mockResolvedValue(POST_USER_RESPONSE);
      const store = makeStore();
      await store.dispatch(signup(FULL_REQUEST));
      expect(login).toHaveBeenCalledWith({
        email: FULL_REQUEST.email,
        password: FULL_REQUEST.password,
      });
    });

    it('returns { user, loginFailed: false } and sets status=Success when both post and login succeed', async () => {
      jest.mocked(apiClient.post).mockResolvedValue(POST_USER_RESPONSE);
      const store = makeStore();
      const result = await store.dispatch(signup(FULL_REQUEST));
      expect(signup.fulfilled.match(result)).toBe(true);
      if (signup.fulfilled.match(result)) {
        expect(result.payload.loginFailed).toBe(false);
        expect(result.payload.user).toEqual(MOCK_USER_DATA);
      }
      expect(store.getState().signup.status).toBe(SignupStatus.Success);
    });

    it('returns { user, loginFailed: true } and sets status=PartialSuccess when post succeeds but login fails', async () => {
      jest.mocked(apiClient.post).mockResolvedValue(POST_USER_RESPONSE);
      jest
        .mocked(login)
        .mockReturnValue(makeLoginDispatchResult(false) as never);
      const store = makeStore();
      const result = await store.dispatch(signup(FULL_REQUEST));
      expect(signup.fulfilled.match(result)).toBe(true);
      if (signup.fulfilled.match(result)) {
        expect(result.payload.loginFailed).toBe(true);
        expect(result.payload.user).toEqual(MOCK_USER_DATA);
      }
      expect(store.getState().signup.status).toBe(SignupStatus.PartialSuccess);
      expect(store.getState().signup.errors).toBeNull();
    });

    it('rejects with extracted API errors when apiClient.post fails with an API error response', async () => {
      jest
        .mocked(apiClient.post)
        .mockRejectedValue(makeAxiosApiError(MOCK_API_ERRORS));
      const store = makeStore();
      const result = await store.dispatch(signup(FULL_REQUEST));
      expect(signup.rejected.match(result)).toBe(true);
      if (signup.rejected.match(result)) {
        expect(result.payload).toEqual(MOCK_API_ERRORS);
      }
      expect(store.getState().signup.errors).toEqual(MOCK_API_ERRORS);
      expect(store.getState().signup.isLoading).toBe(false);
    });

    it('re-throws non-API errors so the thunk rejects without a payload', async () => {
      jest.mocked(apiClient.post).mockRejectedValue(makeAxiosNonApiError());
      const store = makeStore();
      const result = await store.dispatch(signup(FULL_REQUEST));
      expect(signup.rejected.match(result)).toBe(true);
      if (signup.rejected.match(result)) {
        expect(result.payload).toBeUndefined();
        expect(result.error.message).toBe('Network Error');
      }
      expect(store.getState().signup.errors).toBeNull();
      expect(store.getState().signup.isLoading).toBe(false);
    });
  });
});
