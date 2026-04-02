import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderSectionWrapper } from './styled';
import type { RoundedHeaderSectionProps } from './types';

const RoundedHeaderSection = ({
  children,
  testID,
}: RoundedHeaderSectionProps) => {
  const insets = useSafeAreaInsets();

  return (
    <HeaderSectionWrapper testID={testID} paddingTop={insets.top}>
      {children}
    </HeaderSectionWrapper>
  );
};

RoundedHeaderSection.displayName = 'RoundedHeaderSection';

export default RoundedHeaderSection;

export type { RoundedHeaderSectionProps } from './types';
