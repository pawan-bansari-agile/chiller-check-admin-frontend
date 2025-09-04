import React, { useEffect, useMemo, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  AuditOutlined,
  BankOutlined,
  CalendarOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import { Button, Dropdown, Tag } from 'antd';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
} from 'chart.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Bar, Line } from 'react-chartjs-2';

import { reportHooks } from '@/services/report';
import { UserList } from '@/services/report/types';

import Details from '@/shared/components/common/Details';
import { RenderSelectDropDown } from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import {
  CHART_DROPDOWN,
  ChartType,
  DateRange,
  IMAGE_MODULE_NAME,
  IMAGE_URL,
  NotificationType,
  Role
} from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { EditIcon, FacilityIcon, SettingIcon, User } from '@/shared/svg';
import {
  formatPhoneNumberInUsFormat,
  generateColors,
  hasPermission,
  showToaster,
  toAbsoluteUrl
} from '@/shared/utils/functions';

import { capitalizeFirstLetter } from '../../../shared/utils/functions';
import { Wrapper } from '../style';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
  BarElement
);

dayjs.extend(utc);

const columns = [
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
    width: 200,
    render: (_: any, record: UserList) => (
      <div className="updateUser">
        <figure>
          <img
            src={`${record?.profileImage ? `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${record?.profileImage}` : toAbsoluteUrl('/icons/placeHolder.jpg')}`}
            alt="user"
          />{' '}
        </figure>
        <h4>{record?.firstName + ' ' + record?.lastName}</h4>
      </div>
    )
  },
  {
    title: 'Role',
    key: 'role',
    dataIndex: 'role',
    render: (role: string) => Role?.find((val) => val?.value === role)?.label || '-'
  },
  {
    title: 'Email Address',
    key: 'email',
    dataIndex: 'email'
  },
  {
    title: 'Phone Number',
    key: 'phoneNumber',
    dataIndex: 'phoneNumber',
    render: formatPhoneNumberInUsFormat
  },
  {
    title: 'Company Name',
    key: 'company',
    dataIndex: 'company',
    render: (data: { name: string }) => data?.name || '-'
  },
  {
    title: 'Facilities',
    key: 'facilities',
    dataIndex: 'facilities',
    render: (data: { name: string }[]) => {
      return data?.map((fac) => fac?.name)?.join(', ') || '-';
    }
  },
  {
    title: 'Status',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (status: any) => (
      <Tag className="statusTag" color={status ? '#00A86B' : '#CF5439'}>
        {status ? 'Active' : 'Inactive'}
      </Tag>
    )
  },
  ...(hasPermission('users', 'view')
    ? [
        {
          title: '',
          key: '_id',
          dataIndex: '_id',
          render: (id: string) => (
            <div className="actionIonWrap">
              {hasPermission('users', 'view') && (
                <Link className="actionIcon" to={ROUTES.VIEW_USER_MANAGEMENT(id)}>
                  <EyeOutlined />
                </Link>
              )}
            </div>
          )
        }
      ]
    : [])
];

const ViewReport: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [args, setArgs] = useState<{ id: string; isFacility: boolean }>({
    id: id || '',
    isFacility: true
  });
  const { data: reportData, isLoading: isReportViewLoading, error } = reportHooks.ReportView(id!);
  const { data: reportChartData, isLoading: isReportChartLoading } =
    reportHooks.ReportChartList(args);
  const { mutate: exportAction, isPending } = reportHooks.useExportReport();

  const [isLoader, setIsLoader] = useState(false);
  const [selectedChartDataType, setSelectedChartDataType] = useState(CHART_DROPDOWN[0]?.value);

  useEffect(() => {
    if (error) {
      showToaster('error', error?.message || error?.message?.[0] || 'Something went wrong');
    }
  }, [error]);

  useEffect(() => {
    if (id) {
      setArgs((prevArgs) => ({
        ...prevArgs,
        id
      }));
    }
  }, [id]);

  useEffect(() => {
    setArgs((prevArgs) => ({
      ...prevArgs,
      isFacility: selectedChartDataType === CHART_DROPDOWN?.[0]?.value
    }));
  }, [selectedChartDataType]);

  const saveFullPageAsPDF = async () => {
    setIsLoader(true);
    const element: any = document.getElementById('capture-area');

    if (!element) {
      setIsLoader(false);
      return;
    }

    // Save old styles
    const oldOverflow = element.style.overflow;
    const oldHeight = element.style.height;

    // Expand full content
    element.style.overflow = 'visible';
    element.style.height = 'auto';

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });

      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = await import('jspdf');

      const pdf = new jsPDF('p', 'mm', 'a2');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`report_${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      // Restore styles
      element.style.overflow = oldOverflow;
      element.style.height = oldHeight;
      setIsLoader(false);
    }
  };

  const menu = {
    items: [
      {
        key: 'pdf',
        label: 'Save as PDF',
        onClick: () => saveFullPageAsPDF()
      },
      {
        key: 'excel',
        label: 'Save as Excel',
        onClick: () => exportReport()
      }
    ]
  };

  const chartData = useMemo(() => {
    const datasetsCount = reportChartData?.datasets?.length || 0;
    const colors = generateColors(datasetsCount);

    return {
      labels: reportChartData?.labels || [],
      datasets:
        reportChartData?.datasets?.map(({ label, data }: any, index: number) => {
          const color = colors[index];
          return {
            label,
            data,
            fill: true,
            tension: 0.4,
            backgroundColor: color.bg,
            borderColor: color.border,
            pointBackgroundColor: color.border
          };
        }) || []
    };
  }, [reportChartData]);

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => `${context.dataset.label}: ${context.parsed.y}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: reportChartData?.parameter || '',
            font: {
              size: 14,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 10
            }
          },
          ticks: {
            stepSize: 5
          }
        }
      }
    }),
    [reportChartData]
  );

  const exportReport = () => {
    exportAction(args, {
      onSuccess: async (res) => {
        if (!res?.data?.name) return showToaster('error', 'No data found to export.');
        const fileName = res?.data?.name;
        if (!fileName) return;
        const excelPath = `${IMAGE_URL}tmp-chiller-check/report/${fileName}`;
        const a = document.createElement('a');
        a.href = excelPath;
        a.download = fileName; // Optional — helps set filename on some browsers
        document.body.appendChild(a);
        a.click();
        a.remove();
        showToaster('success', res?.message || 'Export Successfully.');
      },
      onError: (err) => {
        showToaster('error', err?.message || err?.message?.[0] || 'Something went wrong');
      }
    });
  };

  return (
    <Wrapper>
      {(isReportViewLoading || isLoader || isReportChartLoading || isPending) && <Loader />}
      <Meta title="Reports" />
      <HeaderToolbar
        title="View Report"
        backBtn={true}
        button={
          <div className="viewButtonWrap">
            {hasPermission('report', 'view') && (
              <Dropdown menu={menu} trigger={['click']}>
                <Button type="primary" className="title-btn">
                  Export <DownOutlined />
                </Button>
              </Dropdown>
            )}
            {hasPermission('report', 'edit') && (
              <Button
                onClick={() => navigate(ROUTES.EDIT_REPORT(id!))}
                type="primary"
                className="title-btn"
                size="small"
                icon={<EditIcon />}
              >
                Edit
              </Button>
            )}
          </div>
        }
      />

      <div className="shadowPaperWrap" id="capture-area">
        <ShadowPaper>
          <p className="headerFooterViewContent">
            <p dangerouslySetInnerHTML={{ __html: reportData?.header || '' }} />
          </p>
        </ShadowPaper>

        <ShadowPaper>
          <ul className="reportDetailsList">
            <Details
              detailsTitle="Report Name"
              detailsDescription={reportData?.name || '-'}
              detailsIcon={<AuditOutlined />}
            />
            <Details
              detailsTitle="Start Date and End Date"
              detailsDescription={
                reportData?.dateType === DateRange['Custom Range']
                  ? `${reportData?.dateType} (${dayjs.utc(reportData?.startDate).format('MM/DD/YYYY')} to ${dayjs.utc(reportData?.endDate).format('MM/DD/YYYY')})`
                  : reportData?.dateType
              }
              detailsIcon={<CalendarOutlined />}
            />
            <Details
              detailsTitle="Automated Notification"
              detailsDescription={
                reportData?.notification?.toLowerCase() === NotificationType.BOTH?.toLowerCase()
                  ? 'Web & Email'
                  : capitalizeFirstLetter(reportData?.notification) || '-'
              }
              detailsIcon={<NotificationOutlined />}
            />
            <Details
              detailsTitle="Parameter"
              detailsDescription={reportData?.parameter || '-'}
              detailsIcon={<SettingIcon />}
            />
            <Details
              detailsTitle="Company"
              detailsDescription={reportData?.companyName || '-'}
              detailsIcon={<BankOutlined />}
            />
            <Details
              detailsTitle="Facilities"
              detailsDescription={reportData?.facilityNames?.join(', ') || '-'}
              detailsIcon={<FacilityIcon />}
            />
            <Details
              detailsTitle="Report Owner"
              detailsDescription={
                reportData?.createdByUser?.firstName + ' ' + reportData?.createdByUser?.lastName
              }
              detailsIcon={<User />}
            />
            <Details
              detailsTitle="Description"
              detailsDescription={reportData?.description || '-'}
              detailsIcon={<ExclamationCircleOutlined />}
              className="descriptionDetails"
            />
          </ul>
        </ShadowPaper>

        <ShadowPaper>
          <RenderSelectDropDown
            colClassName="dropdownWithSearch graph-dropdown"
            inputProps={{
              value: selectedChartDataType,
              allowClear: false,
              placeholder: 'Select',
              options: CHART_DROPDOWN,
              onChange: (value) => setSelectedChartDataType(value)
            }}
          />
          <div className="chartWrapper">
            <div className="reportLineChart">
              {reportData?.chartType === ChartType['Line Chart'] ? (
                <Line
                  data={chartData}
                  options={{ ...options, responsive: true, maintainAspectRatio: false } as any}
                />
              ) : reportData?.chartType === ChartType['Bar Chart'] ? (
                <Bar
                  data={chartData}
                  options={{ ...options, responsive: true, maintainAspectRatio: false } as any}
                />
              ) : (
                <p>No chart available</p>
              )}
            </div>
          </div>
        </ShadowPaper>

        <ShadowPaper>
          <div className="reportContentHeader">
            <div className="dropdownWrap">
              <h2 className="notifyUser themeColor">
                Notify Users [{reportData?.sharedUser?.length || 0}]
              </h2>
            </div>
          </div>
          <CommonTable
            columns={columns}
            dataSource={reportData?.sharedUser || []}
            pagination={false}
          />
        </ShadowPaper>

        <ShadowPaper>
          <p className="headerFooterViewContent">
            <p dangerouslySetInnerHTML={{ __html: reportData?.footer || '' }} />
          </p>
        </ShadowPaper>
      </div>

      <div className="viewButtonWrap extraActionButton">
        {hasPermission('report', 'view') && (
          <Dropdown menu={menu} trigger={['click']}>
            <Button type="primary" className="title-btn">
              Export <DownOutlined />
            </Button>
          </Dropdown>
        )}
        {hasPermission('report', 'edit') && (
          <Button
            onClick={() => navigate(ROUTES.EDIT_REPORT(id!))}
            type="primary"
            className="title-btn"
            size="small"
            icon={<EditIcon />}
          >
            Edit
          </Button>
        )}
      </div>
    </Wrapper>
  );
};

export default ViewReport;
