import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import Text from '@/components/Text';
import { DEFAULT_LAYOUT_TRANSITION } from '@/constants/animation';
import { BODY_FONT } from '@/constants/fonts';

export const Content = styled(Animated.View).attrs({
  layout: DEFAULT_LAYOUT_TRANSITION,
})`
  padding-top: 32px;
`;

export const Header = styled(Animated.View).attrs({
  layout: DEFAULT_LAYOUT_TRANSITION,
})`
  margin-bottom: 24px;
`;

export const InfoText = styled(Text).attrs({
  family: BODY_FONT,
})``;

export const InputContainer = styled(Animated.View).attrs({
  layout: DEFAULT_LAYOUT_TRANSITION,
})`
  gap: 16px;
`;

export const SubmitButtonWrapper = styled(Animated.View).attrs({
  layout: DEFAULT_LAYOUT_TRANSITION,
})`
  margin-top: 24px;
`;

export const SubmittedInfoContainer = styled(Animated.View).attrs({
  layout: DEFAULT_LAYOUT_TRANSITION,
})`
  margin-top: 16px;
`;
