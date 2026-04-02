import styled, { css } from 'styled-components/native';
import Animated from 'react-native-reanimated';
import type { CardVariant } from './types';

interface StyledCardProps {
  $variant: CardVariant;
}

const getCardStyles = ({ $variant }: StyledCardProps) => {
  switch ($variant) {
    case 'default':
      return css`
        background-color: ${({ theme }) =>
          theme.card.colors.default.background};
        border-radius: ${({ theme }) => theme.card.spacing.borderRadius}px;
        padding-top: ${({ theme }) => theme.card.spacing.paddingVertical}px;
        padding-bottom: ${({ theme }) => theme.card.spacing.paddingVertical}px;
        padding-left: ${({ theme }) => theme.card.spacing.paddingHorizontal}px;
        padding-right: ${({ theme }) => theme.card.spacing.paddingHorizontal}px;
        gap: ${({ theme }) => theme.card.spacing.gap}px;
      `;
    case 'smallPadding':
      return css`
        background-color: ${({ theme }) =>
          theme.card.colors.default.background};
        border-radius: ${({ theme }) => theme.card.spacing.borderRadius}px;
        padding: 8px;
        gap: ${({ theme }) => theme.card.spacing.gap}px;
      `;
    case 'outline':
      return css`
        background-color: ${({ theme }) =>
          theme.card.colors.outline.background};
        border-radius: ${({ theme }) => theme.card.spacing.borderRadius}px;
        border-width: 1px;
        border-color: ${({ theme }) => theme.card.colors.outline.borderColor};
        padding-top: ${({ theme }) => theme.card.spacing.paddingVertical}px;
        padding-bottom: ${({ theme }) => theme.card.spacing.paddingVertical}px;
        padding-left: ${({ theme }) => theme.card.spacing.paddingHorizontal}px;
        padding-right: ${({ theme }) => theme.card.spacing.paddingHorizontal}px;
        gap: ${({ theme }) => theme.card.spacing.gap}px;
      `;
    default:
      return css``;
  }
};

export const StyledCard = styled(Animated.View)<StyledCardProps>`
  ${props => getCardStyles(props)}
`;
