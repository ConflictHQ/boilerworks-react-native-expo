import { ImageSourcePropType } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

export interface CarouselItemType {
  id: string;
  image: ImageSourcePropType;
  title?: string;
}

export interface CarouselProps {
  items: CarouselItemType[];
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  expandedWidth?: number;
  collapsedWidth?: number;
  height?: number;
  spacing?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  width?: number;
  paginationActiveColor?: string;
  paginationInactiveColor?: string;
  paginationDotSize?: number;
  paginationDotRadius?: number;
  paginationInactiveDotSize?: number;
  paginationInactiveDotRadius?: number;
  withPagination?: boolean;
}

export interface CarouselItemComponentProps {
  item: CarouselItemType;
  index: number;
  scrollX: SharedValue<number>;
  inactiveItemWidth: number;
  activeItemWidth: number;
  spacing: number;
  height: number;
  contentWidth: SharedValue<number>;
}

export interface CarouselPaginationDotProps {
  index: number;
  scrollX: SharedValue<number>;
  contentWidth: SharedValue<number>;
  activeColor?: string;
  inactiveColor?: string;
  size?: number;
  radius?: number;
  inactiveSize?: number;
  inactiveRadius?: number;
}

export interface CarouselPaginationProps {
  items: CarouselItemType[];
  withPagination: boolean;
  scrollX: SharedValue<number>;
  contentWidth: SharedValue<number>;
  paginationActiveColor?: string;
  paginationInactiveColor?: string;
  paginationDotSize?: number;
  paginationDotRadius?: number;
}

export interface CarouselTheme {
  color: {
    paginationActive?: string;
    paginationInactive?: string;
  };
}
