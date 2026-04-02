import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

interface UseResponsiveFontSizeOptions {
  /** The reference screen width (default: 390px - iPhone 14 Pro) */
  baseWidth?: number;
  /** Maximum font size (optional) */
  maxFontSize?: number;
  /** Minimum font size (optional) */
  minFontSize?: number;
}

/**
 * Hook that scales font size based on screen width
 * @param baseFontSize - The font size at base width (390px)
 * @param options - Optional configuration for base width, min and max font sizes
 * @returns Scaled font size rounded to nearest integer, clamped between min and max if provided
 */
export const useResponsiveFontSize = (
  baseFontSize: number,
  options?: UseResponsiveFontSizeOptions
): number => {
  const { width } = useWindowDimensions();
  const { baseWidth = 390, maxFontSize, minFontSize } = options || {};

  return useMemo(() => {
    let scaledSize = Math.round((width / baseWidth) * baseFontSize);

    if (minFontSize !== undefined && scaledSize < minFontSize) {
      scaledSize = minFontSize;
    }

    if (maxFontSize !== undefined && scaledSize > maxFontSize) {
      scaledSize = maxFontSize;
    }

    return scaledSize;
  }, [width, baseWidth, baseFontSize, maxFontSize, minFontSize]);
};
