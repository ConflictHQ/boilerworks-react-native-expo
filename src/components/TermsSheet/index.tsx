import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import BottomSheet, { type BottomSheetRef } from '@/components/BottomSheet';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import TermsContent from '@/components/TermsContent';
import { Content } from './styled';

const SNAP_POINTS = ['40%', '90%'];

const TermsSheet = forwardRef<BottomSheetRef>((_, ref) => {
  const { t } = useTranslation();

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={SNAP_POINTS}
      name="terms-sheet"
      title={t('terms.title')}
    >
      <BottomSheetScrollView showsVerticalScrollIndicator={false}>
        <Content>
          <TermsContent />
        </Content>
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

TermsSheet.displayName = 'TermsSheet';

export default TermsSheet;
