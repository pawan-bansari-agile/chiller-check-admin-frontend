import React from 'react';

import { AntButton } from './AntButton';
import { AntDropdown } from './AntDropdown';
import { AntModal } from './AntModal';
import { AntPagination } from './AntPagination';
import { AntTable } from './AntTable';
import { AntTabs } from './AntTabs';
import { AntTag } from './AntTag';
import { AntTooltip } from './AntTooltip';
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
      <AntTooltip />
      <AntTabs />
      <AntTag />
    </React.Fragment>
  );
};

export default AntdStyle;
