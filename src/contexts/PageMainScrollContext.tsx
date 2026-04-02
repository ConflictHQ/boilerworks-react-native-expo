import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  RefObject,
} from 'react';
import { ScrollView, FlatList } from 'react-native';

const PageMainScrollContext = createContext<
  RefObject<ScrollView | FlatList | null> | undefined
>(undefined);

interface PageMainScrollProviderProps {
  children: ReactNode;
}

export const PageMainScrollProvider: React.FC<PageMainScrollProviderProps> = ({
  children,
}) => {
  const pageMainScrollRef = useRef<ScrollView | FlatList>(null);

  return (
    <PageMainScrollContext.Provider value={pageMainScrollRef}>
      {children}
    </PageMainScrollContext.Provider>
  );
};

export const usePageMainScrollRef = <
  T extends ScrollView | FlatList = ScrollView,
>(): RefObject<T> => {
  const context = useContext(PageMainScrollContext);
  if (context === undefined) {
    throw new Error(
      'usePageMainScrollRef must be used within a PageMainScrollProvider'
    );
  }
  return context as RefObject<T>;
};
