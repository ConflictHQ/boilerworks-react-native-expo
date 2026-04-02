/**
 * TermsPrivacy — full-screen terms & privacy policy viewer.
 *
 * Rendered from Settings tab via stack navigation (not a tab itself).
 * Content is driven by i18n keys under the `terms` namespace.
 *
 * Store: reads nothing.
 * Nav params: none.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import ScreenHeader from '@/components/ScreenHeader';
import TermsContent from '@/components/TermsContent';
import { Wrapper, ScrollContainer } from './styled';

const TermsPrivacy = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <ScreenHeader title={t('terms.title')} />
      <ScrollContainer variant="default" keyboardAvoiding noInsetsTop>
        <TermsContent />
      </ScrollContainer>
    </Wrapper>
  );
};

export default TermsPrivacy;
