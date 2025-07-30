import { ReactNode } from 'react';

import { Typography } from 'antd';

import { Logo } from '@/shared/svg';

import { Wrapper } from './style';

export interface IAuthProps {
  containerClassName?: string;
  children?: ReactNode;
  formProps?: {
    title?: string | ReactNode;
    desc?: string | ReactNode;
  };
}

const AuthLayout = (props: IAuthProps) => {
  const { containerClassName, children, formProps } = props;

  return (
    <Wrapper className={`auth-layout ${containerClassName}`}>
      <div className="auth-wrap">
        <div className="form-header-wrap">
          <div className="logo-wrap">
            <Logo />
          </div>
          {(formProps?.title || formProps?.desc) && (
            <div className="form-header">
              {formProps?.title && (
                <Typography.Title className="form-title" level={2}>
                  {formProps?.title}
                </Typography.Title>
              )}
              {formProps?.desc && (
                <Typography.Title className="form-desc" level={5}>
                  {formProps?.desc}
                </Typography.Title>
              )}
            </div>
          )}
        </div>
        {children}
      </div>
    </Wrapper>
  );
};

export default AuthLayout;
