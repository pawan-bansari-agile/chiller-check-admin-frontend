import React, { useMemo, useState } from 'react';

import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input } from 'antd';

const companyList = [
  'Agile Tech',
  'Petal Grove Academy',
  'The Agile Infotech',
  'Angel Investor',
  'The Chill House'
];

const CompanySelectorDropdown: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('Agile Tech');

  const filteredCompanies = useMemo(() => {
    return companyList.filter((company) =>
      company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleCompanyClick = (company: string) => {
    setSelectedCompany(company);
  };

  const menu = (
    <div className="comapanyDashboardDropdown">
      <Input
        className="searchCompany"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
        prefix={<SearchOutlined style={{ color: '#000000' }} />}
      />
      <ul className="company-list">
        {filteredCompanies.map((company) => (
          <li
            key={company}
            onClick={() => handleCompanyClick(company)}
            className={`company-item ${selectedCompany === company ? 'selected' : ''}`}
          >
            {company}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <Button type="primary" className="title-btn">
        {selectedCompany} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default CompanySelectorDropdown;
