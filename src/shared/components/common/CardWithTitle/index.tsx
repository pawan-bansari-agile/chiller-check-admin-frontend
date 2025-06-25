import React from 'react';

import { Wrapper } from './style';

interface ICardTitleProps {
  title: string;
  children: React.ReactNode;
}

const CardWithTitle: React.FC<ICardTitleProps> = ({ title, children }) => {
  return (
    <Wrapper>
      <div className="CardWithTitleWrap">
        <div className="cardHeaderTitle">
          <h2>{title}</h2>
        </div>
        <div className="cardBody">{children}</div>
      </div>
    </Wrapper>
  );
};

export default CardWithTitle;
