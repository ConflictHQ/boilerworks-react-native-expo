import { createContext, useContext } from 'react';

export type BottomSheetContextValue = {
  title?: string;
  onClose?: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextValue | undefined>(
  undefined
);

export const useBottomSheetContext = () => {
  const value = useContext(BottomSheetContext);
  if (!value) {
    throw new Error(
      'useBottomSheetContext must be used within BottomSheetContext.Provider'
    );
  }
  return value;
};

export default BottomSheetContext;
