import type { BottomSheetHandleProps } from '@gorhom/bottom-sheet';
import React, { memo } from 'react';
import type { ViewProps } from 'react-native';
import Icons from '@/components/Icons';
import { useThemeValues } from '@/theme/hooks';
import { useBottomSheetContext } from '../context';
import { CloseButton, HandleContainer, HeaderRow, Title } from './styled';

type InternalHandleProps = BottomSheetHandleProps & {
  style?: ViewProps['style'];
};

const Handle = (props: InternalHandleProps) => {
  const { style } = props as InternalHandleProps;
  const { title, onClose } = useBottomSheetContext();
  const theme = useThemeValues();

  return (
    <HandleContainer style={style}>
      <HeaderRow>
        {!!title && <Title>{title}</Title>}
        <CloseButton
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <Icons
            name="x-close"
            size={18}
            color={theme.bottomSheet.colors.closeIcon}
          />
        </CloseButton>
      </HeaderRow>
    </HandleContainer>
  );
};

export default memo(Handle);
