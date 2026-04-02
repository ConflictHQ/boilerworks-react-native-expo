export interface PickerThemeColors {
  item: {
    active: string;
    inactive: string;
  };
  android: {
    dropdownIcon: string;
    background: string;
  };
}

export interface PickerTheme {
  colors: PickerThemeColors;
}
