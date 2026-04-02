import React from 'react';
import { StyledFlex } from './styled';
import type { FlexProps } from './types';

const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  align = 'stretch',
  justify = 'flex-start',
  wrap = 'nowrap',
  gap,
  rowGap,
  columnGap,
  flex,
  grow,
  shrink,
  basis,
  alignSelf,
  position,
  fullWidth = false,
  fullHeight = false,
  ...rest
}) => {
  return (
    <StyledFlex
      $direction={direction}
      $align={align}
      $justify={justify}
      $wrap={wrap}
      $gap={gap}
      $rowGap={rowGap}
      $columnGap={columnGap}
      $flex={flex}
      $grow={grow}
      $shrink={shrink}
      $basis={basis}
      $alignSelf={alignSelf}
      $position={position}
      $fullWidth={fullWidth}
      $fullHeight={fullHeight}
      {...rest}
    >
      {children}
    </StyledFlex>
  );
};

export {
  FlexProps,
  FlexDirection,
  FlexAlign,
  FlexJustify,
  FlexWrap,
} from './types';
export default Flex;
