import React from 'react';

import { Wrapper } from './style';

interface IDetailsProps {
  className?: string;
  detailsIcon: React.ReactNode;
  detailsTitle: string;
  detailsDescription: React.ReactNode | string;
}

const Details: React.FC<IDetailsProps> = ({
  className,
  detailsIcon,
  detailsTitle,
  detailsDescription
}) => {
  return (
    <Wrapper className={className}>
      <div className="titleWrap">
        <span>{detailsIcon}</span>
        <h2>{detailsTitle}</h2>
      </div>
      <p>{detailsDescription}</p>
    </Wrapper>
  );
};

export default Details;
