import React from 'react';
import { PickerItemProps, PickerProps } from '@react-native-picker/picker';
import { IS_ANDROID } from '@/constants/device';
import { PickerContainer, StyledPicker } from './styled';

function PickerItem<T>({ value, ...rest }: PickerItemProps<T>) {
  return <Picker.Item {...rest} value={value} />;
}

function PickerBase<T>(props: PickerProps<T>) {
  if (IS_ANDROID) {
    return (
      <PickerContainer>
        <StyledPicker {...props} />
      </PickerContainer>
    );
  }

  return <StyledPicker {...props} />;
}

type PickerComponent = (<T>(props: PickerProps<T>) => React.JSX.Element) & {
  Item: <T>(props: PickerItemProps<T>) => React.JSX.Element;
};

const Picker = PickerBase as PickerComponent;
Picker.Item = PickerItem;

export default Picker;
