import styled from 'styled-components/native';
import Text from '@/components/Text';
import { WRAPPER_SPACING } from '@/constants/ui';
import { BODY_FONT } from '@/constants/fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RADIUS = 16;

export const HandleContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.bottomSheet.colors.background};
  border-top-left-radius: ${RADIUS}px;
  border-top-right-radius: ${RADIUS}px;
  overflow: hidden;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  min-height: 52px;
  padding-horizontal: ${WRAPPER_SPACING}px;
`;

export const Title = styled(Text).attrs({
  family: BODY_FONT,
  size: 16,
  weight: '400',
  align: 'left',
  numberOfLines: 1,
})`
  flex: 1;
`;

export const CloseButton = styled(TouchableOpacity).attrs({
  hitSlop: 8,
  activeOpacity: 0.7,
})`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) =>
    theme.bottomSheet.colors.closeButtonBackground};
`;
