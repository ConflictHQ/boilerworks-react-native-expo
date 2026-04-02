import styled, { css } from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { CheckboxVariant, CheckboxIconShape } from './types';
import Text, { TextProps } from '@/components/Text';
import { BODY_FONT } from '@/constants/fonts';
import { Theme } from '@/theme/types';

interface StyledCheckboxProps extends TextProps {
  $checked: boolean;
  $disabled?: boolean;
  $variant: CheckboxVariant;
  $iconShape?: CheckboxIconShape;
}

const getColorConfig = ({
  $checked,
  $disabled,
  $variant,
  theme,
}: StyledCheckboxProps & { theme: Theme }) => {
  if ($disabled) {
    return theme.checkbox.colors.disabled;
  }
  return theme.checkbox.colors[$variant];
};

export const CheckboxContainer = styled.View`
  position: relative;
`;

export const BackgroundHighlight = styled(Animated.View)<StyledCheckboxProps>`
  position: absolute;
  top: -${({ theme }) => theme.checkbox.spacing.highlightOffset}px;
  left: -${({ theme }) => theme.checkbox.spacing.highlightOffset}px;
  right: -${({ theme }) => theme.checkbox.spacing.highlightOffset}px;
  bottom: -${({ theme }) => theme.checkbox.spacing.highlightOffset}px;
  border-radius: ${({ theme }) => theme.checkbox.spacing.highlightRadius}px;
  background-color: ${({ theme, $checked, $disabled, $variant }) => {
    const colors = getColorConfig({ $checked, $disabled, $variant, theme });
    return colors.highlight;
  }};
`;

export const CheckboxTouchable = styled(TouchableOpacity)<StyledCheckboxProps>`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.checkbox.spacing.paddingVertical}px;
  padding-horizontal: ${({ theme }) =>
    theme.checkbox.spacing.paddingHorizontal}px;
  border-radius: ${({ theme }) => theme.checkbox.spacing.borderRadius}px;
  border-width: 1px;

  ${({ theme, $checked, $disabled, $variant }) => {
    const colors = getColorConfig({ $checked, $disabled, $variant, theme });
    return css`
      background-color: ${$checked
        ? colors.backgroundChecked
        : colors.background};
      border-color: ${$checked ? colors.borderChecked : colors.border};
    `;
  }}
`;

export const TextContainer = styled.View`
  flex: 1;
`;

export const LabelText = styled(Text).attrs({
  family: BODY_FONT,
})<StyledCheckboxProps>`
  font-size: ${({ theme }) => theme.checkbox.typography.labelSize}px;
  margin-bottom: 4px;

  ${({ theme, $checked, $disabled, $variant }) => {
    const colors = getColorConfig({ $checked, $disabled, $variant, theme });
    return css`
      color: ${$checked ? colors.textChecked : colors.text};
    `;
  }}
`;

export const DescriptionText = styled(Text).attrs({
  family: BODY_FONT,
})<StyledCheckboxProps>`
  font-size: ${({ theme }) => theme.checkbox.typography.descriptionSize}px;
  margin-top: ${({ theme }) =>
    theme.checkbox.typography.descriptionMarginTop}px;

  ${({ theme, $checked, $disabled, $variant }) => {
    const colors = getColorConfig({ $checked, $disabled, $variant, theme });
    return css`
      color: ${$checked ? colors.descriptionChecked : colors.description};
    `;
  }}
`;

export const CheckboxIconContainer = styled.View<StyledCheckboxProps>`
  width: ${({ theme }) => theme.checkbox.spacing.checkboxSize}px;
  height: ${({ theme }) => theme.checkbox.spacing.checkboxSize}px;
  border-radius: ${({ theme, $iconShape }) =>
    $iconShape === 'square'
      ? theme.checkbox.spacing.checkboxBorderRadiusSquare
      : theme.checkbox.spacing.checkboxBorderRadiusRounded}px;
  border-width: ${({ theme }) => theme.checkbox.spacing.checkboxBorderWidth}px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;

  ${({ theme, $checked, $disabled, $variant }) => {
    const colors = getColorConfig({ $checked, $disabled, $variant, theme });
    return css`
      border-color: ${$checked ? colors.borderChecked : colors.border};
    `;
  }}
`;

export const CheckmarkContainer = styled(Animated.View)``;
