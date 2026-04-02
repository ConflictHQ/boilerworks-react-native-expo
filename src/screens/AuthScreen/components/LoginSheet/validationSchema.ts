import type { RegisterOptions } from 'react-hook-form';

export type LoginFormValues = {
  email: string;
  password: string;
};

export const loginRules: {
  email: RegisterOptions<LoginFormValues, 'email'>;
  password: RegisterOptions<LoginFormValues, 'password'>;
} = {
  email: {
    required: 'auth.login.validation.email.required',
  },
  password: {
    required: 'auth.login.validation.password.required',
  },
};
