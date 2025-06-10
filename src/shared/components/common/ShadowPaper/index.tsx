import React, { ReactNode } from 'react';

import { Wrapper } from './style';

interface IChildrenProps {
  children: ReactNode;
}

const ShadowPaper: React.FC<IChildrenProps> = ({ children }) => {
  return (
    <>
      <Wrapper className="shadow-box">{children}</Wrapper>
    </>
  );
};

export default ShadowPaper;
