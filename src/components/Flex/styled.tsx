import styled, { css } from 'styled-components/native';
import type {
  FlexAlign,
  FlexAlignSelf,
  FlexBasis,
  FlexDirection,
  FlexJustify,
  FlexPosition,
  FlexWrap,
} from './types';

interface StyledFlexProps {
  $direction: FlexDirection;
  $align: FlexAlign;
  $justify: FlexJustify;
  $wrap: FlexWrap;
  $gap?: number;
  $rowGap?: number;
  $columnGap?: number;
  $flex?: number;
  $grow?: number;
  $shrink?: number;
  $basis?: FlexBasis;
  $alignSelf?: FlexAlignSelf;
  $position?: FlexPosition;
  $fullWidth?: boolean;
  $fullHeight?: boolean;
}

export const StyledFlex = styled.View<StyledFlexProps>`
  flex-direction: ${({ $direction }) => $direction};
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
  flex-wrap: ${({ $wrap }) => $wrap};
  ${({ $gap }) =>
    $gap !== undefined &&
    css`
      gap: ${$gap}px;
    `}
  ${({ $rowGap }) =>
    $rowGap !== undefined &&
    css`
      row-gap: ${$rowGap}px;
    `}
  ${({ $columnGap }) =>
    $columnGap !== undefined &&
    css`
      column-gap: ${$columnGap}px;
    `}
  ${({ $flex }) =>
    $flex !== undefined &&
    css`
      flex: ${$flex};
    `}
  ${({ $grow }) =>
    $grow !== undefined &&
    css`
      flex-grow: ${$grow};
    `}
  ${({ $shrink }) =>
    $shrink !== undefined &&
    css`
      flex-shrink: ${$shrink};
    `}
  ${({ $basis }) =>
    $basis !== undefined &&
    css`
      flex-basis: ${typeof $basis === 'number' ? `${$basis}px` : $basis};
    `}
  ${({ $alignSelf }) =>
    $alignSelf !== undefined &&
    css`
      align-self: ${$alignSelf};
    `}
  ${({ $position }) =>
    $position !== undefined &&
    css`
      position: ${$position};
    `}
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
  ${({ $fullHeight }) =>
    $fullHeight &&
    css`
      height: 100%;
    `}
`;
