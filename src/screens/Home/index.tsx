/**
 * HomeScreen — main dashboard tab (visible when AuthStatus === Authenticated).
 *
 * Boilerplate placeholder that shows the tech stack, quick-start steps, and
 * links to key CLAUDE.md sections. Replace content when building the real app.
 *
 * Store: reads nothing (extend with useAppSelector as needed).
 * Nav params: none.
 */
import React from 'react';
import { StaticScreenProps } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Container from '@/components/Container';
import DashboardHeader from '@/components/DashboardHeader';
import RoundedHeaderSection from '@/components/RoundedHeaderSection';
import TabBarSpacer from '@/components/TabBarSpacer';
import Text from '@/components/Text';
import Flex from '@/components/Flex';
import Card from '@/components/Card';
import Icons from '@/components/Icons';
import { useThemeValues } from '@/theme/hooks';
import { WRAPPER_SPACING } from '@/constants/ui';
import styled from 'styled-components/native';

type Props = StaticScreenProps<undefined>;

const ScreenContent = styled.View`
  padding: ${WRAPPER_SPACING}px;
  gap: 16px;
`;

const StepRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Dot = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.button.colors.primary.background};
`;

const LinkRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const LinkIconBox = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.button.colors.primary.background}1A;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.card.colors.outline.borderColor};
  margin-vertical: 8px;
`;

const ChipRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const StackChip = styled.View`
  padding-horizontal: 12px;
  padding-vertical: 6px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.button.colors.primary.background}1A;
`;

const STEPS = ['theme', 'screens', 'api', 'auth'] as const;
const STACK_ITEMS = ['expo', 'rn', 'ts', 'redux', 'i18n'] as const;

const LINK_ICONS = {
  components: 'layout-alt-03',
  theme: 'palette',
  navigation: 'route',
} as const;

const HomeScreen = ({ route: _route }: Props) => {
  const { t } = useTranslation();
  const theme = useThemeValues();

  return (
    <Container noInsetsTop bounces>
      <RoundedHeaderSection>
        <DashboardHeader
          title={t('home.header.title', { name: '' })}
          subtitle={t('home.header.subtitle')}
          userInitials="BW"
          onBellPress={() => {}}
          onCalendarPress={() => {}}
        />
      </RoundedHeaderSection>

      <ScreenContent>
        {/* Getting Started */}
        <Card>
          <Flex direction="column" gap={12}>
            <Text weight="700" size={16}>
              {t('home.gettingStarted.title')}
            </Text>
            <Text size={13} color="secondary">
              {t('home.gettingStarted.subtitle')}
            </Text>
            <Divider />
            {STEPS.map(step => (
              <StepRow key={step}>
                <Dot />
                <Text size={14}>{t(`home.gettingStarted.steps.${step}`)}</Text>
              </StepRow>
            ))}
          </Flex>
        </Card>

        {/* Quick Links */}
        <Text weight="700" size={16}>
          {t('home.quickLinks.title')}
        </Text>
        {(['components', 'theme', 'navigation'] as const).map(
          (item, index, arr) => (
            <React.Fragment key={item}>
              <LinkRow>
                <LinkIconBox>
                  <Icons
                    name={LINK_ICONS[item]}
                    size={20}
                    color={theme.button.colors.primary.background}
                  />
                </LinkIconBox>
                <Flex direction="column" gap={2} flex={1}>
                  <Text weight="600" size={14}>
                    {t(`home.quickLinks.${item}`)}
                  </Text>
                  <Text size={12} color="secondary">
                    {t(`home.quickLinks.${item}Desc`)}
                  </Text>
                </Flex>
                <Icons
                  name="chevron-right"
                  size={18}
                  color={theme.button.colors.primary.background}
                />
              </LinkRow>
              {index < arr.length - 1 && <Divider />}
            </React.Fragment>
          )
        )}

        {/* Tech Stack */}
        <Card>
          <Flex direction="column" gap={12}>
            <Text weight="700" size={16}>
              {t('home.stack.title')}
            </Text>
            <ChipRow>
              {STACK_ITEMS.map(item => (
                <StackChip key={item}>
                  <Text size={12} weight="500">
                    {t(`home.stack.${item}`)}
                  </Text>
                </StackChip>
              ))}
            </ChipRow>
          </Flex>
        </Card>
      </ScreenContent>

      <TabBarSpacer />
    </Container>
  );
};

export default HomeScreen;