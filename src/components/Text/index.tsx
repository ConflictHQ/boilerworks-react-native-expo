import React from 'react';
import { StyledText } from './styled';
import type { TextProps } from './types';
import { DEFAULT_FONT } from '@/constants/fonts';

const Text: React.FC<TextProps> = ({
  children,
  size = 16,
  family = DEFAULT_FONT,
  weight = '400',
  variant = 'regular',
  color,
  align = 'left',
  lineHeight,
  letterSpacing,
  numberOfLines,
  transform = 'none',
  decoration = 'none',
  style,
  fontStyle = 'normal',
  testID,
  ...rest
}) => {
  return (
    <StyledText
      size={size}
      family={family}
      weight={weight}
      variant={variant}
      $fontStyle={fontStyle}
      color={color}
      align={align}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      numberOfLines={numberOfLines}
      $textTransform={transform}
      $decoration={decoration}
      style={style}
      testID={testID}
      {...rest}
    >
      {children}
    </StyledText>
  );
};

export { TextProps, FontFamily, FontWeight, FontVariant } from './types';
export default Text;
