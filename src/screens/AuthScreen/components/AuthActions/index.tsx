import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/Button';
import { ButtonsContainer } from './styled';

type Props = {
  onLogIn: () => void;
  onCreateAccount: () => void;
};

const AuthActions = ({ onLogIn, onCreateAccount }: Props) => {
  const { t } = useTranslation();

  return (
    <ButtonsContainer>
      <Button onPress={onCreateAccount} rightIcon={'chevron-right'}>
        {t('auth.createAccount')}
      </Button>
      <Button onPress={onLogIn} variant={'outline'}>
        {t('auth.logIn')}
      </Button>
    </ButtonsContainer>
  );
};

export default AuthActions;
