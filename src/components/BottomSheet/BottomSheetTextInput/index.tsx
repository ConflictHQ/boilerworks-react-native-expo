import React, { useCallback, useMemo, useState } from 'react';
import { type FieldValues, useController, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { DEFAULT_FADE_IN, DEFAULT_FADE_OUT } from '@/constants/animation';
import Icons from '@/components/Icons';
import {
  ErrorText,
  ErrorMessageWrapper,
  Field,
  FocusOverlay,
  InputWrap,
  RightAccessory,
  RightAccessoryIcon,
  Title,
} from '@/components/Input';
import { useThemeValues } from '@/theme/hooks';
import { Input } from './styled';
import type { BottomSheetTextInputProps } from './types';

function BottomSheetTextInput<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  title,
  errorMessage,
  rightIcon,
  onRightIconPress,
  rightIconAccessibilityLabel,
  enablePasswordToggle,
  onFocus,
  secureTextEntry,
  ...textInputProps
}: BottomSheetTextInputProps<TFieldValues>) {
  const { t } = useTranslation();
  const theme = useThemeValues();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    field: { onBlur: fieldOnBlur, onChange: fieldOnChange, value: fieldValue },
    fieldState,
  } = useController<TFieldValues>({
    control,
    name,
    rules,
  });
  const { isSubmitted } = useFormState({ control });

  const isPasswordToggleActive = enablePasswordToggle === true;
  const accessoryIconName = useMemo(() => {
    if (isPasswordToggleActive) {
      return isPasswordVisible ? 'eye-off' : 'eye';
    }
    return rightIcon;
  }, [isPasswordToggleActive, isPasswordVisible, rightIcon]);

  const passwordSecureTextEntry = useMemo(() => {
    if (!isPasswordToggleActive) {
      return secureTextEntry;
    }
    return !isPasswordVisible;
  }, [isPasswordToggleActive, isPasswordVisible, secureTextEntry]);

  const message = errorMessage ?? fieldState.error?.message;
  const shouldShowError = typeof errorMessage === 'string' || isSubmitted;
  const translatedMessage =
    shouldShowError && typeof message === 'string' ? t(message) : undefined;
  const iconColor = translatedMessage
    ? theme.input.colors.iconError
    : theme.input.colors.icon;

  const rightAccessoryA11yLabel = useMemo(() => {
    if (rightIconAccessibilityLabel) return rightIconAccessibilityLabel;
    if (!isPasswordToggleActive) return undefined;
    return isPasswordVisible
      ? t('accessibilityGenerics.hidePassword')
      : t('accessibilityGenerics.showPassword');
  }, [
    isPasswordToggleActive,
    isPasswordVisible,
    rightIconAccessibilityLabel,
    t,
  ]);

  const handleFocus = useCallback(
    (event: Parameters<NonNullable<typeof onFocus>>[0]) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    fieldOnBlur();
  }, [fieldOnBlur]);

  const handleRightAccessoryPress = useCallback(() => {
    if (isPasswordToggleActive) {
      setIsPasswordVisible(!isPasswordVisible);
    }
    onRightIconPress?.();
  }, [isPasswordToggleActive, isPasswordVisible, onRightIconPress]);

  return (
    <LayoutAnimationConfig skipEntering>
      <Field>
        {!!title && <Title $hasError={!!translatedMessage}>{title}</Title>}
        <InputWrap>
          <Input
            {...textInputProps}
            value={fieldValue == null ? '' : String(fieldValue)}
            secureTextEntry={passwordSecureTextEntry}
            $hasRightAccessory={!!accessoryIconName}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={fieldOnChange}
            $hasError={!!translatedMessage}
          />
          {isFocused && (
            <FocusOverlay
              $hasError={!!translatedMessage}
              pointerEvents="none"
            />
          )}
          {!!accessoryIconName && (
            <RightAccessory
              accessibilityRole="button"
              accessibilityLabel={rightAccessoryA11yLabel}
              onPress={handleRightAccessoryPress}
            >
              <RightAccessoryIcon key={accessoryIconName}>
                <Icons name={accessoryIconName} size={20} color={iconColor} />
              </RightAccessoryIcon>
            </RightAccessory>
          )}
        </InputWrap>
        {!!translatedMessage && (
          <ErrorMessageWrapper
            key={translatedMessage}
            entering={DEFAULT_FADE_IN}
            exiting={DEFAULT_FADE_OUT}
          >
            <ErrorText>{translatedMessage}</ErrorText>
          </ErrorMessageWrapper>
        )}
      </Field>
    </LayoutAnimationConfig>
  );
}

export default BottomSheetTextInput;
