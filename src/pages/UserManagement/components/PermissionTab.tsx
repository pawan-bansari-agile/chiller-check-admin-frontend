import React from 'react';

import { Checkbox } from 'antd';

import { CommonTable } from '@/shared/components/common/Table';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: 200
  },
  {
    title: 'Select All',
    dataIndex: 'selectAll',
    key: 'selectAll',
    render: () => <Checkbox checked />,
    width: 200
  },
  {
    title: 'View',
    dataIndex: 'view',
    key: 'view',
    render: () => <Checkbox checked />,
    width: 200
  },
  {
    title: 'Add',
    dataIndex: 'add',
    key: 'add',
    render: () => <Checkbox checked />,
    width: 200
  },
  {
    title: 'Edit',
    dataIndex: 'edit',
    key: 'edit',
    render: () => <Checkbox checked />,
    width: 200
  },
  {
    title: 'Active / Inactive / Delete',
    dataIndex: 'status',
    key: 'status',
    render: () => <Checkbox checked />,
    width: 200
  }
];

const data = [
  {
    title: 'Company',
    selectAll: '',
    view: '',
    add: '',
    edit: '',
    status: ''
  },
  {
    title: 'Region',
    selectAll: '',
    view: '',
    add: '',
    edit: '',
    status: ''
  },
  {
    title: 'Facilities',
    selectAll: '',
    view: '',
    add: '',
    edit: '',
    status: ''
  },
  {
    title: 'Chillers',
    selectAll: '',
    view: '',
    add: '',
    edit: '',
    status: ''
  },
  {
    title: 'Users',
    selectAll: '',
    view: '',
    add: '',
    edit: '',
    status: ''
  },
  {
    title: 'Log Entries',
    selectAll: '',
    view: '',
    add: '',
    edit: '',
    status: ''
  },
  {
    title: 'Maintenance',
    selectAll: '',
    view: '',
    add: '',
    edit: '',
    status: ''
  },
  {
    title: 'Reports',
    selectAll: '',
    view: '',
    add: '',
    edit: '',
    status: ''
  },
  {
    title: 'Settings',
    selectAll: '',
    view: '',
    add: '',
    edit: '',
    status: ''
  }
];

const PermissionTab: React.FC = () => {
  return (
    <>
      <CommonTable columns={columns} dataSource={data} />
    </>
  );
};

export default PermissionTab;
