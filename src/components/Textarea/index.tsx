import React, { useCallback, useState } from 'react';
import { type FieldValues, useController, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { DEFAULT_FADE_IN, DEFAULT_FADE_OUT } from '@/constants/animation';
import { useThemeValues } from '@/theme/hooks';
import {
  ErrorText,
  ErrorMessageWrapper,
  Field,
  FocusOverlay,
  TextareaWrap,
  StyledTextarea,
  Title,
} from './styled';
import type { TextareaProps } from './types';
import { FocusEvent } from 'react-native';

function Textarea<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  title,
  errorMessage,
  onFocus,
  fullWidth,
  minHeight,
  ...textInputProps
}: TextareaProps<TFieldValues>) {
  const { t } = useTranslation();
  const theme = useThemeValues();
  const [isFocused, setIsFocused] = useState(false);

  const {
    field: { onBlur: fieldOnBlur, onChange: fieldOnChange, value: fieldValue },
    fieldState,
  } = useController<TFieldValues>({
    control,
    name,
    rules,
  });
  const { isSubmitted } = useFormState({ control });

  const handleFocus = useCallback(
    (event: FocusEvent) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    fieldOnBlur();
  }, [fieldOnBlur]);

  const handleChangeText = useCallback(
    (text: string) => {
      fieldOnChange(text);
    },
    [fieldOnChange]
  );

  const displayedErrorMessage =
    errorMessage || (fieldState.error && t(fieldState.error.message || ''));
  const hasError = Boolean(fieldState.error) || Boolean(errorMessage);
  const showError = (isSubmitted || fieldState.isTouched) && hasError;

  return (
    <Field $fullWidth={fullWidth}>
      {title && <Title $hasError={showError}>{title}</Title>}
      <TextareaWrap>
        {isFocused && <FocusOverlay $hasError={showError} />}
        <StyledTextarea
          value={fieldValue}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
          onFocus={handleFocus}
          $hasError={showError}
          $minHeight={minHeight}
          placeholderTextColor={theme.textarea.colors.placeholder}
          multiline
          {...textInputProps}
        />
      </TextareaWrap>
      <LayoutAnimationConfig skipEntering skipExiting>
        {showError && displayedErrorMessage && (
          <ErrorMessageWrapper
            entering={DEFAULT_FADE_IN}
            exiting={DEFAULT_FADE_OUT}
          >
            <ErrorText>{displayedErrorMessage}</ErrorText>
          </ErrorMessageWrapper>
        )}
      </LayoutAnimationConfig>
    </Field>
  );
}

export default Textarea;
