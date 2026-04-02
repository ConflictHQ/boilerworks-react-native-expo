import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { DEFAULT_LAYOUT_TRANSITION } from '@/constants/animation';

export const Content = styled(Animated.View).attrs({
  layout: DEFAULT_LAYOUT_TRANSITION,
})`
  padding-top: 24px;
  padding-bottom: 40px;
`;
