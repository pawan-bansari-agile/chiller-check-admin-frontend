import React, { useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input } from 'antd';

import { companyHooks } from '@/services/company';

import { authStore } from '@/store/auth';

import { Loader } from '@/shared/components/common/Loader';
import { capitalizeFirstLetter } from '@/shared/utils/functions';

interface IProps {
  setCompanyId: (companyId: string) => void;
}

const CompanySelectorDropdown: React.FC<IProps> = ({ setCompanyId }) => {
  const { userData } = authStore((state) => state);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState({ label: '', value: '' });
  const [open, setOpen] = useState(false); // 👈 track dropdown open state

  const { data: companyList, isLoading: isCompanyLoading } = companyHooks.AllCompanyList();

  const companyOptions = useMemo(() => {
    return (
      companyList?.map((company) => ({
        label: capitalizeFirstLetter(company?.name),
        value: company?._id
      })) || []
    );
  }, [companyList]);

  const filteredCompanies = useMemo(() => {
    return companyOptions?.filter((company) =>
      company?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  }, [searchTerm, companyOptions]);

  useEffect(() => {
    const urlCompanyId = searchParams.get('companyId');

    const initialCompany =
      companyOptions?.find((company) => company?.value === userData?.companyId) ||
      companyOptions?.find((company) => company?.value === urlCompanyId);

    if (initialCompany) {
      setSelectedCompany(initialCompany);
      setCompanyId(initialCompany?.value);
    } else if (companyOptions?.length > 0) {
      setSelectedCompany(companyOptions[0]);
      setCompanyId(companyOptions[0]?.value);
    } else {
      setSelectedCompany({ label: '', value: '' });
      setCompanyId('');
    }
  }, [userData?.companyId, companyOptions, setCompanyId, searchParams, setSearchParams]);

  const handleCompanyClick = (company: { label: string; value: string }) => {
    setSelectedCompany(company);
    setCompanyId(company?.value);
    setSearchTerm('');
    setOpen(false);
    setSearchParams({ companyId: company?.value });
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
        {filteredCompanies?.map((company) => (
          <li
            key={company?.value}
            onClick={() => handleCompanyClick(company)}
            className={`company-item ${selectedCompany?.value === company?.value ? 'selected' : ''}`}
          >
            {company?.label}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {isCompanyLoading && <Loader />}
      <Dropdown
        overlay={menu}
        disabled={isCompanyLoading || !!userData?.companyId}
        trigger={['click']}
        placement="bottomRight"
        open={open}
        onOpenChange={(flag) => setOpen(flag)}
      >
        <Button type="primary" className="title-btn company-dropdown-btn">
          {selectedCompany?.label || 'Select Company'} <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default CompanySelectorDropdown;
