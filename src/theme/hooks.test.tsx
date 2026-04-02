import React, { PropsWithChildren } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { renderHook } from '@/test-utils/renderHook';
import { useThemeValues } from './hooks';
import { lightTheme } from './themes';
import { ThemeMode } from './types';

const ThemeWrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <StyledThemeProvider theme={lightTheme}>{children}</StyledThemeProvider>
);

describe('useThemeValues', () => {
  it('throws when used outside ThemeProvider', () => {
    expect(() => renderHook(() => useThemeValues())).toThrow(
      'useThemeValues must be used within a styled-components ThemeProvider'
    );
  });

  it('returns the current theme when wrapped', () => {
    const { result } = renderHook(() => useThemeValues(), {
      wrapper: ThemeWrapper,
    });
    expect(result.current.type).toBe(ThemeMode.Light);
    expect(result.current.colors.background).toBe('#FFFFFF');
  });
});
