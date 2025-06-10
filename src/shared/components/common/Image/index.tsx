import React from 'react';

import { StyledImage } from './style';
import { ImageProps } from './type';

const RenderImage: React.FC<ImageProps> = (props) => {
  const { layout = 'responsive', objectFit = 'cover', loading = 'lazy' } = props;
  return <StyledImage {...props} layout={layout} objectFit={objectFit} loading={loading} />;
};

export default RenderImage;
