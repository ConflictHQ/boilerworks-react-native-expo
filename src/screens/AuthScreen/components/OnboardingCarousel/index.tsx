import React from 'react';
import Carousel from '@/components/Carousel';
import { IS_SMALL_DEVICE } from '@/constants/device';
import { IMAGE_ITEMS } from '../../constants';
import { CarouselContainer } from './styled';

type Props = {
  width: number;
};

const OnboardingCarousel = ({ width }: Props) => {
  return (
    <CarouselContainer>
      <Carousel
        withPagination={!IS_SMALL_DEVICE}
        items={IMAGE_ITEMS}
        width={width}
        height={168}
      />
    </CarouselContainer>
  );
};

export default OnboardingCarousel;
