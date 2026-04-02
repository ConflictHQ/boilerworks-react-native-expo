import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/config';
import type { ApiError } from '@/api/models/ApiErrorResponse';
import type { UserResponse } from '@/api/models/users/UserResponse';
import type { CreateUserRequest } from '@/api/requests/users/CreateUserRequest';
import { login } from '@/store/auth';
import { logger } from '@/utils/logger';
import { extractApiErrors } from '@/store/utils';
import { SignupStatus, type SignupState } from './types';

const initialState: SignupState = {
  status: SignupStatus.Idle,
  isLoading: false,
  errors: null,
};

export const signup = createAsyncThunk<
  { user: UserResponse['data']; loginFailed: boolean },
  CreateUserRequest,
  { rejectValue: ApiError[] }
>(
  'signup/signup',
  async (
    { firstName = '', lastName = '', ...request },
    { dispatch, rejectWithValue }
  ) => {
    try {
      logger.log('[signup] attempting for', request.email);
      const { data } = await apiClient.post<UserResponse, CreateUserRequest>(
        API_ENDPOINTS.users.base,
        { firstName, lastName, ...request }
      );
      logger.log('[signup] success, user', data.data.id);

      try {
        await dispatch(
          login({ email: request.email, password: request.password })
        ).unwrap();
        return { user: data.data, loginFailed: false };
      } catch (loginError) {
        logger.warn(
          '[signup] auto-login failed after successful signup',
          loginError
        );
        return { user: data.data, loginFailed: true };
      }
    } catch (error) {
      const apiErrors = extractApiErrors(error);
      if (apiErrors) return rejectWithValue(apiErrors);
      throw error;
    }
  }
);

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    resetSignup: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(signup.pending, state => {
        state.isLoading = true;
        state.errors = null;
        logger.log('[signup] pending');
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.loginFailed
          ? SignupStatus.PartialSuccess
          : SignupStatus.Success;
        logger.log(
          '[signup] fulfilled, loginFailed:',
          action.payload.loginFailed
        );
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload ?? null;
        logger.warn(
          '[signup] rejected:',
          action.payload ?? action.error.message
        );
      });
  },
});

export const { resetSignup } = signupSlice.actions;
export default signupSlice.reducer;
