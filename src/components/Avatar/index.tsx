import React, { memo, useMemo } from 'react';
import PressableOpacity from '@/components/PressableOpacity';
import UntitledUI from '@/components/Icons';
import { useThemeValues } from '@/theme/hooks';
import {
  AvatarContainer,
  AvatarImage,
  AvatarInitials,
  AvatarIcon,
  GradientContainer,
} from './styled';
import type { AvatarProps, GradientAvatarContainerProps } from './types';

const GradientAvatar = memo<GradientAvatarContainerProps>(
  ({ size, style, onPress, testID, accessibilityLabel, children }) => {
    const theme = useThemeValues();

    const gradientColors = useMemo(
      () =>
        [
          theme.avatar.colors.secondary.background,
          theme.avatar.colors.primary.background,
        ] as const,
      [theme]
    );

    const gradientStart = useMemo(() => ({ x: 0, y: 0 }), []);
    const gradientEnd = useMemo(() => ({ x: 1, y: 1 }), []);

    return (
      <PressableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        testID={testID}
        accessible
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel}
      >
        <GradientContainer
          $size={size}
          colors={gradientColors}
          start={gradientStart}
          end={gradientEnd}
          style={style}
        >
          {children}
        </GradientContainer>
      </PressableOpacity>
    );
  }
);

GradientAvatar.displayName = 'GradientAvatar';

const Avatar = memo<AvatarProps>(
  ({
    size = 'md',
    variant = 'solid',
    source,
    sourceUri,
    initials,
    iconName,
    backgroundColor,
    testID,
    accessibilityLabel,
    onPress,
  }) => {
    const theme = useThemeValues();

    const processedSource = useMemo(() => {
      if (sourceUri) {
        return { uri: sourceUri };
      }
      return source;
    }, [source, sourceUri]);

    const containerStyle = useMemo(() => {
      if (backgroundColor) {
        return { backgroundColor };
      }
      return {};
    }, [backgroundColor]);

    const iconSize = useMemo(() => {
      return theme.avatar.fontSize[size];
    }, [size, theme]);

    const iconColor = useMemo(() => {
      if (backgroundColor) {
        return theme.avatar.colors.primary.text;
      }
      switch (variant) {
        case 'outline':
          return theme.avatar.colors.outline.text;
        case 'gradient':
          return theme.avatar.colors.secondary.text;
        case 'solid':
        default:
          return theme.avatar.colors.primary.text;
      }
    }, [variant, backgroundColor, theme]);

    const containerContent = (
      <>
        {processedSource && <AvatarImage source={processedSource} />}
        {initials && !processedSource && (
          <AvatarInitials $size={size} $variant={variant}>
            {initials.toUpperCase()}
          </AvatarInitials>
        )}
        {iconName && !processedSource && !initials && (
          <AvatarIcon $size={size}>
            <UntitledUI name={iconName} size={iconSize} color={iconColor} />
          </AvatarIcon>
        )}
      </>
    );

    if (variant === 'gradient') {
      return (
        <GradientAvatar
          size={size}
          style={containerStyle}
          onPress={onPress}
          testID={testID}
          accessibilityLabel={accessibilityLabel}
        >
          {containerContent}
        </GradientAvatar>
      );
    }

    return (
      <PressableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        testID={testID}
        accessible
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel}
      >
        <AvatarContainer $size={size} $variant={variant} style={containerStyle}>
          {containerContent}
        </AvatarContainer>
      </PressableOpacity>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
