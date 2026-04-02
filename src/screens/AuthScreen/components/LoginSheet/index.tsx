import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { DEFAULT_FADE_IN, DEFAULT_FADE_OUT } from '@/constants/animation';
import { BODY_FONT } from '@/constants/fonts';
import BottomSheet, {
  BottomSheetTextInput,
  type BottomSheetRef,
} from '@/components/BottomSheet';
import Text from '@/components/Text';
import Button from '@/components/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login } from '@/store/auth';
import { selectAuthIsLoading } from '@/store/auth/selectors';
import { ApiErrorType } from '@/api/errors';
import {
  Header,
  Content,
  SubmitButtonWrapper,
  InputContainer,
  ForgotContainer,
  SignInContainer,
  ErrorText,
} from './styled';
import { loginRules, type LoginFormValues } from './validationSchema';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SNAP_POINTS = ['90%'];

const errorKeyMap: Record<ApiErrorType, string> = {
  [ApiErrorType.Unauthorized]: 'auth.login.errors.invalidCredentials',
  [ApiErrorType.NotFound]: 'auth.login.errors.invalidCredentials',
  [ApiErrorType.Validation]: 'auth.login.errors.invalidCredentials',
  [ApiErrorType.Timeout]: 'auth.login.errors.timeout',
  [ApiErrorType.NetworkError]: 'auth.login.errors.networkError',
  [ApiErrorType.ServerError]: 'auth.login.errors.serverError',
  [ApiErrorType.Unknown]: 'auth.login.errors.unknown',
};

type Props = {
  onForgotPassword?: (email: string) => void;
  onRegister?: () => void;
};

const LoginSheet = forwardRef<BottomSheetRef, Props>(
  ({ onForgotPassword, onRegister }, ref) => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectAuthIsLoading);
    const { control, handleSubmit } = useForm<LoginFormValues>({
      defaultValues: { email: '', password: '' },
      mode: 'onSubmit',
      reValidateMode: 'onBlur',
    });

    const [email, password] = useWatch({
      control,
      name: ['email', 'password'],
    });

    const isEmpty = !(email?.trim() && password?.trim());
    const isDisabled = isEmpty;

    const [skipSubmitButtonEntering, setSkipSubmitButtonEntering] =
      useState(true);
    useEffect(() => {
      setSkipSubmitButtonEntering(false);
    }, []);

    const [loginError, setLoginError] = useState<string | null>(null);

    const submitButtonKey = isDisabled ? 'submit-disabled' : 'submit-enabled';

    const handleValidSubmit = useCallback(
      async (values: LoginFormValues) => {
        setLoginError(null);
        const result = await dispatch(
          login({ email: values.email, password: values.password })
        );
        if (login.rejected.match(result)) {
          const errorType = result.payload ?? ApiErrorType.Unknown;
          setLoginError(t(errorKeyMap[errorType]));
        }
      },
      [dispatch, t]
    );

    const handleSubmitPress = useCallback(
      () => handleSubmit(handleValidSubmit)(),
      [handleSubmit, handleValidSubmit]
    );

    const onForgotPasswordPress = useCallback(() => {
      onForgotPassword?.(email?.trim() ?? '');
    }, [email, onForgotPassword]);

    const onRegisterPress = useCallback(() => {
      onRegister?.();
    }, [onRegister]);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={SNAP_POINTS}
        name="auth-login-sheet"
        title={t('auth.login.logIn')}
      >
        <Content bottomPadding={insets.bottom}>
          <Header>
            <Text family={BODY_FONT} size={14} weight="600">
              {t('auth.login.welcomeBack')}
            </Text>
          </Header>
          <InputContainer>
            <BottomSheetTextInput
              control={control}
              name="email"
              title={t('auth.login.fields.email.label')}
              accessibilityLabel={t('auth.login.fields.email.label')}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              rules={loginRules.email}
            />

            <BottomSheetTextInput
              control={control}
              name="password"
              title={t('auth.login.fields.password.label')}
              accessibilityLabel={t('auth.login.fields.password.label')}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              autoComplete="password"
              secureTextEntry
              enablePasswordToggle
              rules={loginRules.password}
            />
          </InputContainer>

          {loginError && (
            <ErrorText family={BODY_FONT} size={13} weight="400">
              {loginError}
            </ErrorText>
          )}

          <LayoutAnimationConfig skipEntering={skipSubmitButtonEntering}>
            <SubmitButtonWrapper
              key={submitButtonKey}
              entering={DEFAULT_FADE_IN}
              exiting={DEFAULT_FADE_OUT}
            >
              <Button
                fullWidth
                onPress={handleSubmitPress}
                disabled={isDisabled}
                loading={isLoading}
                rightIcon={'chevron-right'}
                accessibilityLabel={t('auth.login.logIn')}
              >
                {t('auth.login.logIn')}
              </Button>
            </SubmitButtonWrapper>
          </LayoutAnimationConfig>
          <ForgotContainer>
            <TouchableOpacity
              accessibilityLabel={t('auth.login.forgotPassword')}
              activeOpacity={0.7}
              onPress={onForgotPasswordPress}
            >
              <Text family={BODY_FONT} weight={'400'} size={14}>
                {t('auth.login.forgotPassword')}
              </Text>
            </TouchableOpacity>
          </ForgotContainer>
          <SignInContainer>
            <Button
              rightIcon={'chevron-right'}
              variant={'ghost'}
              onPress={onRegisterPress}
            >
              {t('auth.login.dontHaveAccount')}
            </Button>
          </SignInContainer>
        </Content>
      </BottomSheet>
    );
  }
);

LoginSheet.displayName = 'LoginSheet';

export default LoginSheet;
