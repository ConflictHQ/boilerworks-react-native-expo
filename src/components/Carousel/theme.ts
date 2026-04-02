import { CarouselTheme } from '@/components/Carousel/types';
import { Colors } from '@/constants/colors';

export const lightCarouselTheme: CarouselTheme = {
  color: {
    paginationActive: Colors.light.accent,
    paginationInactive: Colors.mainGray,
  },
};

export const darkCarouselTheme: CarouselTheme = {
  color: {
    paginationActive: Colors.dark.accent,
    paginationInactive: Colors.dark.paginationInactive,
  },
};
