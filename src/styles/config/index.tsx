import type React from 'react';

import { ConfigProvider } from 'antd';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import GlobalStyles from '../global';
import { theme } from '../theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

function ThemeProvider({ children }: Readonly<ThemeProviderProps>) {
  const { antd, styled } = theme;
  return (
    <ConfigProvider theme={antd}>
      <StyledThemeProvider theme={styled}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ConfigProvider>
  );
}

export default ThemeProvider;
