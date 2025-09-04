import React, { useEffect, useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import {
  AuditOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Row } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { chillerHooks, chillerQueryKeys } from '@/services/chiller';
import { IChillerViewRes } from '@/services/chiller/types';
import { companyQueryKeys } from '@/services/company';
import { dashboardQueryKey } from '@/services/dashboard';
import { facilityHooks, facilityQueryKeys } from '@/services/facility';
import { logHooks, logQueryKeys } from '@/services/log';
import { maintenanceQueryKey } from '@/services/maintenance';
import { reportQueryKey } from '@/services/report';
import { userQueryKeys } from '@/services/user';

import CardWithTitle from '@/shared/components/common/CardWithTitle';
import Details from '@/shared/components/common/Details';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import CommonModal from '@/shared/components/common/Modal/components/CommonModal';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import {
  AMPERAGE_CHOICE,
  IMAGE_MODULE_NAME,
  IMAGE_URL,
  MEASUREMENT_UNITS,
  NUMBER_OF_COMPRESSOR,
  OIL_PRESSURE_DIFF,
  PURGE_READING_UNIT,
  TIMEZONE_OPTIONS,
  TimezoneEnum,
  VOLTAGE_CHOICE
} from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import {
  ChillerIcon,
  CondLossIcon,
  EditIcon,
  EfficiencyLossIcon,
  EvaLossIcon,
  FacilityIcon,
  NonCondLossIcon,
  OtherLossIcon
} from '@/shared/svg';
import { hasPermission, showToaster, toAbsoluteUrl } from '@/shared/utils/functions';

import { Wrapper } from '../style';

dayjs.extend(utc);
dayjs.extend(timezone);

const ViewLog: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: logData, isLoading: isLogLoading } = logHooks.LogView(id!);
  const { data: chillerData, isLoading: isChillerLoading } = chillerHooks.ChillerView(
    logData?.chillerId || ''
  );
  const { data: facilityData, isLoading: isFacilityLoading } = facilityHooks.FacilityView(
    logData?.facilityId || ''
  );
  const { mutate: deleteAction, isPending: isDeletePending } = logHooks.useDeleteLog();

  const [selectedChiller, setSelectedChiller] = useState<IChillerViewRes | null>(null);
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>(TIMEZONE_OPTIONS?.[0]?.value);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const selectedZone = useMemo(() => {
    return TimezoneEnum[facilityData?.timezone as keyof typeof TimezoneEnum] || TimezoneEnum.EST;
  }, [facilityData?.timezone]);

  const readingDateTime = useMemo(() => {
    if (!logData?.readingDateUTC) return null;
    return dayjs.utc(logData.readingDateUTC).tz(selectedZone).format('MM/DD/YY hh:mm A');
  }, [logData?.readingDateUTC, selectedZone]);

  const degreeUnit = useMemo(() => {
    return selectedChiller?.unit === MEASUREMENT_UNITS?.[1]?.value ? '°C' : '℉';
  }, [selectedChiller?.unit]);

  useEffect(() => {
    if (logData && chillerData) {
      setSelectedChiller(chillerData);
    }
    if (logData && facilityData) {
      setSelectedTimeZone(facilityData?.timezone);
    }
  }, [chillerData, facilityData, logData]);

  const deleteLog = () => {
    deleteAction(id || '', {
      onSuccess: (res) => {
        showToaster('success', res?.message);
        setIsModalOpen(false);
        navigate(ROUTES.LOG_ENTRY, { replace: true });
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

  return (
    <Wrapper>
      {(isLogLoading || isChillerLoading || isFacilityLoading) && <Loader />}
      <Meta title="Log Entries" />
      <HeaderToolbar
        title="View Log"
        backBtn={true}
        button={
          <div className="logButtonWrap">
            {hasPermission('log', 'toggleStatus') && (
              <Button
                className="delete-btn"
                icon={<DeleteOutlined />}
                onClick={() => setIsModalOpen(true)}
              >
                Delete
              </Button>
            )}
            {hasPermission('log', 'edit') && (
              <Button
                type="primary"
                className="title-btn"
                icon={<EditIcon />}
                onClick={() => navigate(ROUTES.EDIT_LOG_ENTRY(id!))}
              >
                Edit
              </Button>
            )}
            <div className="paginationWrap">
              <button
                className="paginationButton"
                disabled={!logData?.prevLogId}
                onClick={() =>
                  logData?.prevLogId &&
                  navigate(ROUTES.VIEW_LOG_ENTRY(logData.prevLogId), { replace: true })
                }
              >
                <LeftOutlined />
              </button>
              <button
                className="paginationButton"
                disabled={!logData?.nextLogId}
                onClick={() =>
                  logData?.nextLogId &&
                  navigate(ROUTES.VIEW_LOG_ENTRY(logData?.nextLogId), { replace: true })
                }
              >
                <RightOutlined />
              </button>
            </div>
          </div>
        }
      />

      <div className="rowsWrap">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <ShadowPaper>
              <ul className="viewLogMainDetails">
                <li>
                  <div className="titleWrap">
                    <span>
                      <AuditOutlined />
                    </span>
                    <h2>Company</h2>
                  </div>
                  <p>{logData?.companyName || '-'}</p>
                </li>
                <li>
                  <div className="titleWrap">
                    <span>
                      <FacilityIcon />
                    </span>
                    <h2>Facility</h2>
                  </div>
                  <p>{logData?.facilityName || '-'}</p>
                </li>
                <li>
                  <div className="titleWrap">
                    <span>
                      <ChillerIcon />
                    </span>
                    <h2>{logData?.chillerName || '-'}</h2>
                  </div>
                  <p>{logData?.ChillerNo || '-'}</p>
                </li>
                <li>
                  <div className="titleWrap userTitleWrap">
                    <figure>
                      <img
                        src={`${logData?.userProfileImage ? `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${logData?.userProfileImage}` : toAbsoluteUrl('/icons/placeHolder.jpg')}`}
                        alt="user"
                      />
                    </figure>
                    <div>
                      <h2>{logData?.userName || '-'}</h2>
                      <p>
                        {logData?.createdAt
                          ? dayjs(logData?.createdAt).format('MM/DD/YY HH:mm')
                          : '-'}
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="titleWrap">
                    <span>
                      <ClockCircleOutlined />
                    </span>
                    <h2>Modified At</h2>
                  </div>
                  <p>
                    {logData?.updatedAt
                      ? dayjs(logData?.updatedAt).format('MM/DD/YYYY hh:mm A')
                      : '-'}
                  </p>
                </li>
                <li>
                  <div className="titleWrap lossesWrap">
                    <span>
                      <EfficiencyLossIcon />
                    </span>
                    <h3>
                      Efficient Loss:{' '}
                      <span>{logData?.effLoss ? `${logData?.effLoss?.value} %` : '-'}</span>
                    </h3>
                  </div>
                  <div className="titleWrap lossesWrap">
                    <span>
                      <CondLossIcon />
                    </span>
                    <h3>
                      Cond. App. Loss:{' '}
                      <span>{logData?.condAppLoss ? `${logData?.condAppLoss?.value} %` : '-'}</span>
                    </h3>
                  </div>
                </li>
                <li>
                  <div className="titleWrap lossesWrap">
                    <span>
                      <EvaLossIcon />
                    </span>
                    <h3>
                      Evap. App. Loss:{' '}
                      <span>{logData?.evapAppLoss ? `${logData?.evapAppLoss?.value} %` : '-'}</span>
                    </h3>
                  </div>
                  <div className="titleWrap lossesWrap">
                    <span>
                      <NonCondLossIcon />
                    </span>
                    <h3>
                      Non-Cond. Loss:{' '}
                      <span>{logData?.nonCondLoss ? `${logData?.nonCondLoss?.value} %` : '-'}</span>
                    </h3>
                  </div>
                </li>
                <li>
                  <div className="titleWrap lossesWrap">
                    <span>
                      <OtherLossIcon />
                    </span>
                    <h3>
                      Other Losses:{' '}
                      <span>{logData?.otherLoss ? `${logData?.otherLoss?.value} %` : '-'}</span>
                    </h3>
                  </div>
                </li>
              </ul>
            </ShadowPaper>
          </Col>
        </Row>

        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={12} lg={12} className="fullWidthCol">
            <CardWithTitle title="General">
              <ul className="generalDetailList">
                <Details
                  detailsTitle="Outside Air Temp."
                  className="commonBadge"
                  detailsDescription={`${logData?.airTemp ?? '-'} ${degreeUnit}`}
                  detailsIcon
                />
                <Details
                  detailsTitle="Reading Time"
                  detailsDescription={`${readingDateTime ?? '-'} ${selectedTimeZone}`}
                  detailsIcon
                />
                <Details
                  detailsTitle="Reading Time UTC"
                  detailsDescription={
                    logData?.readingDateUTC
                      ? dayjs.utc(logData?.readingDateUTC).format('MM/DD/YYYY HH:mm')
                      : '-'
                  }
                  detailsIcon
                />
                <Details
                  className="readingDetails"
                  detailsTitle="Chiller Run Hours"
                  detailsDescription={logData?.runHours ?? '-'}
                  detailsIcon
                />
                <Details
                  detailsTitle="Begin Recording Run Hrs."
                  detailsDescription={logData?.runHourStart ? 'Yes' : 'No'}
                  detailsIcon
                  className="readingDetails"
                />
              </ul>
            </CardWithTitle>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} className="fullWidthCol">
            <CardWithTitle title="Operator Notes" className="generalLogContentWrap">
              <p className="generalLogContent">{logData?.userNote || '-'}</p>
            </CardWithTitle>
          </Col>
        </Row>

        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={12} lg={6} className="otherLogFormWrap">
            <ShadowPaper className="otherLogFormShadow">
              <h4>Condenser</h4>
              <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="otherLogForm">
                    <span className="mainlabel">Inlet Temperature</span>
                    <span className="mainLabelValue">{`${logData?.condInletTemp ?? '-'} ${degreeUnit}`}</span>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="otherLogForm">
                    <span className="mainlabel">Outlet Temperature</span>
                    <span className="mainLabelValue">{`${logData?.condOutletTemp ?? '-'} ${degreeUnit}`}</span>
                  </div>
                </Col>
                {selectedChiller && !selectedChiller?.highPressureRefrig && (
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">Sat.Refrig Temp.</span>
                      <span className="mainLabelValue">{`${logData?.condRefrigTemp ?? '-'} ${degreeUnit}`}</span>
                    </div>
                  </Col>
                )}{' '}
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="otherLogForm">
                    <span className="mainlabel">Pressure</span>
                    <span className="mainLabelValue">{`${logData?.condPressure ?? '-'} ${selectedChiller?.condPressureUnit || 'PSIG'}`}</span>
                  </div>
                </Col>{' '}
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="otherLogForm">
                    <span className="mainlabel">Pressure Drop</span>
                    <span className="mainLabelValue">{`${logData?.condAPDrop ?? '-'} ${selectedChiller?.condAPDropUnit || 'PSIG'}`}</span>
                  </div>
                </Col>
              </Row>
            </ShadowPaper>
          </Col>

          <Col xs={24} sm={24} md={12} lg={6} className="otherLogFormWrap">
            <ShadowPaper className="otherLogFormShadow">
              <h4>Evaporator</h4>
              <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="otherLogForm">
                    <span className="mainlabel">Inlet Temperature</span>
                    <span className="mainLabelValue">{`${logData?.evapInletTemp ?? '-'} ${degreeUnit}`}</span>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="otherLogForm">
                    <span className="mainlabel">Outlet Temperature</span>
                    <span className="mainLabelValue">{`${logData?.evapOutletTemp ?? '-'} ${degreeUnit}`}</span>
                  </div>
                </Col>
                {selectedChiller && selectedChiller?.useEvapRefrigTemp && (
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">Sat.Refrig Temp.</span>
                      <span className="mainLabelValue">{`${logData?.evapRefrigTemp ?? '-'} ${degreeUnit}`}</span>
                    </div>
                  </Col>
                )}{' '}
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="otherLogForm">
                    <span className="mainlabel">Pressure</span>
                    <span className="mainLabelValue">{`${logData?.evapPressure ?? '-'} ${selectedChiller?.evapPressureUnit || 'PSIG'}`}</span>
                  </div>
                </Col>{' '}
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="otherLogForm">
                    <span className="mainlabel">Pressure Drop</span>
                    <span className="mainLabelValue">{`${logData?.evapAPDrop ?? '-'} ${selectedChiller?.evapAPDropUnit || 'PSIG'}`}</span>
                  </div>
                </Col>
              </Row>
            </ShadowPaper>
          </Col>

          <Col xs={24} sm={24} md={12} lg={6} className="otherLogFormWrap">
            <ShadowPaper className="otherLogFormShadow">
              <h4>Compressor</h4>
              <Row>
                {selectedChiller &&
                  (selectedChiller?.compOPIndicator === OIL_PRESSURE_DIFF?.[0]?.value ||
                    selectedChiller?.compOPIndicator === OIL_PRESSURE_DIFF?.[1]?.value) && (
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="otherLogForm">
                        <span className="mainlabel">Oil Press High</span>
                        <span className="mainLabelValue">{logData?.oilPresHigh ?? '-'}</span>
                      </div>
                    </Col>
                  )}
                {selectedChiller &&
                  selectedChiller?.compOPIndicator === OIL_PRESSURE_DIFF?.[0]?.value && (
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="otherLogForm">
                        <span className="mainlabel">Oil Press Low</span>
                        <span className="mainLabelValue">{logData?.oilPresLow ?? '-'}</span>
                      </div>
                    </Col>
                  )}
                {selectedChiller &&
                  selectedChiller?.compOPIndicator === OIL_PRESSURE_DIFF?.[2]?.value && (
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="otherLogForm">
                        <span className="mainlabel">Oil Press Dif</span>
                        <span className="mainLabelValue">{logData?.oilPresDif ?? '-'}</span>
                      </div>
                    </Col>
                  )}
                {selectedChiller &&
                  selectedChiller?.compOPIndicator !== OIL_PRESSURE_DIFF?.[3]?.value && (
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="otherLogForm">
                        <span className="mainlabel">Sump Temp.</span>
                        <span className="mainLabelValue">{`${logData?.oilSumpTemp ?? '-'} ${degreeUnit}`}</span>
                      </div>
                    </Col>
                  )}{' '}
                {selectedChiller &&
                  selectedChiller?.compOPIndicator !== OIL_PRESSURE_DIFF?.[3]?.value && (
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="otherLogForm">
                        <span className="mainlabel">Oil Level</span>
                        <span className="mainLabelValue">{logData?.oilLevel ?? '-'}</span>
                      </div>
                    </Col>
                  )}{' '}
                {selectedChiller && selectedChiller?.haveBearingTemp && (
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">Bearing Temp</span>
                      <span className="mainLabelValue">{`${logData?.bearingTemp ?? '-'} ${degreeUnit}`}</span>
                    </div>
                  </Col>
                )}{' '}
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="otherLogForm">
                    <span className="mainlabel">Comp 1 Run Hours</span>
                    <span className="mainLabelValue">{logData?.comp1RunHours ?? '-'}</span>
                  </div>
                </Col>{' '}
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="otherLogForm">
                    <span className="mainlabel">Begin Record Reading</span>
                    <span className="mainLabelValue">
                      {logData?.comp1RunHourStart === true
                        ? 'Yes'
                        : logData?.comp1RunHourStart === false
                          ? 'No'
                          : '-'}
                    </span>
                  </div>
                </Col>
                {selectedChiller &&
                  selectedChiller?.numberOfCompressors?.toString() ===
                    NUMBER_OF_COMPRESSOR?.[1]?.value && (
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="otherLogForm">
                        <span className="mainlabel">Comp 2 Run Hours</span>
                        <span className="mainLabelValue">{logData?.comp2RunHours ?? '-'}</span>
                      </div>
                    </Col>
                  )}{' '}
                {selectedChiller &&
                  selectedChiller?.numberOfCompressors?.toString() ===
                    NUMBER_OF_COMPRESSOR?.[1]?.value && (
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="otherLogForm">
                        <span className="mainlabel">Begin Record Reading</span>
                        <span className="mainLabelValue">
                          {' '}
                          {logData?.comp2RunHourStart === true
                            ? 'Yes'
                            : logData?.comp2RunHourStart === false
                              ? 'No'
                              : '-'}
                        </span>
                      </div>
                    </Col>
                  )}{' '}
                {selectedChiller &&
                  selectedChiller?.purgeReadingUnit === PURGE_READING_UNIT?.[1]?.value &&
                  selectedChiller?.havePurge && (
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="otherLogForm">
                        <span className="mainlabel">Purge Time Hrs.</span>
                        <span className="mainLabelValue">{logData?.purgeTimeHr ?? '-'}</span>
                      </div>
                    </Col>
                  )}
                {selectedChiller && selectedChiller?.havePurge && (
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">Purge Time</span>
                      <span className="mainLabelValue">{logData?.purgeTimeMin ?? '-'}</span>
                    </div>
                  </Col>
                )}
              </Row>
            </ShadowPaper>
          </Col>

          <Col xs={24} sm={24} md={12} lg={6} className="otherLogFormWrap">
            <ShadowPaper className="otherLogFormShadow">
              <h4>Electrical</h4>
              <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="otherLogForm">
                    <span className="mainlabel">Amps Phase 1/% Load</span>
                    <span className="mainLabelValue">{logData?.ampsPhase1 ?? '-'}</span>
                  </div>
                </Col>
                {selectedChiller && selectedChiller?.ampChoice === AMPERAGE_CHOICE?.[0]?.value && (
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">Amps Phase 2</span>
                      <span className="mainLabelValue">{logData?.ampsPhase2 ?? '-'}</span>
                    </div>
                  </Col>
                )}
                {selectedChiller && selectedChiller?.ampChoice === AMPERAGE_CHOICE?.[0]?.value && (
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">Amps Phase 3</span>
                      <span className="mainLabelValue">{logData?.ampsPhase3 ?? '-'}</span>
                    </div>
                  </Col>
                )}{' '}
                {selectedChiller &&
                  (selectedChiller?.voltageChoice === VOLTAGE_CHOICE?.[0]?.value ||
                    selectedChiller?.voltageChoice === VOLTAGE_CHOICE?.[1]?.value) && (
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="otherLogForm">
                        <span className="mainlabel">Volts Phase 1</span>
                        <span className="mainLabelValue">{logData?.voltsPhase1 ?? '-'}</span>
                      </div>
                    </Col>
                  )}{' '}
                {selectedChiller &&
                  selectedChiller?.voltageChoice === VOLTAGE_CHOICE?.[0]?.value && (
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="otherLogForm">
                        <span className="mainlabel">Volts Phase 2</span>
                        <span className="mainLabelValue">{logData?.voltsPhase2 ?? '-'}</span>
                      </div>
                    </Col>
                  )}{' '}
                {selectedChiller &&
                  selectedChiller?.voltageChoice === VOLTAGE_CHOICE?.[0]?.value && (
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="otherLogForm">
                        <span className="mainlabel">Volts Phase 3</span>
                        <span className="mainLabelValue">{logData?.voltsPhase3 ?? '-'}</span>
                      </div>
                    </Col>
                  )}
              </Row>
            </ShadowPaper>
          </Col>
        </Row>
      </div>

      <div className="logButtonWrap extraActionButton">
        {hasPermission('log', 'toggleStatus') && (
          <Button
            className="delete-btn"
            icon={<DeleteOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Delete
          </Button>
        )}
        {hasPermission('log', 'edit') && (
          <Button
            type="primary"
            className="title-btn"
            icon={<EditIcon />}
            onClick={() => navigate(ROUTES.EDIT_LOG_ENTRY(id!))}
          >
            Edit
          </Button>
        )}
        <div className="paginationWrap">
          <button
            className="paginationButton"
            disabled={!logData?.prevLogId}
            onClick={() =>
              logData?.prevLogId &&
              navigate(ROUTES.VIEW_LOG_ENTRY(logData.prevLogId), { replace: true })
            }
          >
            <LeftOutlined />
          </button>
          <button
            className="paginationButton"
            disabled={!logData?.nextLogId}
            onClick={() =>
              logData?.nextLogId &&
              navigate(ROUTES.VIEW_LOG_ENTRY(logData?.nextLogId), { replace: true })
            }
          >
            <RightOutlined />
          </button>
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
                <ExclamationCircleOutlined style={{ color: 'red' }} />
              </i>
              <span className="main-title">Delete Log</span>
            </div>
          }
          onCancel={() => setIsModalOpen(false)}
        >
          <p>
            Once a log entry is deleted, you won’t be able to retrieve it back. This will affect the
            overall energy consumption and cost analytics for the chiller
          </p>
          <div className="modalFooter">
            <Button onClick={() => setIsModalOpen(false)} disabled={isDeletePending}>
              Cancel
            </Button>
            <Button
              className="footerBtn"
              onClick={deleteLog}
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

export default ViewLog;
