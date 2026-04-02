import type { TextInputProps } from 'react-native';
import type {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import type { FontFamily, FontVariant, FontWeight } from '@/components/Text';
import type { UntitledUIIconName } from '@/components/Icons';

export type InputTheme = {
  colors: {
    background: string;
    text: string;
    placeholder: string;
    border: string;
    borderError: string;
    title: string;
    error: string;
    icon: string;
    iconError: string;
    focusOverlay: string;
    errorFocusOverlay: string;
  };
  typography: {
    family: FontFamily;
    weight: FontWeight;
    variant: FontVariant;
    size: number;
  };
  borderWidth: number;
  borderRadius: number;
};

export type InputProps<TFieldValues extends FieldValues> = Omit<
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
  fullWidth?: boolean;
};
