import type { RegisterOptions } from 'react-hook-form';

export type RegisterFormValues = {
  email: string;
  password: string;
};

export const registerRules: {
  email: RegisterOptions<RegisterFormValues, 'email'>;
  password: RegisterOptions<RegisterFormValues, 'password'>;
} = {
  email: {
    required: 'auth.register.validation.email.required',
  },
  password: {
    required: 'auth.register.validation.password.required',
  },
};
