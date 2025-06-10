import React from 'react';

import { AntButton } from './AntButton';
import { AntDropdown } from './AntDropdown';
import { AntModal } from './AntModal';
import { AntPagination } from './AntPagination';
import { AntTable } from './AntTable';
import { AntdFormInput } from './AntdFormInput';

const AntdStyle = () => {
  return (
    <React.Fragment>
      <AntDropdown />
      <AntdFormInput />
      <AntButton />
      <AntTable />
      <AntPagination />
      <AntModal />
    </React.Fragment>
  );
};

export default AntdStyle;
