import React, { memo } from 'react';
import { type BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import {
  BackdropContent,
  BackdropTint,
  BlurBackdrop,
  StyledBottomSheetBackdrop,
} from './styled';
import { useBottomSheetContext } from '@/components/BottomSheet/context';

const Backdrop: React.FC<BottomSheetBackdropProps> = props => {
  const { onClose } = useBottomSheetContext();

  return (
    <StyledBottomSheetBackdrop
      {...props}
      onPress={onClose}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      pressBehavior="close"
      opacity={1}
    >
      <BackdropContent pointerEvents="none">
        <BlurBackdrop />
        <BackdropTint />
      </BackdropContent>
    </StyledBottomSheetBackdrop>
  );
};

export default memo(Backdrop);
