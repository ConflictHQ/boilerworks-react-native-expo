import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UntitledUI from '@/components/Icons';
import { useThemeValues } from '@/theme/hooks';
import { HeaderContainer, BackButton, Title, RightSection } from './styled';
import type { ScreenHeaderProps } from './types';

const ScreenHeader = ({
  title,
  onBackPress,
  showBackButton = true,
  rightComponent,
  useSafeArea = true,
  testID,
  style,
}: ScreenHeaderProps) => {
  const navigation = useNavigation();
  const theme = useThemeValues();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const topInset = useSafeArea ? insets.top : 0;

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <HeaderContainer testID={testID} style={style} $topInset={topInset}>
      {showBackButton && (
        <BackButton
          onPress={handleBackPress}
          accessibilityLabel={t('common.back')}
          accessibilityRole="button"
          accessibilityHint={t('accessibilityGenerics.goBack')}
        >
          <UntitledUI
            name="chevron-left"
            size={theme.screenHeader.iconSize}
            color={theme.screenHeader.iconColor}
          />
        </BackButton>
      )}
      <Title numberOfLines={1}>{title}</Title>
      {rightComponent && <RightSection>{rightComponent}</RightSection>}
    </HeaderContainer>
  );
};

ScreenHeader.displayName = 'ScreenHeader';

export default ScreenHeader;

export type { ScreenHeaderProps } from './types';
