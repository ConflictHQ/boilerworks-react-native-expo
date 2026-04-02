import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import Container from '@/components/Container';
import { WRAPPER_SPACING } from '@/constants/ui';
import { DEFAULT_LAYOUT_TRANSITION } from '@/constants/animation';
import type { ContainerProps } from '@/components/Container/types';

export const StyledContainer = styled(Container)<
  {
    $paddingTop: number;
    $paddingBottom: number;
  } & ContainerProps
>`
  flex: 1;
  padding-top: ${({ $paddingTop }) => $paddingTop}px;
  padding-horizontal: ${WRAPPER_SPACING}px;
`;

export const LogoContainer = styled(Animated.View).attrs({
  layout: DEFAULT_LAYOUT_TRANSITION,
})`
  align-items: center;
`;

export const ContentContainer = styled(Animated.View).attrs({
  layout: DEFAULT_LAYOUT_TRANSITION,
})`
  flex: 1;
`;

export const LogoImage = styled.Image`
  height: 64px;
`;
