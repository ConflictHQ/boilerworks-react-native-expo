import styled from 'styled-components/native';
import Text from '@/components/Text';
import PressableOpacity from '@/components/PressableOpacity';
import { ACCENT_FONT, BODY_FONT } from '@/constants/fonts';

export const HeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.dashboardHeader.padding}px;
  padding-vertical: ${({ theme }) => theme.dashboardHeader.padding}px;
`;

export const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  gap: ${({ theme }) => theme.dashboardHeader.spacing}px;
`;

export const TextSection = styled.View`
  flex: 1;
  justify-content: center;
`;

export const UserName = styled(Text).attrs({
  family: ACCENT_FONT,
  weight: '800',
})`
  line-height: ${({ theme }) => theme.dashboardHeader.userNameFontSize + 4}px;
  font-size: ${({ theme }) => theme.dashboardHeader.userNameFontSize}px;
  color: ${({ theme }) => theme.dashboardHeader.userNameColor};
`;

export const Subtitle = styled(Text).attrs({
  family: BODY_FONT,
  weight: '400',
})`
  line-height: ${({ theme }) => theme.dashboardHeader.subtitleFontSize + 4}px;
  font-size: ${({ theme }) => theme.dashboardHeader.subtitleFontSize}px;
  color: ${({ theme }) => theme.dashboardHeader.subtitleColor};
`;

export const RightSection = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.dashboardHeader.spacing}px;
`;

export const IconButton = styled(PressableOpacity).attrs({ hitSlop: 8 })`
  width: ${({ theme }) => theme.dashboardHeader.iconSize + 20}px;
  height: ${({ theme }) => theme.dashboardHeader.iconSize + 20}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.dashboardHeader.iconButtonBackground};
  border-radius: ${({ theme }) => theme.dashboardHeader.iconButtonRadius}px;
`;
