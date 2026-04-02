import styled from 'styled-components/native';

interface HeaderSectionWrapperProps {
  paddingTop?: number;
}

export const HeaderSectionWrapper = styled.View<HeaderSectionWrapperProps>`
  width: 100%;
  background-color: ${({ theme }) =>
    theme.roundedHeaderSection.backgroundColor};
  border-bottom-left-radius: ${({ theme }) =>
    theme.roundedHeaderSection.borderRadius}px;
  border-bottom-right-radius: ${({ theme }) =>
    theme.roundedHeaderSection.borderRadius}px;
  padding-top: ${({ paddingTop }) => paddingTop || 0}px;
  padding-bottom: ${({ theme }) =>
    theme.roundedHeaderSection.paddingVertical}px;
  padding-horizontal: 16px;
`;
