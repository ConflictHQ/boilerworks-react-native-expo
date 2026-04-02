import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import type { ButtonVariant, ButtonSize } from './types';
import Text from '@/components/Text';

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $disabled?: boolean;
  $fullWidth?: boolean;
  $loading?: boolean;
}

const getBackgroundColor = ({ $variant, $disabled }: StyledButtonProps) => {
  if ($disabled) {
    return css`
      background-color: ${({ theme }) =>
        theme.button.colors.disabled.background};
    `;
  }

  switch ($variant) {
    case 'primary':
      return css`
        background-color: ${({ theme }) =>
          theme.button.colors.primary.background};
      `;
    case 'secondary':
      return css`
        background-color: ${({ theme }) =>
          theme.button.colors.secondary.background};
      `;
    case 'outline':
    case 'ghost':
    case 'ghost-no-spacing':
      return css`
        background-color: transparent;
      `;
  }
};

const getBorderStyle = ({ $variant }: StyledButtonProps) => {
  if ($variant === 'outline') {
    return css`
      border-width: 1px;
      border-color: ${({ theme }) => theme.button.colors.outline.border};
    `;
  }
  return css`
    border-width: 0;
  `;
};

const getPadding = ({ $size, $variant }: StyledButtonProps) => {
  if ($variant === 'ghost-no-spacing') {
    return css`
      border-radius: 0px;
      padding: 0px;
    `;
  }

  switch ($size) {
    case 'extra-small':
      return css`
        border-radius: ${({ theme }) =>
          theme.button.spacing['extra-small'].radius}px;
        padding: ${({ theme }) =>
          `${theme.button.spacing['extra-small'].vertical}px ${theme.button.spacing['extra-small'].horizontal}px`};
      `;
    case 'small':
      return css`
        border-radius: ${({ theme }) => theme.button.spacing.small.radius}px;
        padding: ${({ theme }) => theme.button.spacing.small.vertical}px
          ${({ theme }) => theme.button.spacing.small.horizontal}px;
      `;
    case 'medium':
      return css`
        border-radius: ${({ theme }) => theme.button.spacing.medium.radius}px;

        padding: ${({ theme }) => theme.button.spacing.medium.vertical}px
          ${({ theme }) => theme.button.spacing.medium.horizontal}px;
      `;
    case 'large':
      return css`
        border-radius: ${({ theme }) => theme.button.spacing.large.radius}px;

        padding: ${({ theme }) => theme.button.spacing.large.vertical}px
          ${({ theme }) => theme.button.spacing.large.horizontal}px;
      `;
  }
};

export const StyledButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<StyledButtonProps>`
  ${props => getBackgroundColor(props)}
  ${props => getBorderStyle(props)}
  ${props => getPadding(props)}
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
  align-items: center;
  justify-content: ${({ $loading }) => ($loading ? 'center' : 'space-between')};
  flex-direction: row;
`;

export const ButtonContent = styled(Animated.View)<{
  $loading?: boolean;
  $fullWidth?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: ${({ $loading }) => ($loading ? 'center' : 'stretch')};
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;

interface StyledButtonTextProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth?: boolean;
  $disabled?: boolean;
  $textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

const getTextColor = ({ $variant, $disabled }: StyledButtonTextProps) => {
  if ($disabled) {
    return css`
      color: ${({ theme }) => theme.button.colors.disabled.text};
    `;
  }

  switch ($variant) {
    case 'primary':
      return css`
        color: ${({ theme }) => theme.button.colors.primary.text};
      `;
    case 'secondary':
      return css`
        color: ${({ theme }) => theme.button.colors.secondary.text};
      `;
    case 'outline':
      return css`
        color: ${({ theme }) => theme.button.colors.outline.text};
      `;
    case 'ghost':
    case 'ghost-no-spacing':
      return css`
        color: ${({ theme }) => theme.button.colors.ghost.text};
      `;
  }
};

const getTextSize = ({ $size }: StyledButtonTextProps) => {
  switch ($size) {
    case 'extra-small':
      return css`
        font-size: ${({ theme }) => theme.button.typography['extra-small']}px;
      `;
    case 'small':
      return css`
        font-size: ${({ theme }) => theme.button.typography.small}px;
      `;
    case 'medium':
      return css`
        font-size: ${({ theme }) => theme.button.typography.medium}px;
      `;
    case 'large':
      return css`
        font-size: ${({ theme }) => theme.button.typography.large}px;
      `;
  }
};

export const StyledButtonText = styled(Text)<StyledButtonTextProps>`
  ${props => getTextColor(props)}
  ${props => getTextSize(props)}
  font-weight: ${({ theme }) => theme.button.typography.weight};
  text-transform: ${({ $textTransform }) => $textTransform || 'uppercase'};
  align-self: stretch;
  ${({ $fullWidth }) => ($fullWidth ? `flex:1;` : '')};
`;

export const IconContainer = styled.View<{ $position: 'left' | 'right' }>`
  margin-left: ${({ $position, theme }) =>
    $position === 'right' ? theme.button.spacing.icon : 0}px;
  margin-right: ${({ $position, theme }) =>
    $position === 'left' ? theme.button.spacing.icon : 0}px;
`;
