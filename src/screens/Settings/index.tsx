/**
 * Settings — settings tab (visible when AuthStatus === Authenticated).
 *
 * Handles theme toggle, language switch, logout, and account deletion.
 * Theme and language changes are applied immediately and persisted.
 * Account deletion is a TODO stub — wire up a delete-account thunk when ready.
 *
 * Store: dispatches `logout` from auth slice.
 * Nav params: none; navigates to TermsPrivacy via useNavigation().
 */
import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import ScreenHeader from '@/components/ScreenHeader';
import Container from '@/components/Container';
import { useTheme } from '@/theme/ThemeContext';
import { ThemeMode } from '@/theme/types';
import { changeLanguage, SupportedLanguages } from '@/i18n';
import { TAB_BAR_HEIGHT } from '@/constants/ui';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/auth';
import {
  Wrapper,
  ContentContainer,
  BottomContainer,
  VersionText,
  SettingsButton,
  DeleteButtonContainer,
  DeleteText,
} from './styled';

export const Settings = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const { themeMode, setThemeSetting } = useTheme();
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleDeleteAccount = useCallback(() => {
    Alert.alert(
      t('settings.deleteConfirmation.title'),
      t('settings.deleteConfirmation.message'),
      [
        {
          text: t('settings.deleteConfirmation.cancel'),
          style: 'cancel',
        },
        {
          text: t('settings.deleteConfirmation.confirm'),
          style: 'destructive',
          onPress: () => {
            // TODO: Implement account deletion logic
            console.log('Account deletion confirmed');
          },
        },
      ],
      { cancelable: true }
    );
  }, [t]);

  const handleNavigateToTermsPrivacy = useCallback(() => {
    navigation.navigate('TermsPrivacy');
  }, [navigation]);

  const handleChangeTheme = useCallback(() => {
    Alert.alert(t('settings.themeOptions.title'), '', [
      {
        text: t('settings.themeOptions.light'),
        onPress: () => setThemeSetting(ThemeMode.Light),
        style: themeMode === ThemeMode.Light ? 'default' : 'cancel',
      },
      {
        text: t('settings.themeOptions.dark'),
        onPress: () => setThemeSetting(ThemeMode.Dark),
        style: themeMode === ThemeMode.Dark ? 'default' : 'cancel',
      },
      {
        text: t('settings.themeOptions.cancel'),
        style: 'cancel',
      },
    ]);
  }, [t, themeMode, setThemeSetting]);

  const handleChangeLanguage = useCallback(() => {
    Alert.alert(t('settings.languageOptions.title'), '', [
      {
        text: t('settings.languageOptions.english'),
        onPress: () => changeLanguage(SupportedLanguages.ENGLISH),
        style:
          i18n.language === SupportedLanguages.ENGLISH ? 'default' : 'cancel',
      },
      {
        text: t('settings.languageOptions.spanish'),
        onPress: () => changeLanguage(SupportedLanguages.SPANISH),
        style:
          i18n.language === SupportedLanguages.SPANISH ? 'default' : 'cancel',
      },
      {
        text: t('settings.languageOptions.cancel'),
        style: 'cancel',
      },
    ]);
  }, [t, i18n.language]);

  return (
    <Wrapper>
      <ScreenHeader title={t('settings.title')} />
      <Container
        keyboardAvoiding
        noInsetsTop
        bounces
        bottomInset={TAB_BAR_HEIGHT}
      >
        <ContentContainer>
          {/*<SettingsButton>{t('settings.myProfile')}</SettingsButton>*/}
          {/*<SettingsButton>{t('settings.biometricPasscode')}</SettingsButton>*/}
          <SettingsButton onPress={handleNavigateToTermsPrivacy}>
            {t('settings.termsPrivacy')}
          </SettingsButton>
          {/*<SettingsButton>{t('settings.redeemOfferCode')}</SettingsButton>*/}
          <SettingsButton onPress={handleChangeTheme}>
            {t('settings.theme')}
          </SettingsButton>
          <SettingsButton onPress={handleChangeLanguage}>
            {t('settings.language')}
          </SettingsButton>
          <SettingsButton onPress={handleLogout}>
            {t('settings.logout')}
          </SettingsButton>

          <BottomContainer>
            <DeleteButtonContainer onPress={handleDeleteAccount}>
              <DeleteText>{t('settings.deleteAccount')}</DeleteText>
            </DeleteButtonContainer>

            <VersionText>
              {t('settings.version')} {Constants.expoConfig?.version || '1.0.0'}
            </VersionText>
          </BottomContainer>
        </ContentContainer>
      </Container>
    </Wrapper>
  );
};
