import type { ReactNode } from 'react';
import type { FlexStyle, ViewProps } from 'react-native';

export type FlexDirection = NonNullable<FlexStyle['flexDirection']>;
export type FlexAlign = NonNullable<FlexStyle['alignItems']>;
export type FlexJustify = NonNullable<FlexStyle['justifyContent']>;
export type FlexWrap = NonNullable<FlexStyle['flexWrap']>;
export type FlexAlignSelf = NonNullable<FlexStyle['alignSelf']>;
export type FlexBasis = NonNullable<FlexStyle['flexBasis']>;
export type FlexPosition = NonNullable<FlexStyle['position']>;

export interface FlexProps extends ViewProps {
  children?: ReactNode;
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: FlexWrap;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  flex?: number;
  grow?: number;
  shrink?: number;
  basis?: FlexBasis;
  alignSelf?: FlexAlignSelf;
  position?: FlexPosition;
  fullWidth?: boolean;
  fullHeight?: boolean;
}
