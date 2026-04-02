import type { RegisterOptions } from 'react-hook-form';

export type ForgotPasswordFormValues = {
  email: string;
};

export const forgotPasswordRules: {
  email: RegisterOptions<ForgotPasswordFormValues, 'email'>;
} = {
  email: {
    required: 'auth.login.validation.email.required',
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'auth.login.validation.email.invalid',
    },
  },
};
