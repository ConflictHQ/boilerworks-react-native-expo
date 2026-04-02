import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { DEFAULT_FADE_IN, DEFAULT_FADE_OUT } from '@/constants/animation';
import BottomSheet, {
  BottomSheetTextInput,
  type BottomSheetRef,
} from '@/components/BottomSheet';
import Button from '@/components/Button';
import {
  Content,
  Header,
  InfoText,
  InputContainer,
  SubmittedInfoContainer,
  SubmitButtonWrapper,
} from './styled';
import {
  forgotPasswordRules,
  type ForgotPasswordFormValues,
} from './validationSchema';

const SNAP_POINTS = ['90%'];

type Props = {
  initialEmail?: string;
};

const ForgotPasswordSheet = forwardRef<BottomSheetRef, Props>(
  ({ initialEmail }, ref) => {
    const { t } = useTranslation();
    const {
      control,
      handleSubmit,
      formState: { isSubmitting },
      setValue,
      clearErrors,
    } = useForm<ForgotPasswordFormValues>({
      defaultValues: { email: initialEmail ?? '' },
      mode: 'onSubmit',
      reValidateMode: 'onBlur',
    });

    const email = useWatch({ control, name: 'email' });
    const isDisabled = !email?.trim();

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState<string>('');

    useEffect(() => {
      setValue('email', initialEmail ?? '');
      clearErrors('email');
      setHasSubmitted(false);
      setSubmittedEmail('');
    }, [clearErrors, initialEmail, setValue]);

    const submitButtonKey = isDisabled ? 'submit-disabled' : 'submit-enabled';

    const handleValidSubmit = useCallback(
      (values: ForgotPasswordFormValues) => {
        // TODO: wire submit action (e.g. send reset link) from parent.
        setHasSubmitted(true);
        setSubmittedEmail(values.email.trim());
      },
      []
    );

    const handleSubmitPress = useCallback(
      () => handleSubmit(handleValidSubmit)(),
      [handleSubmit, handleValidSubmit]
    );

    const handleSheetChanges = useCallback((index: number) => {
      if (index === -1) {
        setHasSubmitted(false);
        setSubmittedEmail('');
      }
    }, []);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={SNAP_POINTS}
        name="auth-forgot-password-sheet"
        title={t('auth.login.forgotPassword')}
        handleSheetChanges={handleSheetChanges}
      >
        <Content>
          <Header>
            <InfoText weight="600">{t('auth.forgotPassword.intro')}</InfoText>
            {hasSubmitted && !!submittedEmail && (
              <SubmittedInfoContainer>
                <InfoText weight="400">
                  <Trans
                    i18nKey="auth.forgotPassword.confirmation"
                    values={{ email: submittedEmail }}
                    components={{
                      email: <InfoText decoration={'underline'} weight="400" />,
                    }}
                  />
                </InfoText>
              </SubmittedInfoContainer>
            )}
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
              rules={forgotPasswordRules.email}
            />
          </InputContainer>

          <LayoutAnimationConfig skipEntering>
            <SubmitButtonWrapper
              key={submitButtonKey}
              entering={DEFAULT_FADE_IN}
              exiting={DEFAULT_FADE_OUT}
            >
              <Button
                fullWidth
                onPress={handleSubmitPress}
                disabled={isDisabled}
                loading={isSubmitting}
                rightIcon={'chevron-right'}
                accessibilityLabel={t('common.next')}
              >
                {t('common.next')}
              </Button>
            </SubmitButtonWrapper>
          </LayoutAnimationConfig>
        </Content>
      </BottomSheet>
    );
  }
);

ForgotPasswordSheet.displayName = 'ForgotPasswordSheet';

export default ForgotPasswordSheet;
