import React, { useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import {
  AuditOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  FileOutlined
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Row } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { chillerQueryKeys } from '@/services/chiller';
import { companyQueryKeys } from '@/services/company';
import { dashboardQueryKey } from '@/services/dashboard';
import { facilityQueryKeys } from '@/services/facility';
import { logQueryKeys } from '@/services/log';
import { maintenanceHooks, maintenanceQueryKey } from '@/services/maintenance';
import { reportQueryKey } from '@/services/report';
import { userQueryKeys } from '@/services/user';

import CardWithTitle from '@/shared/components/common/CardWithTitle';
import Details from '@/shared/components/common/Details';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import CommonModal from '@/shared/components/common/Modal/components/CommonModal';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { IMAGE_MODULE_NAME, IMAGE_URL, TimezoneEnum } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { ChillerIcon, EditIcon } from '@/shared/svg';
import { hasPermission, showToaster, toAbsoluteUrl } from '@/shared/utils/functions';

import { Wrapper } from '../style';

dayjs.extend(utc);
dayjs.extend(timezone);

const maintenanceConfig: Record<
  string,
  {
    label: string;
    fieldName: string;
  }
> = {
  'Major Repair': {
    label: 'Major Repair Description',
    fieldName: 'maintDescription'
  },
  'Date Oil Added': {
    label: 'Quantity of Oil Added (quarts)',
    fieldName: 'maintQuantity'
  },
  'Purge Tank Reclaim Date': {
    label: 'Purge Run Time Reading When Tank Reclaimed',
    fieldName: 'purgeReading'
  },
  'Date Refrigerant Added': {
    label: 'Quantity of Refrigerant Added (lb.)',
    fieldName: 'maintQuantity'
  }
};

const ViewMaintenance: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = maintenanceHooks.MaintenanceView(id!);
  const { mutate: deleteAction, isPending: isDeletePending } =
    maintenanceHooks.useDeleteMaintenance();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { readingDateTime } = useMemo(() => {
    const zone =
      TimezoneEnum[data?.facility?.timezone as keyof typeof TimezoneEnum] || TimezoneEnum.EST;

    const readingTime = data?.maintenanceDate
      ? dayjs.utc(data.maintenanceDate).tz(zone).format('MM/DD/YYYY hh:mm A')
      : null;

    return {
      readingDateTime: readingTime
    };
  }, [data?.maintenanceDate, data?.facility?.timezone]);

  const deleteMaintenance = () => {
    deleteAction(id || '', {
      onSuccess: (res) => {
        showToaster('success', res?.message);
        setIsModalOpen(false);
        navigate(ROUTES.MAINTENANCE, { replace: true });
        queryClient.invalidateQueries({ queryKey: facilityQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: chillerQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: logQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: maintenanceQueryKey.all });
        queryClient.invalidateQueries({ queryKey: reportQueryKey.all });
        queryClient.invalidateQueries({ queryKey: dashboardQueryKey.all });
      },
      onError: (err) => {
        showToaster('error', err?.message || err?.message?.[0] || 'Something went wrong');
      }
    });
  };

  const getDynamicDetails = (type: string | undefined, data: any) => {
    const config = maintenanceConfig[type ?? ''];
    if (!config) return null;

    return {
      label: config.label,
      value: data?.[config.fieldName] ?? '-'
    };
  };

  const dynamicDetails = getDynamicDetails(data?.maintenanceType, data);

  return (
    <Wrapper>
      {isLoading && <Loader />}
      <Meta title="View Maintenance Record" />
      <HeaderToolbar
        title="View Maintenance Record"
        backBtn={true}
        button={
          <div className="maintenanceButtonWrap">
            {hasPermission('maintenance', 'toggleStatus') && (
              <Button
                className="delete-btn"
                icon={<DeleteOutlined />}
                onClick={() => setIsModalOpen(true)}
              >
                Delete
              </Button>
            )}
            {hasPermission('maintenance', 'edit') && (
              <Button
                className="title-btn"
                type="primary"
                shape="round"
                icon={<EditIcon />}
                onClick={() => navigate(ROUTES.EDIT_MAINTENANCE(id!))}
              >
                Edit
              </Button>
            )}
          </div>
        }
      />
      <Row className="mainFirstRow">
        <Col xs={24} sm={24} md={24} lg={24}>
          <ShadowPaper>
            <ul className="maintenanceDetails">
              <Details
                detailsTitle={data?.chiller?.ChillerNo || '-'}
                detailsDescription={data?.chiller?.serialNumber || '-'}
                detailsIcon={<ChillerIcon />}
              />
              <Details
                detailsTitle={data?.chillerName || '-'}
                detailsDescription
                detailsIcon={<AuditOutlined />}
              />
              <Details
                detailsTitle={`${data?.chiller?.manufacturedYear ?? '-'} ${data?.chiller?.refrigType || '-'}`}
                detailsDescription
                detailsIcon={<FileOutlined />}
              />
              <Details
                detailsTitle={data?.createdByUser?.firstName + ' ' + data?.createdByUser?.lastName}
                detailsDescription={
                  data?.createdAt ? dayjs(data?.createdAt).format('MM/DD/YY HH:mm') : '-'
                }
                detailsIcon={
                  <figure className="viewImgaeMaintenance">
                    <img
                      src={`${data?.createdByUser?.profileImage ? `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${data?.createdByUser?.profileImage}` : toAbsoluteUrl('/icons/placeHolder.jpg')}`}
                      alt="user"
                    />
                  </figure>
                }
              />
              <Details
                detailsTitle={data?.updatedAt ? dayjs(data?.updatedAt).format('MM/DD/YY') : '-'}
                detailsDescription={
                  data?.updatedAt ? dayjs(data?.updatedAt).format('hh:mm A') : '-'
                }
                detailsIcon={<ClockCircleOutlined />}
              />
            </ul>
          </ShadowPaper>
        </Col>
      </Row>

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={12} lg={8} className="rowWrapMaintenanace">
          <Row className="maintenanceRow">
            <Col xs={24} sm={24} md={24} lg={24} className="generalCol maintenanceCol">
              <CardWithTitle title="General" className="maintenanceCardRow">
                <ul className="generalList">
                  <Details
                    detailsTitle="Maintenance Date & Time"
                    detailsDescription={
                      readingDateTime ? `${readingDateTime} ${data?.facility?.timezone}` : '-'
                    }
                    detailsIcon
                  />
                  <Details
                    detailsTitle="Category"
                    detailsDescription={data?.maintenanceCategory || '-'}
                    detailsIcon
                  />
                  <Details
                    detailsTitle="Type"
                    detailsDescription={data?.maintenanceType || '-'}
                    detailsIcon
                  />
                  {dynamicDetails && (
                    <Details
                      detailsTitle={dynamicDetails?.label}
                      detailsDescription={dynamicDetails?.value}
                      detailsIcon
                    />
                  )}
                </ul>
              </CardWithTitle>
            </Col>
          </Row>
          <Row className="maintenanceRow">
            <Col xs={24} sm={24} md={24} lg={24} className="generalCol maintenanceCol">
              <CardWithTitle title="Maintenance Notes" className="maintenanceCardRow">
                <p className="notes">{data?.comments || '-'}</p>
              </CardWithTitle>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={12} lg={16} className="generalCol">
          <CardWithTitle title="Files">
            {data?.fileName ? (
              <div className="viewPDFWrap">
                <iframe
                  src={`${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.MAITENANCE}/${data?.fileName || ''}`}
                  title="PDF Viewer"
                  width="100%"
                  height="600px"
                  style={{ border: 'none' }}
                />
              </div>
            ) : (
              '-'
            )}
          </CardWithTitle>
        </Col>
      </Row>

      <div className="maintenanceButtonWrap extraActionButton">
        {hasPermission('maintenance', 'toggleStatus') && (
          <Button
            className="delete-btn"
            icon={<DeleteOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Delete
          </Button>
        )}
        {hasPermission('maintenance', 'edit') && (
          <Button
            className="title-btn"
            type="primary"
            shape="round"
            icon={<EditIcon />}
            onClick={() => navigate(ROUTES.EDIT_MAINTENANCE(id!))}
          >
            Edit
          </Button>
        )}
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
                <ExclamationCircleOutlined style={{ color: 'red' }} />
              </i>
              <span className="main-title">Delete Maintenance Record</span>
            </div>
          }
          onCancel={() => setIsModalOpen(false)}
        >
          <p>Once a maintenance entry is deleted, you won’t be able to retrieve it back.</p>
          <div className="modalFooter">
            <Button onClick={() => setIsModalOpen(false)} disabled={isDeletePending}>
              Cancel
            </Button>
            <Button
              className="footerBtn"
              onClick={deleteMaintenance}
              disabled={isDeletePending}
              loading={isDeletePending}
            >
              Delete
            </Button>
          </div>
        </CommonModal>
      )}
    </Wrapper>
  );
};

export default ViewMaintenance;
