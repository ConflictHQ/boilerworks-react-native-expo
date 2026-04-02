import type { TextInputProps } from 'react-native';
import type {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import type { UntitledUIIconName } from '@/components/Icons';

export type BottomSheetTextInputProps<TFieldValues extends FieldValues> = Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'onBlur'
> & {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
  title?: string;
  errorMessage?: string;
  rightIcon?: UntitledUIIconName;
  onRightIconPress?: () => void;
  rightIconAccessibilityLabel?: string;
  enablePasswordToggle?: boolean;
};
