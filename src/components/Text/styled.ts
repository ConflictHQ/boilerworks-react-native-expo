import styled from 'styled-components/native';
import { TextProps, FontWeight } from './types';
import { customFonts, DEFAULT_FONT } from '@/constants/fonts';
import { logger } from '@/utils/logger';

const getWeightString = (weight: FontWeight): string => {
  switch (weight) {
    case '100':
      return 'Thin';
    case '300':
      return 'Light';
    case '400':
      return 'Regular';
    case '500':
      return 'Medium';
    case '600':
      return 'SemiBold';
    case '700':
      return 'Bold';
    case '800':
      return 'ExtraBold';
    case '900':
      return 'Black';
    default:
      return 'Regular';
  }
};

export const buildFontName = (
  font: TextProps['family'] = DEFAULT_FONT,
  weight: FontWeight = '400',
  variant: TextProps['variant'] = 'regular'
): string => {
  const weightString = getWeightString(weight);
  const italicSuffix = variant === 'italic' ? 'Italic' : '';
  const fontName = `${font}-${weightString}${italicSuffix}`;
  // @ts-expect-error `fontName` is runtime-generated; if it's missing, Expo falls back to the default system font App will not crash
  if (!customFonts?.[fontName]) {
    logger.error(`Trying to use not existing font name: ${fontName}`);
  }
  return fontName;
};
export const StyledText = styled.Text<
  TextProps & {
    $textTransform: TextProps['transform'];
    $decoration?: TextProps['decoration'];
    $fontStyle?: TextProps['fontStyle'];
  }
>`
  font-size: ${({ size = 16 }) => size}px;
  font-family: ${({ family, weight, variant }) =>
    buildFontName(family, weight, variant)};
  color: ${({ color, theme }) => color || theme.colors.text.primary};
  text-align: ${({ align = 'left' }) => align};
  line-height: ${({ lineHeight, size = 16 }) => lineHeight || size * 1.5}px;
  letter-spacing: ${({ letterSpacing = 0 }) => letterSpacing}px;
  text-transform: ${({ $textTransform }) => $textTransform};
  text-decoration-line: ${({ $decoration = 'none' }) => $decoration};
  font-style: ${({ $fontStyle = 'normal' }) => $fontStyle};
`;
