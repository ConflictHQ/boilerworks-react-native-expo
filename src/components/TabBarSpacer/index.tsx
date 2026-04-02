import React from 'react';
import styled from 'styled-components/native';
import { TAB_BAR_HEIGHT } from '@/constants/ui';

const Container = styled.View<{ height: number }>`
  height: ${props => props.height}px;
`;

export const TabBarSpacer = () => {
  return <Container height={TAB_BAR_HEIGHT} />;
};

export default TabBarSpacer;
