import React from 'react';
import { StyledCard } from './styled';
import type { CardProps, CardVariant } from './types';
import PressableOpacity from '@/components/PressableOpacity';

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  entering,
  exiting,
  onPress,
  ...rest
}) => {
  const Wrapper = onPress ? PressableOpacity : React.Fragment;
  return (
    <StyledCard
      $variant={variant}
      entering={entering}
      exiting={exiting}
      {...rest}
    >
      <Wrapper {...(onPress ? { onPress } : {})}>{children}</Wrapper>
    </StyledCard>
  );
};

export { CardVariant };
export default Card;
