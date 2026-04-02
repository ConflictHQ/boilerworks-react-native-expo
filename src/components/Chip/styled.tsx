import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { ChipVariant, ChipSize } from './types';

interface StyledChipProps {
  variant: ChipVariant;
  size: ChipSize;
  disabled?: boolean;
  selected?: boolean;
}

const getBackgroundColor = ({ variant, disabled }: StyledChipProps) => {
  if (disabled) {
    return css`
      background-color: ${({ theme }) => theme.chip.colors.disabled.background};
    `;
  }

  switch (variant) {
    case 'primary':
      return css`
        background-color: ${({ theme }) =>
          theme.chip.colors.primary.background};
      `;
    case 'secondary':
      return css`
        background-color: ${({ theme }) =>
          theme.chip.colors.secondary.background};
      `;
  }
};

const getSizing = ({ size }: StyledChipProps) => css`
  border-radius: ${({ theme }) => theme.chip.spacing[size].radius}px;
  padding: ${({ theme }) => theme.chip.spacing[size].vertical}px
    ${({ theme }) => theme.chip.spacing[size].horizontal}px;
`;

export const StyledChip = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})<StyledChipProps>`
  ${props => getBackgroundColor(props)}
  ${props => getSizing(props)}
  align-items: center;
  justify-content: center;
  flex-direction: row;
  align-self: flex-start;
`;

export const IconContainer = styled.View<{ position: 'left' | 'right' }>`
  margin-left: ${({ position, theme }) =>
    position === 'right' ? theme.chip.spacing.icon : 0}px;
  margin-right: ${({ position, theme }) =>
    position === 'left' ? theme.chip.spacing.icon : 0}px;
`;
