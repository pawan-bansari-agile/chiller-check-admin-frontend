import styled from 'styled-components';

import { StyledImageProps } from './type';

const getWidth = ({ layout, width }: StyledImageProps) => {
  if (layout === 'fill') return '100%';
  return width ?? '100%';
};

const getHeight = ({ layout, height }: StyledImageProps) => {
  if (layout === 'fill') return '100%';
  return height ?? 'auto';
};

export const StyledImage = styled.img.withConfig({
  shouldForwardProp: (prop) => !['objectFit']?.includes(prop)
})<StyledImageProps>`
  display: block;
  width: ${getWidth};
  height: ${getHeight};
  object-fit: ${({ objectFit }) => objectFit ?? 'cover'};
`;
