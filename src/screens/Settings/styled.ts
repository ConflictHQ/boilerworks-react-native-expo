import styled from 'styled-components/native';
import Text from '@/components/Text';
import Button from '@/components/Button';
import PressableOpacity from '@/components/PressableOpacity';
import { WRAPPER_SPACING } from '@/constants/ui';
import { BODY_FONT } from '@/constants/fonts';

export const Wrapper = styled.View`
  flex: 1;
`;

export const ContentContainer = styled.View`
  margin: ${WRAPPER_SPACING}px;
  gap: 16px;
  flex: 1;
`;

export const BottomContainer = styled.View`
  margin-top: auto;
  align-items: flex-start;
`;

export const VersionText = styled(Text).attrs({
  family: BODY_FONT,
  weight: '400',
  size: 12,
})`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const SettingsButton = styled(Button).attrs({
  variant: 'secondary',
  rightIcon: 'chevron-right',
  fullWidth: true,
  textTransform: 'none',
})``;

export const DeleteButtonContainer = styled(PressableOpacity)`
  margin-top: 24px;
`;

export const DeleteText = styled(Text).attrs({
  family: BODY_FONT,
  weight: '400',
  size: 14,
})`
  color: ${({ theme }) => theme.colors.error};
`;
