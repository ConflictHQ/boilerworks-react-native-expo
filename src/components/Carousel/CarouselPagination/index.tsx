import React from 'react';
import PaginationDot from '../PaginationDot';
import type { CarouselPaginationProps } from '../types';
import { PaginationRow } from './styled';

const CarouselPagination = ({
  items,
  withPagination,
  scrollX,
  contentWidth,
  paginationActiveColor,
  paginationInactiveColor,
  paginationDotSize,
  paginationDotRadius,
}: CarouselPaginationProps) => {
  if (!withPagination) return null;

  return (
    <PaginationRow>
      {items.map((item, index) => (
        <PaginationDot
          key={`pagination-dot-${item.id}`}
          index={index}
          scrollX={scrollX}
          contentWidth={contentWidth}
          activeColor={paginationActiveColor}
          inactiveColor={paginationInactiveColor}
          size={paginationDotSize}
          radius={paginationDotRadius}
        />
      ))}
    </PaginationRow>
  );
};

export default CarouselPagination;
