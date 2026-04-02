import React from 'react';

export type BottomSheetTheme = {
  colors: {
    background: string;
    backdropTint: string;
    closeButtonBackground: string;
    closeIcon: string;
  };
};

export type BottomSheetProps = {
  handleSheetChanges?: (index: number) => void;
  name?: string;
  title?: string;
  onClose?: () => void;
  snapPoints?: string[];
  index?: number;
  enableDynamicSizing?: boolean;
  enablePanDownToClose?: boolean;
  children?: React.ReactNode;
};
