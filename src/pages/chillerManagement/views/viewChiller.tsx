import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { CheckSquareOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Tabs } from 'antd';

import { chillerHooks, chillerQueryKeys } from '@/services/chiller';
import { IChillerViewRes } from '@/services/chiller/types';
import { companyQueryKeys } from '@/services/company';
import { dashboardQueryKey } from '@/services/dashboard';
import { facilityQueryKeys } from '@/services/facility';
import { logQueryKeys } from '@/services/log';
import { maintenanceQueryKey } from '@/services/maintenance';
import { reportQueryKey } from '@/services/report';
import { userQueryKeys } from '@/services/user';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import CommonModal from '@/shared/components/common/Modal/components/CommonModal';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { ROUTES } from '@/shared/constants/routes';
import { EditIcon, FileIcon } from '@/shared/svg';
import { hasPermission, showToaster } from '@/shared/utils/functions';

import AnalyticsTab from '../components/AnalyticsTab';
import DetailsTab from '../components/DetailsTab';
import TimelineTab from '../components/TimelineTab';
import { Wrapper } from '../style';

const chillerStatus = {
  Active: 'Active',
  Inactive: 'Inactive',
  Pending: 'Pending'
};

const ViewChiller = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: chillerData, isLoading } = chillerHooks.ChillerView(id!);
  const { mutate: activeInactiveAction, isPending } = chillerHooks.useActiveInactiveChiller();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const activeInactiveChiller = () => {
    const payload = {
      id: id || '',
      status:
        chillerData?.status === chillerStatus?.Active
          ? chillerStatus?.Inactive
          : chillerStatus?.Active
    };
    activeInactiveAction(payload, {
      onSuccess: (res) => {
        showToaster('success', res?.data || 'Chiller Status Updated.');
        queryClient.invalidateQueries({ queryKey: facilityQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: chillerQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: logQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: maintenanceQueryKey.all });
        queryClient.invalidateQueries({ queryKey: reportQueryKey.all });
        queryClient.invalidateQueries({ queryKey: dashboardQueryKey.all });

        setIsModalOpen(false);
      },
      onError: (err) => {
        showToaster('error', err?.message || err?.message?.[0] || 'Something went wrong');
      }
    });
  };
  return (
    <Wrapper>
      {isLoading && <Loader />}
      <Meta title="Chiller Management" />
      <HeaderToolbar
        title="View Chiller"
        backBtn={true}
        button={
          <div className="viewButtonWrap">
            {hasPermission('chiller', 'toggleStatus') &&
              chillerData?.status !== chillerStatus.Pending && (
                <Button className="title-cancel-btn" onClick={() => setIsModalOpen(true)}>
                  {chillerData?.status === chillerStatus.Active ? 'Inactivate' : 'Activate'}
                </Button>
              )}
            {hasPermission('chiller', 'edit') && (
              <Button
                onClick={() => navigate(ROUTES.Edit_CHILLER_MANAGEMENT(id!))}
                className="title-btn"
                type="primary"
                icon={<EditIcon />}
              >
                Edit
              </Button>
            )}
            {hasPermission('log', 'view') && (
              <Button
                className="title-btn"
                type="primary"
                icon={<FileIcon />}
                onClick={() => {
                  const params = new URLSearchParams({
                    page: '1',
                    limit: '10',
                    companyId: chillerData?.companyId ?? '',
                    facilityId: chillerData?.facilityId ?? '',
                    chillerId: id ?? ''
                  });
                  navigate(`${ROUTES.LOG_ENTRY}?${params.toString()}`);
                }}
              >
                Log Entries
              </Button>
            )}
          </div>
        }
      />
      <div className="shadowWrap">
        <ShadowPaper>
          <Tabs defaultActiveKey="1" destroyInactiveTabPane={false} className="userTab">
            <Tabs.TabPane tab="Analytics" key="1" forceRender>
              {chillerData && (
                <AnalyticsTab
                  recentReadings={chillerData?.recentReadingAnalysis}
                  performanceSummary={chillerData?.performanceSummary}
                  purgeData={chillerData?.purgeData}
                  compressorRunHours={chillerData?.compressorRunHours}
                  facilityTimezone={chillerData?.facilityTimezone}
                />
              )}
            </Tabs.TabPane>

            <Tabs.TabPane tab="Details" key="2" forceRender>
              {chillerData && <DetailsTab chillerData={chillerData as IChillerViewRes} />}
            </Tabs.TabPane>

            <Tabs.TabPane tab="Timeline" key="3" forceRender>
              {id && <TimelineTab id={id} />}
            </Tabs.TabPane>
          </Tabs>
        </ShadowPaper>
        <div className="viewButtonWrap extraActionButton">
          {hasPermission('chiller', 'toggleStatus') &&
            chillerData?.status !== chillerStatus.Pending && (
              <Button className="title-cancel-btn" onClick={() => setIsModalOpen(true)}>
                {chillerData?.status === chillerStatus.Active ? 'Inactivate' : 'Activate'}
              </Button>
            )}
          {hasPermission('chiller', 'edit') && (
            <Button
              onClick={() => navigate(ROUTES.Edit_CHILLER_MANAGEMENT(id!))}
              className="title-btn"
              type="primary"
              icon={<EditIcon />}
            >
              Edit
            </Button>
          )}
          {hasPermission('log', 'view') && (
            <Button
              className="title-btn"
              type="primary"
              icon={<FileIcon />}
              onClick={() => {
                const params = new URLSearchParams({
                  page: '1',
                  limit: '10',
                  companyId: chillerData?.companyId ?? '',
                  facilityId: chillerData?.facilityId ?? '',
                  chillerId: id ?? ''
                });
                navigate(`${ROUTES.LOG_ENTRY}?${params.toString()}`);
              }}
            >
              Log Entries
            </Button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <CommonModal
          open={isModalOpen}
          closeIcon={true}
          closable={true}
          centered={true}
          maskClosable={false}
          className="InactiveModalWrap"
          title={
            <div className="modalTitleWrapper">
              <i>
                {chillerData?.status === chillerStatus.Active ? (
                  <ExclamationCircleOutlined style={{ color: '#FEBE00' }} />
                ) : (
                  <CheckSquareOutlined style={{ color: '#00A86B' }} />
                )}
              </i>
              <span className="main-title">
                {chillerData?.status === chillerStatus.Active
                  ? 'Inactivate Chiller'
                  : 'Activate Chiller'}
              </span>
            </div>
          }
          onCancel={() => setIsModalOpen(false)}
        >
          <p>
            {chillerData?.status === chillerStatus.Active
              ? `The past logs of the chiller will remain as it is. The analytics and energy data will be reflected as the chiller is now inactive.`
              : 'The chiller will be activated back and the operators assigned that chiller will now be able to add log entries under that chiller.'}
          </p>
          <div className="modalFooter">
            <Button onClick={() => setIsModalOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button
              className="footerBtn"
              onClick={activeInactiveChiller}
              loading={isPending}
              disabled={isPending}
            >
              {chillerData?.status === chillerStatus.Active ? 'Inactivate' : 'Activate'}
            </Button>
          </div>
        </CommonModal>
      )}
    </Wrapper>
  );
};

export default ViewChiller;
