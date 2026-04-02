import styled, { css } from 'styled-components/native';
import type { MessageCardColorVariant, MessageCardSize } from './types';
import Text from '@/components/Text';
import { TouchableOpacity } from 'react-native-gesture-handler';

type CardProps = {
  $colorVariant: MessageCardColorVariant;
  $size: MessageCardSize;
};

const getBackground = ({ $colorVariant }: CardProps) => css`
  background-color: ${({ theme }) =>
    theme.messageCard.colors[$colorVariant].background};
`;

const getSizing = ({ $size }: CardProps) => css`
  border-radius: ${({ theme }) => theme.messageCard.spacing[$size].radius}px;
  padding: ${({ theme }) => theme.messageCard.spacing[$size].paddingVertical}px
    ${({ theme }) => theme.messageCard.spacing[$size].paddingHorizontal}px;
`;

export const Card = styled.View<CardProps>`
  ${props => getBackground(props)}
  ${props => getSizing(props)}
`;

export const CloseButton = styled(TouchableOpacity)<{
  $size: MessageCardSize;
}>``;

export const Content = styled.View`
  width: 100%;
`;

export const TitleRow = styled.View`
  flex-direction: row;
`;
export const TitleText = styled(Text)<{
  $colorVariant: MessageCardColorVariant;
  $size: MessageCardSize;
  $hasClose: boolean;
}>`
  flex: 1;
  color: ${({ theme, $colorVariant }) =>
    theme.messageCard.colors[$colorVariant].title};
  font-size: ${({ theme, $size }) =>
    theme.messageCard.typography.title[$size]}px;
  padding-right: ${({ theme, $size, $hasClose }) =>
    $hasClose ? theme.messageCard.icon.close[$size] + 8 : 0}px;
`;

export const BodyText = styled(Text)<{
  $colorVariant: MessageCardColorVariant;
  $size: MessageCardSize;
}>`
  color: ${({ theme, $colorVariant }) =>
    theme.messageCard.colors[$colorVariant].body};
  font-size: ${({ theme, $size }) =>
    theme.messageCard.typography.body[$size]}px;
  letter-spacing: -0.5px;
  margin-top: ${({ theme }) => theme.messageCard.spacing.gap}px;
`;
