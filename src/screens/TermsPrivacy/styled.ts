import styled from 'styled-components/native';
import { WRAPPER_SPACING } from '@/constants/ui';
import Container from '@/components/Container';

export const Wrapper = styled.View`
  flex: 1;
`;

export const ScrollContainer = styled(Container)`
  padding-horizontal: ${WRAPPER_SPACING}px;
`;
