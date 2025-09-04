import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import * as XLSX from 'xlsx';

import { logHooks } from '@/services/log';

import { RenderSelectDropDown } from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { LocalStorageKeys } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { hasPermission, showToaster } from '@/shared/utils/functions';

import { Wrapper } from './style';

const SummaryRecord: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: importLogAction, isPending } = logHooks.useImportLog();
  const [columns, setColumns] = useState<any>([]);
  const [dataSource, setDataSource] = useState<any>([]);
  const [originalDataSource, setOriginalDataSource] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [chillerList, setChillerList] = useState<{ label: string; value: string }[]>([]);
  const [selectedChiller, setSelectedChiller] = useState<string | null>(null);

  useEffect(() => {
    const base64DataUrl = localStorage.getItem(LocalStorageKeys.EXCEL_FILE);
    if (!base64DataUrl) {
      message.error('No file data found in localStorage');
      return;
    }

    try {
      const isCsv = base64DataUrl.includes('text/csv');
      const base64 = base64DataUrl.split(',')[1];

      const binaryStr = atob(base64);

      let json: any[] = [];

      if (isCsv) {
        // If it's a CSV, parse as plain text
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      } else {
        // Otherwise, treat it as XLSX
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }

        const workbook = XLSX.read(bytes, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      }

      const headers = json?.[0] as string[];
      const rows: any = json?.slice(1);

      // Required fields (replace 3 with a combined one)
      const desiredHeaders = [
        'Serial Number',
        'Chiller Name',
        'Reading Date Time',
        'Outside Air Temp.',
        'Condenser Inlet Temp.',
        'Condenser Outlet Temp.',
        'Condenser Refrig Temp.',
        'Begin Recording Run Hours'
      ];

      const headerIndexMap: Record<string, number> = {};
      headers?.forEach((h, i) => {
        headerIndexMap[h] = i;
      });

      const data = rows
        ?.map((row: any[], idx: number) => {
          const obj: any = {};

          // Basic fields
          obj['Serial Number'] = row[headerIndexMap['Serial Number']] ?? '';
          obj['Chiller Name'] = row[headerIndexMap['Chiller Name']] ?? '';
          obj['Outside Air Temp.'] = row[headerIndexMap['Outside Air Temp.']] ?? '';
          obj['Condenser Inlet Temp.'] = row[headerIndexMap['Condenser Inlet Temp.']] ?? '';
          obj['Condenser Outlet Temp.'] = row[headerIndexMap['Condenser Outlet Temp.']] ?? '';
          obj['Condenser Refrig Temp.'] = row[headerIndexMap['Condenser Refrig Temp.']] ?? '';
          obj['Begin Recording Run Hours'] = row[headerIndexMap['Begin Recording Run Hours']] ?? '';
          obj.key = `${row[headerIndexMap['Serial Number']] ?? 'row'}-${idx}`;

          const dateCell = row[headerIndexMap['Reading Date']] ?? '';
          const timeCell = row[headerIndexMap['Reading Time']] ?? '';
          const zone = row[headerIndexMap['Reading Timezone']] ?? '';

          // Format date and time if they're numbers (Excel serials)
          const formattedDate =
            typeof dateCell === 'number'
              ? XLSX.SSF.format('dd/mm/yyyy', dateCell)
              : String(dateCell);

          const formattedTime =
            typeof timeCell === 'number' ? XLSX.SSF.format('hh:mm', timeCell) : String(timeCell);

          obj['Reading Date Time'] = `${formattedDate} ${formattedTime} ${zone}`.trim();

          return obj;
        })
        ?.filter((row: any) => {
          // Exclude rows that are completely empty (ignoring the 'key' field)
          return Object.entries(row).some(([key, val]) => {
            if (key === 'key') return false; // skip checking 'key'
            return val !== '' && val !== null && val !== undefined;
          });
        });

      const uniqueChillers = Array.from(new Set(data?.map((item: any) => item['Chiller Name'])))
        .filter((name) => name?.toString() ?? '')
        .map((name) => ({ label: name?.toString() || '', value: name?.toString() || '' }));

      setChillerList(uniqueChillers);

      setColumns(
        desiredHeaders?.map((header) => {
          if (header === 'Begin Recording Run Hours') {
            return {
              title: header,
              dataIndex: header,
              key: header,
              render: (value: string) => {
                const lower = String(value).toLowerCase();
                let color = 'inherit';

                if (lower === 'yes') color = 'green';
                else if (lower === 'no') color = 'red';

                return <span style={{ color }}>{value}</span>;
              }
            };
          }

          return {
            title: header,
            dataIndex: header,
            key: header
          };
        })
      );

      setOriginalDataSource(data);
      setDataSource(data);
    } catch (err) {
      message.error('Failed to parse Excel file.');
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    filterTable(value, selectedChiller);
  };

  const handleChillerChange = (value: string) => {
    setSelectedChiller(value);
    filterTable(searchText, value);
  };

  const filterTable = (search: string, chiller: string | null) => {
    let filtered = [...originalDataSource];

    if (chiller) {
      filtered = filtered?.filter(
        (item) =>
          item['Chiller Name']?.toString()?.toLowerCase() === chiller?.toString()?.toLowerCase()
      );
    }

    if (search) {
      filtered = filtered.filter((item) =>
        String(item['Chiller Name'] || '')
          ?.toLowerCase()
          .includes(search?.toLowerCase())
      );
    }

    setDataSource(filtered);
  };

  const onSubmit = () => {
    const base64DataUrl = localStorage.getItem(LocalStorageKeys.EXCEL_FILE);
    const fileType =
      localStorage.getItem(LocalStorageKeys.FILE_TYPE) ||
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    if (!base64DataUrl) {
      message.error('No file data found in localStorage');
      return;
    }

    // Extract base64 string (after the comma)
    const base64 = base64DataUrl.split(',')[1];

    // Convert base64 to binary
    const binaryStr = atob(base64);
    const len = binaryStr.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }

    // Create a Blob from binary data
    const blob = new Blob([bytes], {
      type: fileType
    });

    // Create FormData and append file
    const formData = new FormData();
    formData.append('file', blob);
    importLogAction(formData, {
      onSuccess: async (res) => {
        showToaster('success', res?.message || 'Import Successfully.');
        localStorage.removeItem(LocalStorageKeys.EXCEL_FILE);
        localStorage.removeItem(LocalStorageKeys.FILE_TYPE);
        navigate(ROUTES.DASHBOARD, { replace: true });
      },
      onError: (err) => {
        showToaster('error', err?.message || err?.message?.[0] || 'Something went wrong');
      }
    });
  };
  return (
    <Wrapper>
      <Meta title="Import Summary" />
      <HeaderToolbar
        title="Import Summary"
        backBtn={true}
        button={
          <div className="maintenanceButtonWrap">
            {hasPermission('maintenance', 'add') && (
              <Button
                type="primary"
                className="title-btn"
                disabled={isPending}
                loading={isPending}
                onClick={onSubmit}
              >
                Import
              </Button>
            )}
          </div>
        }
      />
      <ShadowPaper>
        <div className="chillerContentHeader">
          <div className="dropdownWrap">
            <RenderSelectDropDown
              colClassName="dropdownWithSearch"
              inputProps={{
                placeholder: 'Select Chiller',
                options: chillerList,
                value: selectedChiller,
                onChange: handleChillerChange,
                allowClear: true
              }}
            />
          </div>
          <Input
            className="searchChiller"
            placeholder="Search for Chiller"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        <CommonTable
          rowKey="key"
          scroll={{ x: 'max-content' }}
          columns={columns}
          dataSource={dataSource || []}
          pagination={false}
          emptyText={
            <EmptyState
              isEmpty={!dataSource?.length}
              search={searchText}
              searchDescription="No Log Found"
              defaultDescription="No Data"
            />
          }
        />
      </ShadowPaper>
    </Wrapper>
  );
};

export default SummaryRecord;
