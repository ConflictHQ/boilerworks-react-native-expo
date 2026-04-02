import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import GorhomBottomSheet from '@gorhom/bottom-sheet';
import Backdrop from './Backdrop';
import Handle from './Handle';
import BottomSheetContext from './context';
import { ContentScrollView, Sheet } from './styled';
import { BottomSheetProps } from '@/components/BottomSheet/types';
export { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
export { default as BottomSheetTextInput } from './BottomSheetTextInput';

export type BottomSheetRef = React.ComponentRef<typeof GorhomBottomSheet>;

const DEFAULT_SNAP_POINTS = ['60%', '80%'];

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      children,
      title,
      onClose,
      handleSheetChanges,
      snapPoints = DEFAULT_SNAP_POINTS,
      index = 0,
      enableDynamicSizing = false,
      enablePanDownToClose = true,
    },
    ref
  ) => {
    const bottomSheetRef = useRef<BottomSheetRef | null>(null);

    useImperativeHandle(
      ref,
      () => bottomSheetRef.current as BottomSheetRef,
      []
    );

    const handleClose = useCallback(() => {
      bottomSheetRef.current?.close();
    }, []);

    const contextValue = useMemo(
      () => ({ title, onClose: handleClose }),
      [handleClose, title]
    );

    return (
      <BottomSheetContext.Provider value={contextValue}>
        <Sheet
          ref={bottomSheetRef}
          index={index}
          onClose={onClose}
          snapPoints={snapPoints}
          enableDynamicSizing={enableDynamicSizing}
          enablePanDownToClose={enablePanDownToClose}
          backdropComponent={Backdrop}
          handleComponent={Handle}
          onChange={handleSheetChanges}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize"
          screenReaderFocusable
        >
          <ContentScrollView>{children}</ContentScrollView>
        </Sheet>
      </BottomSheetContext.Provider>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;
