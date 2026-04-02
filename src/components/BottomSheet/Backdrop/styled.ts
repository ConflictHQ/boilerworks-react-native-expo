import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

export const StyledBottomSheetBackdrop = styled(BottomSheetBackdrop)`
  background-color: transparent;
`;

export const BackdropContent = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const BlurBackdrop = styled(BlurView).attrs({
  tint: 'dark',
  intensity: 15,
  accessibilityIgnoresInvertColors: true,
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const BackdropTint = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.bottomSheet.colors.backdropTint};
`;
