import React from 'react';

import { Link } from 'react-router-dom';

import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import { ROUTES } from '@/shared/constants/routes';
import { toAbsoluteUrl } from '@/shared/utils/functions';

import { Wrapper } from '../style';

const columns = [
  {
    title: 'Section',
    dataIndex: 'section',
    key: 'section',
    width: 110,
    sorter: (a: any, b: any) => a.section - b.section
  },
  {
    title: 'Field',
    dataIndex: 'field',
    key: 'field',
    width: 120,
    sorter: (a: any, b: any) => a.field - b.field
  },
  {
    title: 'Problem',
    dataIndex: 'problem',
    key: 'problem',
    width: 340,
    sorter: (a: any, b: any) => a.problem - b.problem
  },
  {
    title: 'Solution',
    dataIndex: 'solution',
    key: 'solution',
    width: 340,
    sorter: (a: any, b: any) => a.solution - b.solution
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
    render: () => (
      <>
        <span>12/11/24</span>
        <b className="time">15:53</b>
      </>
    )
  },
  {
    title: 'Updated By',
    dataIndex: 'updatedBy',
    key: 'updatedBy',
    width: 200,
    sorter: (a: any, b: any) => a.updatedBy - b.updatedBy,
    render: () => (
      <div className="updateUser">
        <figure>
          <img src={toAbsoluteUrl('/public/icons/header-logo.svg')} alt="user" />
        </figure>
        <h4>Joey Tribiyani</h4>
      </div>
    )
  },
  {
    title: '',
    key: 'action',
    render: () => (
      <div className="actionIonWrap">
        <Link className="actionIcon" to={ROUTES.CONFIGURE_FIELD}>
          <EyeOutlined />
        </Link>
      </div>
    )
  }
];

const data = [
  {
    section: 'General',
    field: 'Outside Air Temp.',
    problem:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ipsum eu leo semper',
    solution:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ipsum eu leo semper'
  }
];

const ProblemSolution: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Problems & Solutions" />
      <HeaderToolbar title="Problems & Solutions" />
      <ShadowPaper>
        <div className="contentHeader">
          <Input className="searchProblem" placeholder="Search here" prefix={<SearchOutlined />} />
        </div>
        <CommonTable columns={columns} dataSource={data} pagination={{ current: 6 }} />
      </ShadowPaper>
    </Wrapper>
  );
};

export default ProblemSolution;
