import React from 'react';
import { LOGO_IMAGE } from '../../constants';
import { LogoContainer, LogoImage } from './styled';

const LogoHeader = () => {
  return (
    <LogoContainer>
      <LogoImage source={LOGO_IMAGE} />
    </LogoContainer>
  );
};

export default LogoHeader;
