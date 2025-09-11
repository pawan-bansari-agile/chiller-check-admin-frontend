import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import {
  CloudUploadOutlined,
  DeleteOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  FileExcelFilled,
  PlusOutlined,
  SearchOutlined,
  SlidersOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Checkbox, Dropdown, Input, Switch, Upload, UploadFile, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import dayjs from 'dayjs';

import { chillerHooks } from '@/services/chiller';
import { ICommonPagination } from '@/services/common/types';
import { companyHooks } from '@/services/company';
import { facilityHooks } from '@/services/facility';
import { logHooks, logQueryKeys } from '@/services/log';
import { ILogProblemRes, IViewLogRes } from '@/services/log/types';

import { authStore } from '@/store/auth';

import { RenderSelectDropDown } from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import CommonModal from '@/shared/components/common/Modal/components/CommonModal';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { ALERT_TYPE, IMAGE_MODULE_NAME, IMAGE_URL, LocalStorageKeys } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { DownloadTemplateIcon, EditIcon } from '@/shared/svg';
import {
  buildSearchParams,
  capitalizeFirstLetter,
  debounce,
  getAntDSortOrder,
  getSortOrder,
  hasPermission,
  showToaster,
  toAbsoluteUrl
} from '@/shared/utils/functions';

import { Wrapper } from '../style';

const { Dragger } = Upload;

const LogEntry: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { userData } = authStore((state) => state);

  const [searchParams, setSearchParams] = useSearchParams();

  const latestSearchParamsRef = useRef(searchParams);
  const [loading, setLoading] = useState<boolean>(false);
  const [args, setArgs] = useState<ICommonPagination>({
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    search: searchParams.get('search') || '',
    sort_by: searchParams.get('sort_by') || '',
    sort_order: searchParams.get('sort_order') || '',
    companyId: searchParams.get('companyId') || userData?.companyId || '',
    facilityId: searchParams.get('facilityId') || '',
    chillerId: searchParams.get('chillerId') || '',
    peakLoad: searchParams.get('peakLoad') === 'true' ? true : false
  });
  const [searchVal, setSearchVal] = useState<string>('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);
  const [selectedChillerId, setSelectedChillerId] = useState<string | null>(null);
  const [logIds, setLogIds] = useState<string[] | []>([]);
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({});
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isPopupModal, setIsPopupModal] = useState<boolean>(false);
  const [problemData, setProblemData] = useState<{
    problem: string;
    solution: string;
    field: string;
  } | null>(null);

  const { data, isLoading } = logHooks.LogList(args);
  const { data: companyList, isLoading: isCompanyLoading } = companyHooks.AllCompanyList();
  const { mutate: exportLogAction, isPending } = logHooks.useExportLog();

  const isEmpty = !data?.logList?.length;

  const [facilityArg, setFacilityArg] = useState<ICommonPagination>({
    page: 1,
    limit: 100000,
    search: '',
    sort_by: '',
    sort_order: '',
    companyId: searchParams.get('companyId') || userData?.companyId || ''
  });
  const [chillerArgs, setChillerArgs] = useState<ICommonPagination>({
    page: 1,
    limit: 100000,
    sort_by: '',
    sort_order: '',
    facilityIds: []
  });

  const { data: facilityListCompany, isLoading: isFacilityListCompanyLoading } =
    facilityHooks.FacilityList(facilityArg);

  const { data: chillerList, isLoading: isChillerLoading } =
    chillerHooks.ChillerAllList(chillerArgs);

  const toggleableColumnKeys = useMemo(
    () => [
      'creator',
      'facilityName',
      'ChillerNo',
      'updatedAt',
      'effLoss',
      'condAppLoss',
      'evapAppLoss',
      'nonCondLoss',
      'otherLoss'
    ],
    []
  );

  // Transforms company list into dropdown options
  const companyOptions = useMemo(() => {
    return (
      companyList?.map((company) => ({
        label: capitalizeFirstLetter(company.name),
        value: company._id
      })) || []
    );
  }, [companyList]);

  const chillerOptions = useMemo(() => {
    return (
      chillerList?.chillerList?.map((chiller) => ({
        label: chiller?.ChillerNo,
        value: chiller._id
      })) || []
    );
  }, [chillerList?.chillerList]);

  useEffect(() => {
    if (args.search) setSearchVal(args.search);
  }, [args.search]);

  useEffect(() => {
    if (userData?.companyId) setSelectedCompanyId(userData?.companyId);
  }, [userData?.companyId]);

  useEffect(() => {
    latestSearchParamsRef.current = searchParams;
  }, [searchParams]);

  useEffect(() => {
    const companyIdFromUrl = searchParams.get('companyId');
    if (companyIdFromUrl && companyOptions?.length) {
      setSelectedCompanyId(companyIdFromUrl);
    }
  }, [searchParams, companyOptions]);

  // Transforms facility list into dropdown options

  const facilityOptionsCompany = useMemo(() => {
    return (
      facilityListCompany?.facilityList?.map((facility) => ({
        label: capitalizeFirstLetter(facility.name),
        value: facility._id
      })) || []
    );
  }, [facilityListCompany]);

  useEffect(() => {
    const facilityFromUrl = searchParams.get('facilityId');

    if (facilityFromUrl && facilityOptionsCompany?.length) {
      setSelectedFacilityId(facilityFromUrl);
      setChillerArgs({
        ...chillerArgs,
        facilityIds: [facilityFromUrl]
      });
    }
  }, [searchParams, facilityOptionsCompany]);

  useEffect(() => {
    const chillerIdFromUrl = searchParams.get('chillerId');

    if (chillerIdFromUrl && chillerOptions?.length) {
      setSelectedChillerId(chillerIdFromUrl);
    }
  }, [chillerOptions, searchParams]);

  useEffect(() => {
    const initialState: Record<string, boolean> = {};
    toggleableColumnKeys?.forEach((key) => {
      initialState[key] = true;
    });
    setVisibleColumns(initialState);
  }, [toggleableColumnKeys]);

  const debouncedSearch = useRef(
    debounce((value: string) => {
      const trimmed = value.trim();
      updateParamsAndArgs(
        {
          search: trimmed,
          page: 1
        },
        latestSearchParamsRef.current
      );
    })
  ).current;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchVal(value);
    debouncedSearch(value);
  };

  // Updates state when a company is selected from the dropdown
  const handleSelectChange = (value: string) => {
    setFacilityArg({
      ...facilityArg,
      companyId: value
    });
    setSelectedFacilityId(null);
    setSelectedChillerId(null);
    setSelectedCompanyId(value);
    updateParamsAndArgs({ page: 1, companyId: value, facilityId: '', chillerId: '' });
  };

  // Updates state when a facility is selected from the dropdown
  const handleSelectFacilityChange = (value: string) => {
    setChillerArgs({
      ...chillerArgs,
      facilityIds: [value]
    });
    setSelectedFacilityId(value);
    setSelectedChillerId(null);
    updateParamsAndArgs({ page: 1, facilityId: value, chillerId: '' });
  };

  // Updates state when a facility is selected from the dropdown
  const handleSelectChillerChange = (value: string) => {
    setSelectedChillerId(value);
    updateParamsAndArgs({ page: 1, chillerId: value });
  };

  const updateParamsAndArgs = useCallback(
    (newArgs: Partial<ICommonPagination>, baseParams?: URLSearchParams) => {
      const currentParams = Object.fromEntries((baseParams || searchParams).entries());

      const mergedArgs: Record<string, any> = {
        page: Number(currentParams.page) || 1,
        limit: Number(currentParams.limit) || 10,
        search: currentParams.search || '',
        sort_by: currentParams.sort_by ?? '', // <-- always ensure present
        sort_order: currentParams.sort_order ?? '', // <-- always ensure present
        companyId: currentParams.companyId || userData?.companyId || '',
        facilityId: currentParams.facilityId || '',
        chillerId: currentParams.chillerId || '',
        peakLoad: currentParams.peakLoad,
        ...newArgs // override anything as needed
      };

      // Apply number conversion only after merge
      if (mergedArgs.page) mergedArgs.page = Number(mergedArgs.page);
      if (mergedArgs.limit) mergedArgs.limit = Number(mergedArgs.limit);

      setArgs(mergedArgs as ICommonPagination);
      setSearchParams(buildSearchParams(mergedArgs));
    },
    [searchParams, setSearchParams, userData?.companyId]
  );

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IViewLogRes> | SorterResult<IViewLogRes>[]
  ) => {
    if (!Array.isArray(sorter)) {
      updateParamsAndArgs({
        page: pagination.current ?? 1,
        limit: pagination.pageSize ?? 10,
        sort_by: sorter.order ? String(sorter.field) : '',
        sort_order: getSortOrder(sorter.order) || ''
      });
    }
  };

  const getAlertClassName = (type?: string): string => {
    switch (type) {
      case ALERT_TYPE.ALERT:
        return 'bgRed';
      case ALERT_TYPE.WARNING:
        return 'bgYellow';
      default:
        return '';
    }
  };

  const renderCell = useCallback(
    (data?: { type?: string; value?: number; problem?: ILogProblemRes[] }) => {
      const className = getAlertClassName(data?.type);
      const hasAlert = Boolean(className);
      const firstProblem = data?.problem?.[0];

      const handleClick = () => {
        if (!hasAlert || !firstProblem) return;
        setIsPopupModal(true);
        setProblemData({
          problem: firstProblem.problem || '',
          solution: firstProblem.solution || '',
          field: firstProblem.field || ''
        });
      };

      return (
        <div
          className={`loss-cell ${className || ''}`}
          style={hasAlert ? { cursor: 'pointer' } : undefined}
          title={hasAlert ? 'Click here to show problem & solution' : undefined}
          onClick={hasAlert ? handleClick : undefined}
        >
          {data?.value ?? '-'}
        </div>
      );
    },
    []
  );

  const columns = useMemo<ColumnsType<any>>(() => {
    const baseColumns: ColumnsType<any> = [
      {
        title: 'Creator & Timestamp',
        dataIndex: 'creator',
        key: 'creator',
        // width: 200,
        render: (_: any, record: IViewLogRes) => (
          <div className="updateUser">
            <figure>
              <img
                src={`${record?.userProfileImage ? `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${record?.userProfileImage}` : toAbsoluteUrl('/icons/placeHolder.jpg')}`}
                alt="user"
              />
            </figure>
            <div>
              <h4>{record?.userFirstName + ' ' + record?.userLastName}</h4>
              <span>
                {record?.createdAt ? dayjs(record?.createdAt).format('MM/DD/YY HH:mm') : null}
              </span>
            </div>
          </div>
        )
      },
      {
        title: 'Facility Name',
        key: 'facilityName',
        dataIndex: 'facilityName',
        render: (value) => value || '-'
      },
      {
        title: 'Make / Model',
        key: 'ChillerNo',
        dataIndex: 'ChillerNo',
        // width: 165,
        render: (_: any, record: IViewLogRes) => (
          <div className="chillerNameWrap">
            <a className="chillerName">{record?.chillerName || '-'}</a>
            <span>{record?.ChillerNo || '-'}</span>
          </div>
        ),
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'ChillerNo')
      },
      {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        // width: 165,
        render: (value) => (value ? dayjs(value).format('MM/DD/YY HH:mm') : '-'),
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'updatedAt')
      },
      {
        title: 'Efficiency Loss %',
        key: 'effLoss',
        dataIndex: 'effLoss',
        // width: 185,
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'effLoss'),
        render: renderCell
      },
      {
        title: 'Cond. App. Loss %',
        key: 'condAppLoss',
        dataIndex: 'condAppLoss',
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'condAppLoss'),
        render: renderCell
      },
      {
        title: 'Evap. App. Loss %',
        key: 'evapAppLoss',
        dataIndex: 'evapAppLoss',
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'evapAppLoss'),
        render: renderCell
      },
      {
        title: 'Non-Cond. App. Loss %',
        key: 'nonCondLoss',
        dataIndex: 'nonCondLoss',
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'nonCondLoss'),
        render: renderCell
      },
      {
        title: 'Other Losses %',
        key: 'otherLoss',
        dataIndex: 'otherLoss',
        // width: 165,
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'otherLoss'),
        render: renderCell
      }
    ];

    const actionColumn: ColumnsType<any>[number] =
      hasPermission('log', 'edit') || hasPermission('log', 'view')
        ? {
            title: '',
            key: '_id',
            dataIndex: '_id',
            fixed: 'right' as any,
            render: (id: string) => (
              <div className="actionIonWrap">
                {hasPermission('log', 'edit') && (
                  <Link className="actionIcon" to={ROUTES.EDIT_LOG_ENTRY(id)}>
                    <EditIcon />
                  </Link>
                )}
                {hasPermission('log', 'view') && (
                  <Link className="actionIcon" to={ROUTES.VIEW_LOG_ENTRY(id)}>
                    <EyeOutlined />
                  </Link>
                )}
              </div>
            )
          }
        : {};

    return [...baseColumns, actionColumn];
  }, [args?.sort_by, args?.sort_order, renderCell]);

  const getColumnTitle = (key: string) => {
    const title = columns.find((col) => col.key === key)?.title;
    return typeof title === 'function' ? key : title;
  };

  const requiredColumnKeys = ['creator', 'facilityName', 'ChillerNo'];

  const menu = (
    <div className="chillerColumns">
      <ul className="chillerColumnsList">
        {toggleableColumnKeys?.map((key) => (
          <li key={key}>
            <Checkbox
              checked={visibleColumns[key]}
              disabled={requiredColumnKeys.includes(key)}
              onChange={() => handleColumnToggle(key)}
            >
              <span className="checkboxLabelTitle">{getColumnTitle(key)}</span>
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  );

  const handleColumnToggle = (key: string) => {
    if (requiredColumnKeys.includes(key)) return;
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredColumns = useMemo(() => {
    return [
      ...columns.filter((col) => {
        if (!col?.key) return true;
        if (col?.key === '_id') return true; // Always include the action column
        return visibleColumns[col.key as string];
      })
    ];
  }, [columns, visibleColumns]);

  const exportLog = () => {
    exportLogAction(
      { logIds },
      {
        onSuccess: async (res) => {
          const fileName = res?.data?.name;
          if (!fileName) return;
          const excelPath = `${IMAGE_URL}tmp-chiller-check/logs/${fileName}`;
          const a = document.createElement('a');
          a.href = excelPath;
          a.download = fileName; // Optional — helps set filename on some browsers
          document.body.appendChild(a);
          a.click();
          a.remove();
          showToaster('success', res?.message || 'Export Successfully.');
          setLogIds([]);
          queryClient.invalidateQueries({ queryKey: logQueryKeys.all });
        },
        onError: (err) => {
          showToaster('error', err?.message || err?.message?.[0] || 'Something went wrong');
        }
      }
    );
  };

  const props = {
    accept: '.xlsx',
    beforeUpload: (file: any) => {
      const isXLSX =
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      if (!isXLSX) {
        message.error(`${file.name} is not a valid XLSX file`);
      } else {
        setFileList([file]);
      }
      return false; // prevent automatic upload
    },
    showUploadList: false
  };
  const handleRemove = () => {
    setFileList([]);
  };

  const formatFileSize = (bytes: any) => {
    if (bytes >= 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    } else if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } else if (bytes >= 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else {
      return `${bytes} B`;
    }
  };

  const submitImport = () => {
    if (!fileList?.length) {
      message.warning('Please select a file first!');
      return;
    }

    const fileObj: any = fileList?.[0]; // Fallback if not from Upload

    if (!(fileObj instanceof Blob)) {
      message.error('Invalid file format!');
      return;
    }
    setLoading(true); // start loader
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      localStorage.setItem(LocalStorageKeys.EXCEL_FILE, base64String);
      localStorage.setItem(
        LocalStorageKeys.FILE_TYPE,
        fileObj?.type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      setLoading(false);
      navigate(ROUTES.SUMMARY);
    };

    reader.onerror = () => {
      setLoading(false); // also stop loader on error
      message.error('Failed to read the file.');
    };

    reader.readAsDataURL(fileObj); // ✅ No deprecation
  };

  const downloadFile = () => {
    try {
      const excelPath = `${IMAGE_URL}chiller-check/bulkImportLogs.xlsx?uuid=${Date.now()}`;
      const a = document.createElement('a');
      a.href = excelPath;
      const fileName = `bulkImportLogs_${Date.now()}.xlsx`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      if (error) showToaster('error', 'Failed to download file. Please try again later.');
    }
  };

  return (
    <Wrapper>
      {loading && <Loader />}
      <Meta title="Log Entries" />
      <HeaderToolbar
        title="Log Entries"
        button={
          <div className="logButtonWrap">
            {hasPermission('log', 'view') && (
              <Button
                type="primary"
                className="title-btn"
                size="small"
                onClick={exportLog}
                icon={<UploadOutlined />}
                disabled={!logIds?.length || isPending}
                loading={isPending}
              >
                Export ({logIds?.length})
              </Button>
            )}
            {hasPermission('log', 'add') && (
              <Button
                type="primary"
                className="title-btn"
                size="small"
                icon={<DownloadOutlined />}
                onClick={() => setIsModalOpen(true)}
              >
                Import
              </Button>
            )}
            {hasPermission('log', 'add') && (
              <Link to={ROUTES.ADD_LOG_ENTRY}>
                <Button type="primary" className="title-btn" size="small" icon={<PlusOutlined />}>
                  Add Log
                </Button>
              </Link>
            )}
            {hasPermission('log', 'view') && (
              <Dropdown overlay={menu} trigger={['click']}>
                <Button
                  type="primary"
                  className="title-btn"
                  size="small"
                  icon={<SlidersOutlined />}
                >
                  Columns
                </Button>
              </Dropdown>
            )}
          </div>
        }
      />
      <ShadowPaper>
        <div className="chillerContentHeader">
          <div className="dropdownWrap">
            {hasPermission('log', 'view') && (
              <div>
                <label className="peakLoad">Peak Load</label>
                <Switch
                  value={args?.peakLoad || false}
                  onChange={(e) => updateParamsAndArgs({ page: 1, peakLoad: e })}
                />
              </div>
            )}
            <RenderSelectDropDown
              colClassName="dropdownWithSearch"
              inputProps={{
                value: isCompanyLoading ? null : selectedCompanyId,
                disabled: isCompanyLoading || !!userData?.companyId,
                placeholder: 'Select Company',
                options: companyOptions || [],
                onChange: handleSelectChange
              }}
            />

            <RenderSelectDropDown
              colClassName="dropdownWithSearch"
              inputProps={{
                value: isFacilityListCompanyLoading ? null : selectedFacilityId,
                disabled: isFacilityListCompanyLoading || !selectedCompanyId,
                placeholder: 'Select Facility',
                options: facilityOptionsCompany || [],
                onChange: handleSelectFacilityChange
              }}
            />

            <RenderSelectDropDown
              colClassName="dropdownWithSearch"
              inputProps={{
                value: isChillerLoading ? null : selectedChillerId,
                placeholder: 'Select Chiller',
                options: chillerOptions || [],
                disabled: !selectedFacilityId || isChillerLoading,
                onChange: handleSelectChillerChange
              }}
            />
          </div>
          <Input
            className="searchChiller"
            placeholder="Search for Chillers"
            prefix={<SearchOutlined />}
            value={searchVal}
            onChange={handleSearchChange}
          />
        </div>

        <CommonTable
          columns={filteredColumns}
          dataSource={data?.logList || []}
          scroll={{ x: 1700 }}
          loading={isLoading}
          pagination={{
            current: args?.page,
            pageSize: args?.limit,
            total: data?.totalRecords || 0
          }}
          rowSelection={
            hasPermission('log', 'view')
              ? {
                  selectedRowKeys: logIds,
                  columnWidth: 60,
                  onChange: (selectedRowKeys: any) => {
                    setLogIds(selectedRowKeys);
                  },
                  preserveSelectedRowKeys: true // <-- Important!
                }
              : undefined
          }
          onChange={handleTableChange}
          emptyText={
            <EmptyState
              isEmpty={isEmpty}
              search={args.search || args.companyId || args.facilityId || args.chillerId}
              searchDescription="No Log Found"
              defaultDescription="No Data Found"
            />
          }
        />
      </ShadowPaper>

      {isModalOpen && (
        <CommonModal
          open={isModalOpen}
          closeIcon={true}
          closable={true}
          centered={true}
          width={700}
          maskClosable={false}
          className="csvModal"
          title={
            <div className="modalTitleWrapper">
              <span className="main-title">Import Excel File</span>
            </div>
          }
          onCancel={() => {
            setIsModalOpen(false);
            setFileList([]);
          }}
        >
          <div className="downloadTemplate">
            <span className="download-icon">
              <DownloadTemplateIcon />
            </span>
            <div className="contentDownload">
              <h3>Download Template</h3>
              <p>
                You can download the template using the "Download" button. Only files with the same
                extension as the downloaded sample are allowed.
              </p>
            </div>
            <Button className="title-cancel-btn download-btn" onClick={downloadFile}>
              Download
            </Button>
          </div>

          <div className="csvUploadWrapper">
            {fileList.length === 0 ? (
              <Dragger {...props}>
                <span className="cloudIcon">
                  <CloudUploadOutlined color="#000ABC" />
                </span>
                <p className="dragItem">
                  Drag and drop your file here or{' '}
                  <a className="browseFile" href="#">
                    browse file
                  </a>
                </p>
                <p className="csvSupport">Supports: xlsx</p>
              </Dragger>
            ) : (
              <div className="csvViewWrapper">
                <div>
                  <FileExcelFilled className="excel-icon" />
                </div>
                <div className="csvName">
                  <p className="fileName">{fileList?.[0]?.name ?? '-'}</p>
                  <p className="fileSize">
                    {fileList?.[0]?.size && formatFileSize(fileList[0].size)}
                  </p>
                </div>
                <DeleteOutlined
                  onClick={handleRemove}
                  style={{ marginLeft: 'auto', color: '#040C2B', cursor: 'pointer' }}
                />
              </div>
            )}
          </div>

          <div className="modalFooter">
            <Button
              type="primary"
              className="title-btn"
              size="small"
              disabled={!fileList?.length}
              onClick={submitImport}
            >
              Submit
            </Button>
          </div>
        </CommonModal>
      )}
      {isPopupModal && (
        <CommonModal
          open={isPopupModal}
          closeIcon={true}
          closable={true}
          centered={true}
          width={800}
          className="problemSolutionModal"
          title={
            <div className="modalTitleWrapper">
              <ExclamationCircleOutlined style={{ color: '#FEBE00', fontSize: '22px' }} />
              <h2>{problemData?.field || '-'}</h2>
            </div>
          }
          onCancel={() => {
            setIsPopupModal(false);
            setProblemData(null);
          }}
        >
          <div className="problemSolutionModalContent">
            <h3>Problem:</h3>
            <p>Here are the things you can check</p>
            <p
              dangerouslySetInnerHTML={{
                __html: problemData?.problem || '-'
              }}
            />
            <h3>Solution:</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: problemData?.solution || '-'
              }}
            />
          </div>
        </CommonModal>
      )}
    </Wrapper>
  );
};

export default LogEntry;
