import React from 'react';
import { useTranslation } from 'react-i18next';
import UntitledUI from '@/components/Icons';
import Avatar from '@/components/Avatar';
import { useThemeValues } from '@/theme/hooks';
import {
  HeaderWrapper,
  LeftSection,
  TextSection,
  UserName,
  Subtitle,
  RightSection,
  IconButton,
} from './styled';
import type { DashboardHeaderProps } from './types';

const DashboardHeader = ({
  title,
  subtitle,
  userInitials,
  userImage,
  onBellPress,
  onCalendarPress,
  testID,
}: DashboardHeaderProps) => {
  const theme = useThemeValues();
  const { t } = useTranslation();

  return (
    <HeaderWrapper testID={testID}>
      <LeftSection>
        <Avatar
          size="lg"
          initials={userInitials}
          sourceUri={userImage}
          variant="solid"
        />
        <TextSection>
          <UserName numberOfLines={1}>{title}</UserName>
          <Subtitle numberOfLines={1}>{subtitle}</Subtitle>
        </TextSection>
      </LeftSection>

      <RightSection>
        <IconButton
          onPress={onBellPress}
          accessibilityLabel={t(
            'home.header.accessibility.notifications.label'
          )}
          accessibilityRole="button"
          accessibilityHint={t('home.header.accessibility.notifications.hint')}
        >
          <UntitledUI
            name="bell-01"
            size={theme.dashboardHeader.iconSize}
            color={theme.dashboardHeader.iconColor}
          />
        </IconButton>
        <IconButton
          onPress={onCalendarPress}
          accessibilityLabel={t('home.header.accessibility.calendar.label')}
          accessibilityRole="button"
          accessibilityHint={t('home.header.accessibility.calendar.hint')}
        >
          <UntitledUI
            name="calendar"
            size={theme.dashboardHeader.iconSize}
            color={theme.dashboardHeader.iconColor}
          />
        </IconButton>
      </RightSection>
    </HeaderWrapper>
  );
};

DashboardHeader.displayName = 'DashboardHeader';

export default DashboardHeader;

export type { DashboardHeaderProps } from './types';
