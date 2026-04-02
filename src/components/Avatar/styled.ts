import styled from 'styled-components/native';
import { Image as ExpoImage } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import type { AvatarSize, AvatarVariant } from './types';
import type { Theme } from '@/theme/types';

interface AvatarContainerProps {
  $size: AvatarSize;
  $variant: AvatarVariant;
}

const getSize = (theme: Theme, size: AvatarSize) => theme.avatar.sizes[size];

const getContainerStyle = (theme: Theme, variant: AvatarVariant) => {
  switch (variant) {
    case 'outline':
      return `
        border-width: ${theme.avatar.borderWidth}px;
        border-color: ${theme.avatar.colors.outline.border};
        background-color: ${theme.avatar.colors.outline.background};
      `;
    case 'gradient':
      return `
        background-color: transparent;
      `;
    case 'solid':
    default:
      return `
        background-color: ${theme.avatar.colors.primary.background};
      `;
  }
};

export const AvatarContainer = styled.View<AvatarContainerProps>`
  width: ${({ theme, $size }) => getSize(theme, $size)}px;
  height: ${({ theme, $size }) => getSize(theme, $size)}px;
  border-radius: ${({ theme, $size }) => getSize(theme, $size) / 2}px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  ${({ theme, $variant }) => getContainerStyle(theme, $variant)}
`;

export const GradientContainer = styled(LinearGradient)<{ $size: AvatarSize }>`
  width: ${({ theme, $size }) => theme.avatar.sizes[$size]}px;
  height: ${({ theme, $size }) => theme.avatar.sizes[$size]}px;
  border-radius: ${({ theme, $size }) => theme.avatar.sizes[$size] / 2}px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const AvatarImage = styled(ExpoImage)`
  width: 100%;
  height: 100%;
  border-radius: 100px;
`;

export const AvatarInitials = styled.Text<{
  $size: AvatarSize;
  $variant: AvatarVariant;
}>`
  font-size: ${({ theme, $size }) => theme.avatar.fontSize[$size]}px;
  font-weight: 600;
  color: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'outline':
        return theme.avatar.colors.outline.text;
      case 'gradient':
        return theme.avatar.colors.secondary.text;
      case 'solid':
      default:
        return theme.avatar.colors.primary.text;
    }
  }};
`;

export const AvatarIcon = styled.View<{ $size: AvatarSize }>`
  justify-content: center;
  align-items: center;
`;
