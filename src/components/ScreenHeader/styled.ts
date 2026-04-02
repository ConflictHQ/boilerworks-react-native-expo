import styled from 'styled-components/native';
import PressableOpacity from '@/components/PressableOpacity';
import Text from '@/components/Text';
import { BODY_FONT } from '@/constants/fonts';

export const HeaderContainer = styled.View<{ $topInset: number }>`
  background-color: ${({ theme }) => theme.screenHeader.backgroundColor};
  padding-top: ${({ $topInset, theme }) =>
    $topInset + theme.screenHeader.spacing.vertical}px;
  padding-bottom: ${({ theme }) => theme.screenHeader.spacing.vertical}px;
  padding-horizontal: ${({ theme }) => theme.screenHeader.spacing.horizontal}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled(PressableOpacity)`
  width: ${({ theme }) => theme.screenHeader.backButtonSize}px;
  height: ${({ theme }) => theme.screenHeader.backButtonSize}px;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.screenHeader.spacing.gap}px;
`;

export const Title = styled(Text).attrs({
  family: BODY_FONT,
  weight: '600',
  size: 16,
})`
  color: ${({ theme }) => theme.screenHeader.titleColor};
  flex: 1;
`;

export const RightSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${({ theme }) => theme.screenHeader.spacing.gap}px;
`;
