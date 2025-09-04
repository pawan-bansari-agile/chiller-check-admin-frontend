import React, { ReactNode } from 'react';

import { Wrapper } from './style';

interface IChildrenProps {
  children: ReactNode;
  className?: string;
}

const ShadowPaper: React.FC<IChildrenProps> = ({ children, className }) => {
  return (
    <>
      <Wrapper className={`shadow-box ${className}`}>{children}</Wrapper>
    </>
  );
};

export default ShadowPaper;
