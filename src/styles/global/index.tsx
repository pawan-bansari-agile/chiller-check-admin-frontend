import React from 'react';

import 'antd/dist/reset.css';

import AntdStyle from '@/styles/antd';
import { CommonStyle } from '@/styles/common/CommonStyle';
import { ResetStyle } from '@/styles/common/ResetStyle';
import { Spacing } from '@/styles/common/Spacing';

const GlobalStyles = () => {
  return (
    <React.Fragment>
      <CommonStyle />
      <ResetStyle />
      <Spacing />
      <AntdStyle />
    </React.Fragment>
  );
};

export default GlobalStyles;
