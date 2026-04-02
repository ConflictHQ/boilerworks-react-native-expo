import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, GestureResponderEvent } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { DEFAULT_FADE_IN, DEFAULT_FADE_OUT } from '@/constants/animation';
import { BODY_FONT } from '@/constants/fonts';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';
import {
  StyledButton,
  StyledButtonText,
  IconContainer,
  ButtonContent,
} from './styled';
import type {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from '@/components/Button/types';
import UntitledUI from '@/components/Icons';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  iconSize: customIconSize,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  testID,
  hapticFeedback = true,
  textTransform = 'uppercase',
  ...rest
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const contentKey = loading ? 'button-content-loading' : 'button-content';

  const iconColor = useMemo(() => {
    if (disabled) {
      return theme.button.colors.disabled.text;
    }
    switch (variant) {
      case 'primary':
        return theme.button.colors.primary.text;
      case 'secondary':
        return theme.button.colors.secondary.text;
      case 'outline':
        return theme.button.colors.outline.text;
      case 'ghost':
      case 'ghost-no-spacing':
        return theme.button.colors.ghost.text;
      default:
        return theme.button.colors.primary.text;
    }
  }, [variant, disabled, theme.button.colors]);

  const iconSize = useMemo(() => {
    return customIconSize ?? theme.button.icon[size];
  }, [customIconSize, size, theme.button.icon]);

  const accessibilityLabelValue = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    if (typeof children === 'string') return children;
    return t('button.button');
  }, [accessibilityLabel, children, t]);

  const accessibilityStateValue = useMemo(
    () => ({
      disabled: disabled,
      busy: loading,
    }),
    [disabled, loading]
  );

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (hapticFeedback && !disabled && !loading) {
        impactAsync(ImpactFeedbackStyle.Light).catch(() => {});
      }
      onPress?.(event);
    },
    [hapticFeedback, disabled, loading, onPress]
  );

  return (
    <LayoutAnimationConfig skipEntering>
      <StyledButton
        $loading={loading}
        $variant={variant}
        $size={size}
        $disabled={disabled}
        $fullWidth={fullWidth}
        onPress={disabled || loading ? undefined : handlePress}
        activeOpacity={0.9}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabelValue}
        accessibilityHint={accessibilityHint}
        accessibilityState={accessibilityStateValue}
        testID={testID}
        {...rest}
      >
        <ButtonContent
          key={contentKey}
          entering={DEFAULT_FADE_IN}
          exiting={DEFAULT_FADE_OUT}
          $loading={loading}
          $fullWidth={fullWidth}
        >
          {loading ? (
            <ActivityIndicator
              color={iconColor}
              size="small"
              accessibilityLabel={t('button.loading')}
            />
          ) : (
            <>
              {leftIcon && (
                <IconContainer $position="left">
                  <UntitledUI
                    name={leftIcon}
                    size={iconSize}
                    color={iconColor}
                  />
                </IconContainer>
              )}
              {typeof children === 'string' ? (
                <StyledButtonText
                  family={BODY_FONT}
                  weight={'600'}
                  $variant={variant}
                  $size={size}
                  $disabled={disabled}
                  $fullWidth={fullWidth}
                  $textTransform={textTransform}
                >
                  {children}
                </StyledButtonText>
              ) : (
                children
              )}
              {rightIcon && (
                <IconContainer $position="right">
                  <UntitledUI
                    name={rightIcon}
                    size={iconSize}
                    color={iconColor}
                  />
                </IconContainer>
              )}
            </>
          )}
        </ButtonContent>
      </StyledButton>
    </LayoutAnimationConfig>
  );
};

export { ButtonVariant, ButtonSize };
export default Button;
