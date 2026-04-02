import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { DEFAULT_FADE_IN, DEFAULT_FADE_OUT } from '@/constants/animation';
import { BODY_FONT } from '@/constants/fonts';
import BottomSheet, {
  BottomSheetTextInput,
  type BottomSheetRef,
} from '@/components/BottomSheet';
import Text from '@/components/Text';
import Button from '@/components/Button';
import type { ApiError } from '@/api/models/ApiErrorResponse';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signup } from '@/store/signup';
import { selectSignupIsLoading } from '@/store/signup/selectors';
import {
  Header,
  Content,
  SubmitButtonWrapper,
  InputContainer,
  PrivacyContainer,
  PrivacyText,
  TermsLink,
  SignInContainer,
} from './styled';
import { registerRules, type RegisterFormValues } from './validationSchema';

const SNAP_POINTS = ['90%'];

type Props = {
  onSignIn?: () => void;
  onTermsPress?: () => void;
};

const RegisterSheet = forwardRef<BottomSheetRef, Props>(
  ({ onSignIn, onTermsPress }, ref) => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectSignupIsLoading);
    const { control, handleSubmit, setError } = useForm<RegisterFormValues>({
      defaultValues: { email: '', password: '' },
      mode: 'onSubmit',
      reValidateMode: 'onBlur',
    });

    const email = useWatch({ control, name: 'email' });
    const password = useWatch({ control, name: 'password' });
    const isDisabled = !(email?.trim() && password?.trim());

    const [skipSubmitButtonEntering, setSkipSubmitButtonEntering] =
      useState(true);
    useEffect(() => {
      setSkipSubmitButtonEntering(false);
    }, []);

    const [generalError, setGeneralError] = useState<string | null>(null);

    const submitButtonKey = isDisabled ? 'submit-disabled' : 'submit-enabled';

    const handleValidSubmit = useCallback(
      async (values: RegisterFormValues) => {
        setGeneralError(null);
        const result = await dispatch(
          signup({ email: values.email, password: values.password })
        );

        if (signup.fulfilled.match(result) && result.payload.loginFailed) {
          Alert.alert(
            t('auth.register.errors.autoLoginFailedTitle'),
            t('auth.register.errors.autoLoginFailedMessage'),
            [
              {
                text: t('auth.register.errors.autoLoginFailedCta'),
                onPress: () => onSignIn?.(),
              },
            ]
          );
          return;
        }

        if (!signup.rejected.match(result)) return;
        const errors = result.payload as ApiError[] | undefined;
        if (!errors?.length) {
          setGeneralError(t('auth.register.errors.signupFailed'));
          return;
        }

        let hasFieldError = false;
        for (const apiError of errors) {
          try {
            const detail = JSON.parse(apiError.detail ?? '{}') as {
              field?: keyof RegisterFormValues;
              reason?: string;
            };
            if (
              detail.field &&
              detail.field in { email: true, password: true }
            ) {
              setError(detail.field, {
                message: detail.reason ?? apiError.title,
              });
              hasFieldError = true;
            }
          } catch {
            // detail is not JSON — fall through to general error
          }
        }

        if (!hasFieldError) {
          setGeneralError(errors[0].title);
        }
      },
      [dispatch, onSignIn, setError, t]
    );

    const handleSubmitPress = useCallback(
      () => handleSubmit(handleValidSubmit)(),
      [handleSubmit, handleValidSubmit]
    );

    const handleSignInPress = useCallback(() => {
      onSignIn?.();
    }, [onSignIn]);

    const handleTermsPress = useCallback(() => {
      onTermsPress?.();
    }, [onTermsPress]);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={SNAP_POINTS}
        name="auth-register-sheet"
        title={t('auth.register.title')}
      >
        <Content bottomPadding={insets.bottom}>
          <Header>
            <Text family={BODY_FONT} size={14} weight="600">
              {t('auth.register.subtitle')}
            </Text>
            <Text family={BODY_FONT} size={14} weight="400">
              {t('auth.register.description')}
            </Text>
          </Header>
          <InputContainer>
            <BottomSheetTextInput
              control={control}
              name="email"
              title={t('auth.register.fields.email.label')}
              accessibilityLabel={t('auth.register.fields.email.label')}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              rules={registerRules.email}
            />

            <BottomSheetTextInput
              control={control}
              name="password"
              title={t('auth.register.fields.password.label')}
              accessibilityLabel={t('auth.register.fields.password.label')}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="newPassword"
              autoComplete="new-password"
              secureTextEntry
              enablePasswordToggle
              rules={registerRules.password}
            />
          </InputContainer>

          {generalError && (
            <Text family={BODY_FONT} size={13} weight="400">
              {generalError}
            </Text>
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
                accessibilityLabel={t('auth.register.createAccount')}
              >
                {t('auth.register.createAccount')}
              </Button>
            </SubmitButtonWrapper>
          </LayoutAnimationConfig>

          <PrivacyContainer>
            <PrivacyText family={BODY_FONT} size={14} weight="400">
              {t('auth.register.privacyText')}{' '}
              <TermsLink
                family={BODY_FONT}
                size={14}
                weight="400"
                onPress={handleTermsPress}
                accessibilityRole="link"
              >
                {t('auth.register.termsOfUse')}
              </TermsLink>
            </PrivacyText>
          </PrivacyContainer>

          <SignInContainer>
            <Button
              rightIcon={'chevron-right'}
              variant={'ghost'}
              onPress={handleSignInPress}
            >
              {t('auth.register.haveAccount')}
            </Button>
          </SignInContainer>

        </Content>
      </BottomSheet>
    );
  }
);

RegisterSheet.displayName = 'RegisterSheet';

export default RegisterSheet;
