import { LoadingIcon, Logo } from '@/shared/svg';

import { LoadingDots, PrimaryLoaderWrapper, Spinner, Wrapper } from './style';

interface IProps {
  children?: React.ReactNode;
}

export const PrimaryLoader: React.FC<IProps> = () => {
  return (
    <Wrapper>
      <PrimaryLoaderWrapper>
        <div className="logo-wrap">
          <Logo />
        </div>
        <LoadingDots>
          {[...Array(5)].map((_, i) => (
            <span key={i} className="dot" />
          ))}
        </LoadingDots>
      </PrimaryLoaderWrapper>
    </Wrapper>
  );
};

export const Loader: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Wrapper>
        <Spinner>
          <LoadingIcon />
        </Spinner>
        {children}
      </Wrapper>
      {children}
    </>
  );
};
