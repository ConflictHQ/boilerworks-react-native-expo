import React, { useCallback, useMemo } from 'react';
import { useTheme } from 'styled-components/native';
import * as Haptics from 'expo-haptics';
import { BODY_FONT } from '@/constants/fonts';
import { StyledChip, IconContainer } from './styled';
import type { ChipProps, ChipSize, ChipVariant } from '@/components/Chip/types';
import UntitledUI from '@/components/Icons';
import Text from '@/components/Text';
import { GestureResponderEvent } from 'react-native';

const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  selected = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  testID,
  ...rest
}) => {
  const theme = useTheme();

  const color = useMemo(() => {
    if (disabled) {
      return theme.chip.colors.disabled.text;
    }
    switch (variant) {
      case 'primary':
        return theme.chip.colors.primary.text;
      case 'secondary':
        return theme.chip.colors.secondary.text;
      default:
        return theme.chip.colors.primary.text;
    }
  }, [variant, disabled, theme.chip.colors]);

  const iconSize = useMemo(() => {
    return theme.chip.icon[size];
  }, [size, theme.chip.icon]);

  const textSize = useMemo(() => {
    return theme.chip.typography[size];
  }, [size, theme.chip.typography]);

  const accessibilityLabelValue = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    if (typeof children === 'string') return children;
    return 'Chip';
  }, [accessibilityLabel, children]);

  const accessibilityStateValue = useMemo(
    () => ({
      disabled: disabled,
      selected: selected,
    }),
    [disabled, selected]
  );

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (!disabled) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      }
      onPress?.(event);
    },
    [disabled, onPress]
  );

  return (
    <StyledChip
      variant={variant}
      size={size}
      disabled={disabled}
      selected={selected}
      onPress={disabled ? undefined : handlePress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabelValue}
      accessibilityHint={accessibilityHint}
      accessibilityState={accessibilityStateValue}
      testID={testID}
      {...rest}
    >
      {leftIcon && (
        <IconContainer position="left">
          <UntitledUI name={leftIcon} size={iconSize} color={color} />
        </IconContainer>
      )}
      <Text
        align={'center'}
        family={BODY_FONT}
        weight={'600'}
        variant="regular"
        size={textSize}
        transform={'uppercase'}
        color={color}
      >
        {children}
      </Text>
      {rightIcon && (
        <IconContainer position="right">
          <UntitledUI
            name={rightIcon}
            size={iconSize}
            color={color}
            onPress={onRightIconPress}
          />
        </IconContainer>
      )}
    </StyledChip>
  );
};

export { ChipVariant, ChipSize };
export default Chip;
