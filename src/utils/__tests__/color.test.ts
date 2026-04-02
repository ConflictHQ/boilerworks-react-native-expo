import { hexToRgba } from '../color';

describe('hexToRgba', () => {
  it('should convert hex color to rgba with full opacity', () => {
    expect(hexToRgba('#FF0000', 1)).toBe('rgba(255, 0, 0, 1)');
  });

  it('should convert hex color to rgba with half opacity', () => {
    expect(hexToRgba('#FF0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
  });

  it('should convert hex color to rgba with zero opacity', () => {
    expect(hexToRgba('#FF0000', 0)).toBe('rgba(255, 0, 0, 0)');
  });

  it('should convert black color correctly', () => {
    expect(hexToRgba('#000000', 1)).toBe('rgba(0, 0, 0, 1)');
  });

  it('should convert white color correctly', () => {
    expect(hexToRgba('#FFFFFF', 1)).toBe('rgba(255, 255, 255, 1)');
  });

  it('should handle lowercase hex colors', () => {
    expect(hexToRgba('#ff0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
  });

  it('should handle mixed case hex colors', () => {
    expect(hexToRgba('#Ff00Aa', 0.75)).toBe('rgba(255, 0, 170, 0.75)');
  });

  it('should convert various opacity values correctly', () => {
    expect(hexToRgba('#00FF00', 0.25)).toBe('rgba(0, 255, 0, 0.25)');
    expect(hexToRgba('#0000FF', 0.8)).toBe('rgba(0, 0, 255, 0.8)');
  });

  it('should handle colors with equal RGB values', () => {
    expect(hexToRgba('#808080', 0.5)).toBe('rgba(128, 128, 128, 0.5)');
  });

  it('should convert primary theme color correctly', () => {
    expect(hexToRgba('#7C8C70', 0.1)).toBe('rgba(124, 140, 112, 0.1)');
  });
});
