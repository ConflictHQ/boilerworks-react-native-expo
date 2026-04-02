import React from 'react';
import { useTheme } from 'styled-components/native';
import { DEFAULT_FADE_IN, DEFAULT_FADE_OUT } from '@/constants/animation';
import { ACCENT_FONT } from '@/constants/fonts';
import Icons from '@/components/Icons';
import {
  CheckboxContainer,
  BackgroundHighlight,
  CheckboxTouchable,
  TextContainer,
  LabelText,
  DescriptionText,
  CheckboxIconContainer,
  CheckmarkContainer,
} from './styled';
import type {
  CheckboxProps,
  CheckboxVariant,
  CheckboxIconShape,
} from './types';

export { CheckboxVariant, CheckboxIconShape };

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  label,
  description,
  disabled = false,
  variant = 'default',
  iconShape = 'square',
  testID,
}) => {
  const theme = useTheme();

  return (
    <CheckboxContainer>
      {checked && (
        <BackgroundHighlight
          entering={DEFAULT_FADE_IN}
          exiting={DEFAULT_FADE_OUT}
          $checked={checked}
          $disabled={disabled}
          $variant={variant}
        />
      )}
      <CheckboxTouchable
        onPress={onToggle}
        disabled={disabled}
        activeOpacity={0.7}
        $checked={checked}
        $disabled={disabled}
        $variant={variant}
        $iconShape={iconShape}
        testID={testID}
      >
        <TextContainer>
          {label && (
            <LabelText
              family={ACCENT_FONT}
              weight={'800'}
              $checked={checked}
              $disabled={disabled}
              $variant={variant}
              $iconShape={iconShape}
            >
              {label}
            </LabelText>
          )}
          {description && (
            <DescriptionText
              $checked={checked}
              $disabled={disabled}
              $variant={variant}
              $iconShape={iconShape}
            >
              {description}
            </DescriptionText>
          )}
        </TextContainer>
        <CheckboxIconContainer
          $checked={checked}
          $disabled={disabled}
          $variant={variant}
          $iconShape={iconShape}
        >
          {checked && (
            <CheckmarkContainer
              entering={DEFAULT_FADE_IN}
              exiting={DEFAULT_FADE_OUT}
            >
              <Icons
                name="check"
                size={16}
                color={
                  disabled
                    ? theme.checkbox.colors.disabled.checkmark
                    : theme.checkbox.colors[variant].checkmark
                }
              />
            </CheckmarkContainer>
          )}
        </CheckboxIconContainer>
      </CheckboxTouchable>
    </CheckboxContainer>
  );
};

export default Checkbox;
