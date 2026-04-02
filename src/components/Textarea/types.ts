import type { TextInputProps } from 'react-native';
import type {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import type { FontFamily, FontVariant, FontWeight } from '@/components/Text';

export type TextareaTheme = {
  colors: {
    background: string;
    text: string;
    placeholder: string;
    border: string;
    borderError: string;
    title: string;
    error: string;
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
  minHeight: number;
  paddingVertical: number;
  paddingHorizontal: number;
};

export type TextareaProps<TFieldValues extends FieldValues> = Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'onBlur' | 'multiline'
> & {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
  title?: string;
  errorMessage?: string;
  fullWidth?: boolean;
  minHeight?: number;
};
