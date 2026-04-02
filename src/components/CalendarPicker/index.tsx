import React, { useCallback, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useTheme } from 'styled-components/native';
import dayjs from 'dayjs';
import { YEAR_MONTH_DAY_FORMAT } from '@/utils/dateFormats';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { ThemeMode } from '@/theme/types';
import {
  Container,
  LabelText,
  InputButton,
  InputText,
  DoneButton,
  DoneText,
} from './styled';
import { IS_ANDROID, IS_IOS } from '@/constants/device';

type CalendarPickerProps = {
  label?: string;
  placeholder?: string;
  value?: string | Date | null;
  onChange: (value: string) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  doneLabel?: string;
  display?: 'default' | 'spinner' | 'compact' | 'inline' | 'calendar' | 'clock';
};

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  label,
  placeholder,
  value,
  onChange,
  minimumDate,
  maximumDate,
  doneLabel,
  display,
}) => {
  const theme = useTheme();
  const [showPicker, setShowPicker] = useState(IS_IOS);

  const { dateValue, displayValue, hasValue } = useMemo(() => {
    if (value instanceof Date) {
      return {
        dateValue: value,
        displayValue: value.toLocaleDateString(),
        hasValue: true,
      };
    }

    if (typeof value === 'string' && value.trim().length > 0) {
      const parsed = new Date(value);
      if (!Number.isNaN(parsed.getTime())) {
        return {
          dateValue: parsed,
          displayValue: parsed.toLocaleDateString(),
          hasValue: true,
        };
      }
    }

    return {
      dateValue: new Date(),
      displayValue: placeholder ?? '',
      hasValue: false,
    };
  }, [placeholder, value]);

  const inputTextColor = useMemo(
    () => (hasValue ? theme.input.colors.text : theme.input.colors.placeholder),
    [hasValue, theme.input.colors.text, theme.input.colors.placeholder]
  );

  const handlePress = useCallback(() => {
    if (IS_ANDROID) {
      setShowPicker(true);
    }
  }, []);

  const handleDismiss = useCallback(() => {
    if (IS_ANDROID) {
      setShowPicker(false);
    }
  }, []);

  const handleChange = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (Platform.OS === 'android') {
        setShowPicker(false);
        if (event?.type === 'dismissed') {
          return;
        }
      }
      if (selectedDate) {
        // selectedDate is a local Date object — use dayjs to format to avoid
        // toISOString() converting to UTC, which can shift the calendar date
        onChange(dayjs(selectedDate).format(YEAR_MONTH_DAY_FORMAT));
      }
    },
    [onChange]
  );

  const pickerDisplay = useMemo(
    () => display ?? (IS_IOS ? 'spinner' : 'default'),
    [display]
  );
  const pickerStyle = useMemo<ViewStyle | undefined>(
    () =>
      IS_IOS
        ? {
            alignSelf: 'stretch',
            backgroundColor: 'transparent',
            height: 216,
          }
        : undefined,
    []
  );
  const pickerTextColor = useMemo(
    () => (IS_IOS ? theme.colors.text.primary : undefined),
    [theme.colors.text.primary]
  );
  const pickerThemeVariant = useMemo(() => {
    if (IS_ANDROID) return undefined;
    return theme.type === ThemeMode.Dark ? 'dark' : 'light';
  }, [theme.type]);

  return (
    <Container>
      {label && <LabelText>{label}</LabelText>}
      {IS_ANDROID && (
        <InputButton onPress={handlePress}>
          <InputText color={inputTextColor}>{displayValue}</InputText>
        </InputButton>
      )}
      {(IS_IOS || showPicker) && (
        <DateTimePicker
          value={dateValue}
          mode="date"
          display={pickerDisplay}
          style={pickerStyle}
          textColor={pickerTextColor}
          themeVariant={pickerThemeVariant}
          onChange={handleChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
      {IS_ANDROID && showPicker && doneLabel && (
        <DoneButton onPress={handleDismiss}>
          <DoneText size={16}>{doneLabel}</DoneText>
        </DoneButton>
      )}
    </Container>
  );
};

export type { CalendarPickerProps };
export default CalendarPicker;
