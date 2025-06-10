import React from 'react';

export interface StyledImageProps {
  layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
  width?: number | string;
  height?: number | string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
}
export interface ImageProps extends StyledImageProps, React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
}
