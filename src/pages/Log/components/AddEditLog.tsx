import React, { useEffect, useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, Switch, TimePicker, Tooltip } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { chillerHooks, chillerQueryKeys } from '@/services/chiller';
import { IChillerViewRes } from '@/services/chiller/types';
import { companyHooks, companyQueryKeys } from '@/services/company';
import { dashboardQueryKey } from '@/services/dashboard';
import { facilityHooks, facilityQueryKeys } from '@/services/facility';
import { logHooks, logQueryKeys } from '@/services/log';
import { maintenanceQueryKey } from '@/services/maintenance';
import { reportQueryKey } from '@/services/report';
import { userQueryKeys } from '@/services/user';

import { authStore } from '@/store/auth';

import CardWithTitle from '@/shared/components/common/CardWithTitle';
import {
  RenderDatePickerInput,
  RenderSelect,
  RenderTextAreaInput,
  RenderTextInput
} from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import {
  AMPERAGE_CHOICE,
  MEASUREMENT_UNITS,
  NUMBER_OF_COMPRESSOR,
  OIL_PRESSURE_DIFF,
  PURGE_READING_UNIT,
  TIMEZONE_OPTIONS,
  TimezoneEnum,
  VOLTAGE_CHOICE
} from '@/shared/constants';
import { validateNoFutureTime } from '@/shared/constants/day';
import {
  allowAverageLoad,
  allowNegativeDecimalOnly,
  allowOnlyNonNegativeInteger,
  capitalizeFirstLetter,
  showToaster,
  validateCommonLogFields,
  validateLogFieldWithMinMax,
  validateLogFieldWithMinMaxNonRequired,
  validateLogFieldWithMinMaxNonRequiredAmp,
  validateNonNegativeInteger
} from '@/shared/utils/functions';

import { Wrapper } from '../style';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

// interface IFormValues {
//   companyId: string;
//   facilityId: string;
//   chillerId: string;
//   readingDate: any;
//   readingTime: any;
//   airTemp: string;
//   runHours: string;
//   notes: string;
//   recordingRunHours: boolean;
//   condInletTemp: string;
//   condOutletTemp: string;
//   condRefrigTemp?: string;
//   condPressure: string;
//   condAPDrop: string;
//   evapInletTemp: string;
//   evapOutletTemp: string;
//   evapRefrigTemp?: string;
//   evapPressure: string;
//   evapAPDrop: string;
//   oilPresHigh?: string;
//   oilPresLow?: string;
//   oilPresDif?: string;
//   oilSumpTemp?: string;
//   oilLevel?: string;
//   bearingTemp?: string;
//   purgeTimeHr?: string;
//   purgeTimeMin?: string;
//   ampsPhase1?: string;
//   ampsPhase2?: string;
//   ampsPhase3?: string;
//   voltsPhase1?: string;
//   voltsPhase2?: string;
//   voltsPhase3?: string;
//   comp1RunHours: string;
//   comp2RunHours?: string;
//   comp1RunHourStart: string;
//   comp2RunHourStart?: string;
// }

const AddEditLog: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userData } = authStore((state) => state);
  const [form] = Form.useForm();
  const { data: logData, isLoading: isLogLoading } = logHooks.LogView(id!);
  const { data: companyOptions, isLoading: isCompanyLoading } = companyHooks.AllActiveCompanyList();
  const { mutate: addLogAction, isPending } = logHooks.useAddLogs();
  const { mutate: editLogAction, isPending: isEditPending } = logHooks.useEditLogs();

  const companySelect = Form.useWatch('companyId', form);
  const selectedDate = Form.useWatch('readingDate', form); // Watch selected date

  const { data: facilityList, isLoading: isFacilityLoading } =
    facilityHooks.AllFacilityActiveList(companySelect);
  const facilitySelect = Form.useWatch('facilityId', form);
  const { data: chillerList, isLoading: isChillerLoading } =
    chillerHooks.ActiveChillerList(facilitySelect);

  const [selectedChiller, setSelectedChiller] = useState<IChillerViewRes | null>(null);
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>(TIMEZONE_OPTIONS?.[0]?.value);

  const degreeUnit = useMemo(() => {
    return selectedChiller?.unit === MEASUREMENT_UNITS?.[1]?.value ? '°C' : '℉';
  }, [selectedChiller?.unit]);

  const isUnitMetric = useMemo(() => {
    return selectedChiller?.unit === MEASUREMENT_UNITS?.[1]?.value;
  }, [selectedChiller?.unit]);

  useEffect(() => {
    if (userData?.companyId && !isCompanyLoading) {
      form.setFieldValue('companyId', userData?.companyId);
    }
  }, [form, id, isCompanyLoading, userData?.companyId]);

  useEffect(() => {
    if (!logData) return;

    const fullChillerData = chillerList?.find((c) => c?._id === logData?.chillerId);
    setSelectedChiller(fullChillerData || null);

    const facilityData = facilityList?.find((c) => c?._id === logData?.facilityId);
    setSelectedTimeZone(facilityData?.timezone || TIMEZONE_OPTIONS?.[0]?.value);

    const selectedZone =
      TimezoneEnum[facilityData?.timezone as keyof typeof TimezoneEnum] || TimezoneEnum.EST;

    // Convert UTC to selected timezone
    const readingDateTime = logData?.readingDateUTC
      ? dayjs.utc(logData.readingDateUTC).tz(selectedZone)
      : null;

    form.setFieldsValue({
      companyId: logData?.companyId ?? null,
      facilityId: logData?.facilityId ?? null,
      chillerId: logData?.chillerId ?? null,
      airTemp: logData?.airTemp?.toString() ?? null,
      readingDate: readingDateTime ?? null,
      readingTime: readingDateTime ?? null,
      runHours: logData?.runHours?.toString() ?? null,
      recordingRunHours: logData?.runHourStart ?? null,
      notes: logData?.userNote || null,
      condInletTemp: logData?.condInletTemp?.toString() ?? null,
      condOutletTemp: logData?.condOutletTemp?.toString() ?? null,
      condRefrigTemp: logData?.condRefrigTemp?.toString() ?? null,
      condPressure: logData?.condPressure?.toString() ?? null,
      condAPDrop: logData?.condAPDrop?.toString() ?? null,
      evapInletTemp: logData?.evapInletTemp?.toString() ?? null,
      evapOutletTemp: logData?.evapOutletTemp?.toString() ?? null,
      evapRefrigTemp: logData?.evapRefrigTemp?.toString() ?? null,
      evapPressure: logData?.evapPressure?.toString() ?? null,
      evapAPDrop: logData?.evapAPDrop?.toString() ?? null,
      comp1RunHours: logData?.comp1RunHours?.toString() ?? null,
      comp2RunHours: logData?.comp2RunHours?.toString() ?? null,
      comp1RunHourStart:
        logData?.comp1RunHourStart === true
          ? 'Yes'
          : logData?.comp1RunHourStart === false
            ? 'No'
            : null,
      comp2RunHourStart:
        logData?.comp2RunHourStart === true
          ? 'Yes'
          : logData?.comp2RunHourStart === false
            ? 'No'
            : null,
      oilPresHigh: logData?.oilPresHigh?.toString() ?? null,
      oilPresLow: logData?.oilPresLow?.toString() ?? null,
      oilPresDif: logData?.oilPresDif?.toString() ?? null,
      oilSumpTemp: logData?.oilSumpTemp?.toString() ?? null,
      oilLevel: logData?.oilLevel?.toString() ?? null,
      bearingTemp: logData?.bearingTemp?.toString() ?? null,
      purgeTimeHr: logData?.purgeTimeHr?.toString() ?? null,
      purgeTimeMin: logData?.purgeTimeMin?.toString() ?? null,
      ampsPhase1: logData?.ampsPhase1?.toString() ?? null,
      ampsPhase2: logData?.ampsPhase2?.toString() ?? null,
      ampsPhase3: logData?.ampsPhase3?.toString() ?? null,
      voltsPhase1: logData?.voltsPhase1?.toString() ?? null,
      voltsPhase2: logData?.voltsPhase2?.toString() ?? null,
      voltsPhase3: logData?.voltsPhase3?.toString() ?? null
    });
  }, [chillerList, facilityList, form, logData]);

  const getDisabledTime = () => {
    const selectedDate = form.getFieldValue('readingDate');
    const isToday = selectedDate && dayjs(selectedDate).isSame(dayjs(), 'day');

    if (!isToday) return {};

    const now = dayjs();

    return {
      disabledHours: () => Array.from({ length: 24 }, (_, i) => i).filter((i) => i > now.hour()),

      disabledMinutes: (selectedHour: number) => {
        if (selectedHour === now.hour()) {
          return Array.from({ length: 60 }, (_, i) => i).filter((i) => i > now.minute());
        }
        return [];
      }
    };
  };

  const facilityOptions = useMemo(() => {
    return (
      facilityList?.map((facility) => ({
        label: facility?.name,
        value: facility?._id
      })) || []
    );
  }, [facilityList]);

  const chillerOptions = useMemo(() => {
    return (
      chillerList?.map((chiller) => ({
        label: capitalizeFirstLetter(chiller?.ChillerNo),
        value: chiller?._id
      })) || []
    );
  }, [chillerList]);

  const onCompanyChange = () => {
    form.setFieldValue('facilityId', null);
    form.setFieldValue('chillerId', null);
    setSelectedChiller(null);
    setSelectedTimeZone(TIMEZONE_OPTIONS?.[0]?.value);
  };

  const onFacilityChange = (value?: string) => {
    form.setFieldValue('chillerId', null);
    setSelectedChiller(null);
    const facilityData = facilityList?.find((c) => c?._id === value);
    setSelectedTimeZone(facilityData?.timezone || TIMEZONE_OPTIONS?.[0]?.value);
  };

  const onChillerChange = (value?: string) => {
    const fullChillerData = chillerList?.find((c) => c?._id === value);
    setSelectedChiller(fullChillerData || null);
  };

  const handleSuccess = (message: string) => {
    showToaster('success', message);
    queryClient.invalidateQueries({ queryKey: facilityQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: chillerQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: logQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: maintenanceQueryKey.all });
    queryClient.invalidateQueries({ queryKey: reportQueryKey.all });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKey.all });

    navigate(-1);
  };

  const handleError = (err: any) => {
    const errorMsg = err?.message || err?.message?.[0] || 'Something went wrong';
    showToaster('error', errorMsg);
  };

  const parseNumber = (value: string | undefined) =>
    value !== undefined && value !== '' && value !== null ? Number(value) : null;
  const parseBoolean = (value: string | undefined) =>
    value === 'Yes' ? true : value === 'No' ? false : null;

  const onSubmit = async () => {
    try {
      await form.validateFields([
        'companyId',
        'facilityId',
        'chillerId',
        'readingDate',
        'readingTime',
        'airTemp',
        'runHours',
        'notes',
        'recordingRunHours',
        'comp1RunHourStart',
        'comp2RunHourStart',
        'comp1RunHours',
        'comp2RunHours',
        'purgeTimeHr',
        'purgeTimeMin'
      ]);

      const values = form.getFieldsValue(true);

      const payload = {
        companyId: values?.companyId || null,
        facilityId: values?.facilityId || null,
        userId: userData?._id || null,
        chillerId: values?.chillerId || null,
        readingDate: values?.readingDate ? dayjs(values.readingDate).format('MM-DD-YYYY') : null,
        readingTime: values?.readingTime ? dayjs(values.readingTime).format('hh:mm A') : null,
        readingTimeZone: selectedTimeZone || null,

        // Temperatures and pressures
        condInletTemp: parseNumber(values?.condInletTemp),
        condOutletTemp: parseNumber(values?.condOutletTemp),
        condRefrigTemp: parseNumber(values?.condRefrigTemp),
        condPressure: parseNumber(values?.condPressure),
        condAPDrop: parseNumber(values?.condAPDrop),
        evapInletTemp: parseNumber(values?.evapInletTemp),
        evapOutletTemp: parseNumber(values?.evapOutletTemp),
        evapRefrigTemp: parseNumber(values?.evapRefrigTemp),
        evapPressure: parseNumber(values?.evapPressure),
        evapAPDrop: parseNumber(values?.evapAPDrop),
        airTemp: parseNumber(values?.airTemp),

        // Run hours
        runHourStart: values?.recordingRunHours,
        runHours: parseNumber(values?.runHours),
        comp1RunHours: parseNumber(values?.comp1RunHours),
        comp2RunHours: parseNumber(values?.comp2RunHours),
        comp1RunHourStart: parseBoolean(values?.comp1RunHourStart),
        comp2RunHourStart: parseBoolean(values?.comp2RunHourStart),

        // Oil values
        oilPresHigh: parseNumber(values?.oilPresHigh),
        oilPresLow: parseNumber(values?.oilPresLow),
        oilPresDif: parseNumber(values?.oilPresDif),
        oilSumpTemp: parseNumber(values?.oilSumpTemp),
        oilLevel: parseNumber(values?.oilLevel),
        bearingTemp: parseNumber(values?.bearingTemp),

        // Purge time
        purgeTimeHr: parseNumber(values?.purgeTimeHr),
        purgeTimeMin: parseNumber(values?.purgeTimeMin),

        // Electrical values
        ampsPhase1: parseNumber(values?.ampsPhase1),
        ampsPhase2: parseNumber(values?.ampsPhase2),
        ampsPhase3: parseNumber(values?.ampsPhase3),
        voltsPhase1: parseNumber(values?.voltsPhase1),
        voltsPhase2: parseNumber(values?.voltsPhase2),
        voltsPhase3: parseNumber(values?.voltsPhase3),

        // Notes
        userNote: values?.notes?.trim() || null
      };

      if (id) {
        editLogAction(
          { ...payload, id },
          {
            onSuccess: (res) => handleSuccess(res?.message || ''),
            onError: handleError
          }
        );
      } else {
        addLogAction(payload, {
          onSuccess: (res) => handleSuccess(res?.message || ''),
          onError: handleError
        });
      }
    } catch (errorInfo) {
      console.log('Validation failed for strict fields:', errorInfo);
    }
  };

  const handleFocus = (fieldName: string) => {
    // Trigger validation only for this field
    form.validateFields([fieldName]).catch(() => {
      return;
    });
  };

  const handleBlur = (fieldName: string) => {
    form.setFields([{ name: fieldName, errors: [] }]);
  };

  return (
    <Wrapper>
      {isLogLoading && <Loader />}
      <Form form={form} disabled={isPending || isEditPending || isLogLoading}>
        <HeaderToolbar
          title={id ? 'Edit Log' : 'Add Log'}
          backBtn={true}
          className="addEditHeader userAddEditHeader"
          button={
            <div className="editButtonWrap">
              <Button
                className="title-cancel-btn"
                onClick={() => navigate(-1)}
                disabled={isPending || isLogLoading || isEditPending}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                shape="round"
                htmlType="button"
                onClick={onSubmit}
                className="title-btn"
                disabled={isPending || isEditPending || isLogLoading}
                loading={isPending || isEditPending}
                icon={!id && <PlusOutlined />}
              >
                {id ? 'Save' : 'Add / Save'}
              </Button>
            </div>
          }
        />

        <div className="rowsWrap">
          <Row>
            <Col xs={24} sm={24} md={24} lg={24}>
              <ShadowPaper>
                <Row gutter={[20, 20]} className="logAddEditMainForm">
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <RenderSelect
                      label="Company"
                      // tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                      colClassName="custom-select-col"
                      formItemProps={{
                        name: 'companyId',
                        rules: [{ required: true, message: 'Please select company.' }]
                      }}
                      inputProps={{
                        disabled: isCompanyLoading || !!id || !!userData?.companyId,
                        placeholder: 'Select Company',
                        options:
                          id && logData?.companyId
                            ? [{ label: logData?.companyName, value: logData?.companyId }]
                            : companyOptions || [],
                        onChange: onCompanyChange
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <RenderSelect
                      label="Select Facility"
                      // tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                      colClassName="custom-select-col"
                      formItemProps={{
                        name: 'facilityId',
                        rules: [{ required: true, message: 'Please select facility.' }]
                      }}
                      inputProps={{
                        disabled: !companySelect || isFacilityLoading || !!id,
                        placeholder: 'Select Facility',
                        options:
                          id && logData?.facilityId
                            ? [{ label: logData?.facilityName, value: logData?.facilityId }]
                            : facilityOptions || [],
                        onChange: (value) => onFacilityChange(value)
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <RenderSelect
                      label="Select Chiller"
                      // tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                      colClassName="custom-select-col"
                      formItemProps={{
                        name: 'chillerId',
                        rules: [{ required: true, message: 'Please select chiller.' }]
                      }}
                      inputProps={{
                        disabled: isChillerLoading || !facilitySelect || !!id,
                        placeholder: 'Select Chiller',
                        options:
                          id && logData?.chillerId
                            ? [{ label: logData?.ChillerNo, value: logData?.chillerId }]
                            : chillerOptions || [],
                        onChange: (value) => onChillerChange(value)
                      }}
                    />
                  </Col>
                </Row>
              </ShadowPaper>
            </Col>
          </Row>

          <Row gutter={[20, 20]}>
            <Col xs={24} sm={24} md={12} lg={12} className="fullWidthCol">
              <CardWithTitle title="General" className="generalLogContentWrap">
                <Row gutter={[20, 25]} className="generalRow">
                  <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <RenderDatePickerInput
                      label="Reading Date"
                      // tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                      formItemProps={{
                        name: 'readingDate',
                        rules: [{ required: true, message: 'Please select date.' }]
                      }}
                      inputProps={{
                        placeholder: 'Select Reading Date',
                        onChange: () => form.validateFields(['readingTime']),
                        disabledDate: (current) => current && current > dayjs().endOf('day')
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <span className="maintenanceTime">
                      <span>*</span>Reading Time
                    </span>
                    <div className="timeWrap">
                      <Form.Item
                        name="readingTime"
                        rules={[
                          { required: true, message: 'Please select time.' },
                          {
                            validator: validateNoFutureTime(
                              selectedDate,
                              TimezoneEnum[selectedTimeZone as keyof typeof TimezoneEnum] ||
                                TimezoneEnum.EST
                            ) // pass date from useWatch
                          }
                        ]}
                      >
                        <TimePicker
                          use12Hours
                          format="hh:mm A"
                          showSecond={false}
                          disabledTime={getDisabledTime}
                        />
                      </Form.Item>
                      <div className="timezone">{selectedTimeZone}</div>
                    </div>
                  </Col>

                  <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <RenderTextInput
                      label="Outside Air Temp."
                      tooltip="Enter the chiller's air temperature."
                      colClassName="addonAfterClass"
                      required
                      formItemProps={{
                        name: 'airTemp',
                        rules: [
                          {
                            validator: validateLogFieldWithMinMax(
                              'outside air temperature',
                              -30,
                              130
                            )
                          }
                        ]
                      }}
                      inputProps={{
                        onKeyDown: allowNegativeDecimalOnly,
                        maxLength: 10,
                        placeholder: 'Enter Outside Air Temp.',
                        type: 'text',
                        addonAfterText: degreeUnit
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <RenderTextInput
                      label="Chiller Run Hours"
                      tooltip="Enter the running hours of the chiller from the chiller's reading."
                      required
                      formItemProps={{
                        name: 'runHours',
                        rules: [{ validator: validateCommonLogFields('chiller run hours') }]
                      }}
                      inputProps={{
                        onKeyDown: allowAverageLoad,
                        maxLength: 10,
                        type: 'text',
                        placeholder: 'Enter Chiller Run Hours'
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={24} xl={12}>
                    <div className="switchLabelWrap">
                      <label className="switchLabel">
                        <i className="esteriskSign">*</i>Begin Recording Run Hrs.
                        <Tooltip
                          title="Check this box if you want the system to start validating the run hours from this log entry, if you check we will consider the hours entered as correct without validating it against the value of the past entry."
                          color="#000ABC"
                        >
                          <InfoCircleOutlined style={{ color: '#000ABC' }} />
                        </Tooltip>
                      </label>
                      <Form.Item name="recordingRunHours" initialValue={false}>
                        <Switch
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                          className="generalSwitch"
                        />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </CardWithTitle>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} className="fullWidthCol">
              <CardWithTitle title="Additional Info" className="generalLogContentWrap">
                <Row gutter={[0, 15]} className="generalRow">
                  <Col>
                    <RenderTextAreaInput
                      colProps={{ span: 24 }}
                      tooltip="Enter any user notes that would help the viewer to get more clarity about the entry."
                      label="Operator Notes"
                      formItemProps={{
                        name: 'notes',
                        label: 'Operator Notes',
                        rules: [
                          {
                            validator: (_, value) => {
                              if (value && value.trim() === '') {
                                return Promise.reject(
                                  new Error('Please enter valid operator notes.')
                                );
                              }
                              return Promise.resolve();
                            }
                          }
                        ]
                      }}
                      inputProps={{
                        placeholder: 'Enter User Operator Notes',
                        autoSize: { minRows: 5, maxRows: 6 }
                      }}
                    />
                  </Col>
                </Row>
              </CardWithTitle>
            </Col>
          </Row>

          <Row gutter={[20, 20]}>
            <Col xs={24} sm={24} md={24} lg={6} className="otherLogFormWrap">
              <ShadowPaper className="generalLogContentWrap">
                <h4>Condenser</h4>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">
                        Inlet Temperature{' '}
                        <Tooltip
                          title="Enter the temperature of the fluid (usually water or air) entering the condenser to absorb and carry away heat from the refrigerant."
                          color="#000ABC"
                        >
                          <InfoCircleOutlined style={{ color: '#000ABC' }} />
                        </Tooltip>
                      </span>
                      <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                        <RenderTextInput
                          required
                          colClassName="addonAfterClass"
                          formItemProps={{
                            name: 'condInletTemp',
                            rules: [
                              {
                                validator: validateLogFieldWithMinMaxNonRequired(
                                  'inlet temperature',
                                  40,
                                  105
                                )
                              }
                            ]
                          }}
                          inputProps={{
                            onFocus: () => handleFocus('condInletTemp'),
                            onBlur: () => handleBlur('condInletTemp'),
                            onKeyDown: allowNegativeDecimalOnly,
                            maxLength: 10,
                            type: 'text',
                            addonAfterText: degreeUnit
                          }}
                        />
                      </Col>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">
                        Outlet Temperature{' '}
                        <Tooltip
                          title="Enter the temperature of the fluid (usually water or air) exiting the condenser after absorbing heat from the refrigerant."
                          color="#000ABC"
                        >
                          <InfoCircleOutlined style={{ color: '#000ABC' }} />
                        </Tooltip>
                      </span>

                      <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                        <RenderTextInput
                          required
                          colClassName="addonAfterClass"
                          formItemProps={{
                            name: 'condOutletTemp',
                            rules: [
                              {
                                validator: validateLogFieldWithMinMaxNonRequired(
                                  'outlet temperature',
                                  40,
                                  120
                                )
                              }
                            ]
                          }}
                          inputProps={{
                            onFocus: () => handleFocus('condOutletTemp'),
                            onBlur: () => handleBlur('condOutletTemp'),
                            addonAfterText: degreeUnit,
                            onKeyDown: allowNegativeDecimalOnly,
                            maxLength: 10,
                            type: 'text'
                          }}
                        />
                      </Col>
                    </div>
                  </Col>
                  {selectedChiller && !selectedChiller?.highPressureRefrig && (
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="otherLogForm">
                        <span className="mainlabel">
                          Sat.Refrig Temp.{' '}
                          <Tooltip
                            title="Enter the temperature of the refrigerant as it releases heat and changes from a vapor to a liquid within the condenser."
                            color="#000ABC"
                          >
                            <InfoCircleOutlined style={{ color: '#000ABC' }} />
                          </Tooltip>
                        </span>
                        <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                          <RenderTextInput
                            required
                            colClassName="addonAfterClass"
                            formItemProps={{
                              name: 'condRefrigTemp',
                              rules: [
                                {
                                  validator: validateLogFieldWithMinMaxNonRequired(
                                    'refrig temperature',
                                    50,
                                    120
                                  )
                                }
                              ]
                            }}
                            inputProps={{
                              onFocus: () => handleFocus('condRefrigTemp'),
                              onBlur: () => handleBlur('condRefrigTemp'),
                              addonAfterText: degreeUnit,
                              onKeyDown: allowNegativeDecimalOnly,
                              maxLength: 10,
                              type: 'text'
                            }}
                          />
                        </Col>
                      </div>
                    </Col>
                  )}
                  {/* <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="otherLogForm">
                    <span className="mainlabel">Excess Approach</span>
                    <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                      <RenderTextInput
                        required
                        colClassName="addonAfterClass"
                        formItemProps={{
                          name: 'Temperature'
                        }}
                        inputProps={{
                          addonAfterText: 'PSIG'
                        }}
                      />
                    </Col>
                  </div>
                </Col>{' '} */}
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">
                        Pressure{' '}
                        <Tooltip
                          title="Enter the pressure of the refrigerant within the condenser as it condenses from vapor to liquid by releasing heat."
                          color="#000ABC"
                        >
                          <InfoCircleOutlined style={{ color: '#000ABC' }} />
                        </Tooltip>
                      </span>
                      <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                        <RenderTextInput
                          required
                          colClassName="addonAfterClass"
                          formItemProps={{
                            name: 'condPressure',
                            rules: [
                              {
                                validator: validateLogFieldWithMinMaxNonRequired('pressure', -9, 18)
                              }
                            ]
                          }}
                          inputProps={{
                            onFocus: () => handleFocus('condPressure'),
                            onBlur: () => handleBlur('condPressure'),
                            addonAfterText: selectedChiller?.condPressureUnit || 'PSIG',
                            onKeyDown: allowNegativeDecimalOnly,
                            maxLength: 10,
                            type: 'text'
                          }}
                        />
                      </Col>
                    </div>
                  </Col>{' '}
                  {/* <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="otherLogForm">
                    <span className="mainlabel">Non Cond.</span>
                    <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                      <RenderTextInput
                        required
                        colClassName="addonAfterClass"
                        formItemProps={{
                          name: 'Temperature'
                        }}
                        inputProps={{
                          addonAfterText: 'PSIG'
                        }}
                      />
                    </Col>
                  </div>
                </Col>{' '} */}
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">
                        Pressure Drop{' '}
                        <Tooltip
                          title="Enter the decrease in air pressure as it flows across the condenser coil, indicating airflow resistance and coil cleanliness."
                          color="#000ABC"
                        >
                          <InfoCircleOutlined style={{ color: '#000ABC' }} />
                        </Tooltip>
                      </span>
                      <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                        <RenderTextInput
                          required
                          colClassName="addonAfterClass"
                          formItemProps={{
                            name: 'condAPDrop',
                            rules: [
                              {
                                validator: validateLogFieldWithMinMaxNonRequired(
                                  'pressure drop',
                                  0,
                                  50
                                )
                              }
                            ]
                          }}
                          inputProps={{
                            onFocus: () => handleFocus('condAPDrop'),
                            onBlur: () => handleBlur('condAPDrop'),
                            addonAfterText: selectedChiller?.condAPDropUnit || 'PSIG',
                            onKeyDown: allowNegativeDecimalOnly,
                            maxLength: 10,
                            type: 'text'
                          }}
                        />
                      </Col>
                    </div>
                  </Col>
                </Row>
              </ShadowPaper>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6} className="otherLogFormWrap">
              <ShadowPaper className="generalLogContentWrap">
                <h4>Evaporator</h4>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">
                        Inlet Temperature{' '}
                        <Tooltip
                          title="Enter the temperature of the fluid (usually water) entering the evaporator to be cooled by the refrigerant."
                          color="#000ABC"
                        >
                          <InfoCircleOutlined style={{ color: '#000ABC' }} />
                        </Tooltip>
                      </span>
                      <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                        <RenderTextInput
                          required
                          colClassName="addonAfterClass"
                          formItemProps={{
                            name: 'evapInletTemp',
                            rules: [
                              {
                                validator: validateLogFieldWithMinMaxNonRequired(
                                  'inlet temperature',
                                  -60,
                                  80
                                )
                              }
                            ]
                          }}
                          inputProps={{
                            onFocus: () => handleFocus('evapInletTemp'),
                            onBlur: () => handleBlur('evapInletTemp'),
                            addonAfterText: degreeUnit,
                            onKeyDown: allowNegativeDecimalOnly,
                            maxLength: 10,
                            type: 'text'
                          }}
                        />
                      </Col>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">
                        Outlet Temperature{' '}
                        <Tooltip
                          title="Enter the temperature of the fluid exiting the evaporator after being cooled by the refrigerant."
                          color="#000ABC"
                        >
                          <InfoCircleOutlined style={{ color: '#000ABC' }} />
                        </Tooltip>
                      </span>
                      <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                        <RenderTextInput
                          required
                          colClassName="addonAfterClass"
                          formItemProps={{
                            name: 'evapOutletTemp',
                            rules: [
                              {
                                validator: validateLogFieldWithMinMaxNonRequired(
                                  'outlet temperature',
                                  -60,
                                  80
                                )
                              }
                            ]
                          }}
                          inputProps={{
                            onFocus: () => handleFocus('evapOutletTemp'),
                            onBlur: () => handleBlur('evapOutletTemp'),
                            addonAfterText: degreeUnit,
                            onKeyDown: allowNegativeDecimalOnly,
                            maxLength: 10,
                            type: 'text'
                          }}
                        />
                      </Col>
                    </div>
                  </Col>
                  {selectedChiller && selectedChiller?.useEvapRefrigTemp && (
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="otherLogForm">
                        <span className="mainlabel">
                          Sat.Refrig Temp.{' '}
                          <Tooltip
                            title="Enter the temperature of the refrigerant as it absorbs heat and evaporates from liquid to vapor inside the evaporator."
                            color="#000ABC"
                          >
                            <InfoCircleOutlined style={{ color: '#000ABC' }} />
                          </Tooltip>
                        </span>
                        <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                          <RenderTextInput
                            required
                            colClassName="addonAfterClass"
                            formItemProps={{
                              name: 'evapRefrigTemp',
                              rules: [
                                {
                                  validator: validateLogFieldWithMinMaxNonRequired(
                                    'sat. refrig temperature',
                                    -60,
                                    80
                                  )
                                }
                              ]
                            }}
                            inputProps={{
                              onFocus: () => handleFocus('evapRefrigTemp'),
                              onBlur: () => handleBlur('evapRefrigTemp'),
                              addonAfterText: degreeUnit,
                              onKeyDown: allowNegativeDecimalOnly,
                              maxLength: 10,
                              type: 'text'
                            }}
                          />
                        </Col>
                      </div>
                    </Col>
                  )}
                  {/* <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="otherLogForm">
                    <span className="mainlabel">Excess Approach</span>
                    <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                      <RenderTextInput
                        required
                        colClassName="addonAfterClass"
                        formItemProps={{
                          name: 'Temperature'
                        }}
                        inputProps={{
                          addonAfterText: 'PSIG'
                        }}
                      />
                    </Col>
                  </div>
                </Col> */}
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">
                        Pressure{' '}
                        <Tooltip
                          title="Enter the pressure of the refrigerant within the evaporator as it absorbs heat and evaporates into a vapor."
                          color="#000ABC"
                        >
                          <InfoCircleOutlined style={{ color: '#000ABC' }} />
                        </Tooltip>
                      </span>
                      <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                        <RenderTextInput
                          required
                          colClassName="addonAfterClass"
                          formItemProps={{
                            name: 'evapPressure',
                            rules: [
                              {
                                validator: validateLogFieldWithMinMaxNonRequired('pressure', -10, 1)
                              }
                            ]
                          }}
                          inputProps={{
                            onFocus: () => handleFocus('evapPressure'),
                            onBlur: () => handleBlur('evapPressure'),
                            addonAfterText: selectedChiller?.evapPressureUnit || 'PSIG',
                            onKeyDown: allowNegativeDecimalOnly,
                            maxLength: 10,
                            type: 'text'
                          }}
                        />
                      </Col>
                    </div>
                  </Col>{' '}
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">
                        Pressure Drop{' '}
                        <Tooltip
                          title="Explain the difference in pressure of the fluid (usually water) between the evaporator inlet and outlet, indicating flow resistance."
                          color="#000ABC"
                        >
                          <InfoCircleOutlined style={{ color: '#000ABC' }} />
                        </Tooltip>
                      </span>
                      <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                        <RenderTextInput
                          required
                          colClassName="addonAfterClass"
                          formItemProps={{
                            name: 'evapAPDrop',
                            rules: [
                              {
                                validator: validateLogFieldWithMinMaxNonRequired(
                                  'pressure drop',
                                  0,
                                  50
                                )
                              }
                            ]
                          }}
                          inputProps={{
                            onFocus: () => handleFocus('evapAPDrop'),
                            onBlur: () => handleBlur('evapAPDrop'),
                            addonAfterText: selectedChiller?.evapAPDropUnit || 'PSIG',
                            onKeyDown: allowNegativeDecimalOnly,
                            maxLength: 10,
                            type: 'text'
                          }}
                        />
                      </Col>
                    </div>
                  </Col>
                </Row>
              </ShadowPaper>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6} className="otherLogFormWrap">
              <ShadowPaper className="generalLogContentWrap">
                <h4>Compressor</h4>
                <Row>
                  {selectedChiller &&
                    (selectedChiller?.compOPIndicator === OIL_PRESSURE_DIFF?.[0]?.value ||
                      selectedChiller?.compOPIndicator === OIL_PRESSURE_DIFF?.[1]?.value) && (
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="otherLogForm">
                          <span className="mainlabel">
                            Oil Press High{' '}
                            <Tooltip
                              title="Compressor oil pressure difference at which lubricating oil is supplied to the compressor’s moving parts to ensure proper lubrication & prevent wear."
                              color="#000ABC"
                            >
                              <InfoCircleOutlined style={{ color: '#000ABC' }} />
                            </Tooltip>
                          </span>
                          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                            <RenderTextInput
                              required
                              // colClassName="addonAfterClass"
                              formItemProps={{
                                name: 'oilPresHigh'
                                // rules: [
                                //   {
                                //     validator: validateLogFieldWithMinMaxNonRequired(
                                //       'oil pressure high',
                                //       0,
                                //       isUnitMetric ? 1379 : 200
                                //     )
                                //   }
                                // ]
                              }}
                              inputProps={{
                                // onFocus: () => handleFocus('oilPresHigh'),
                                // onBlur: () => handleBlur('oilPresHigh'),
                                onKeyDown: allowNegativeDecimalOnly,
                                maxLength: 10,
                                type: 'text'
                              }}
                            />
                          </Col>
                        </div>
                      </Col>
                    )}
                  {selectedChiller &&
                    selectedChiller?.compOPIndicator === OIL_PRESSURE_DIFF?.[0]?.value && (
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="otherLogForm">
                          <span className="mainlabel">
                            Oil Press Low{' '}
                            <Tooltip
                              title="Compressor oil pressure difference at which lubricating oil is supplied to the compressor’s moving parts to ensure proper lubrication & prevent wear."
                              color="#000ABC"
                            >
                              <InfoCircleOutlined style={{ color: '#000ABC' }} />
                            </Tooltip>
                          </span>
                          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                            <RenderTextInput
                              required
                              // colClassName="addonAfterClass"
                              formItemProps={{
                                name: 'oilPresLow'
                                // rules: [
                                //   {
                                //     validator: validateLogFieldWithMinMaxNonRequired(
                                //       'oil pressure low',
                                //       0,
                                //       isUnitMetric ? 677 : 200
                                //     )
                                //   }
                                // ]
                              }}
                              inputProps={{
                                // onFocus: () => handleFocus('oilPresLow'),
                                // onBlur: () => handleBlur('oilPresLow'),
                                onKeyDown: allowNegativeDecimalOnly,
                                maxLength: 10,
                                type: 'text'
                              }}
                            />
                          </Col>
                        </div>
                      </Col>
                    )}
                  {selectedChiller &&
                    selectedChiller?.compOPIndicator === OIL_PRESSURE_DIFF?.[2]?.value && (
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="otherLogForm">
                          <span className="mainlabel">
                            Oil Press Dif{' '}
                            <Tooltip
                              title="Compressor oil pressure difference at which lubricating oil is supplied to the compressor’s moving parts to ensure proper lubrication & prevent wear."
                              color="#000ABC"
                            >
                              <InfoCircleOutlined style={{ color: '#000ABC' }} />
                            </Tooltip>
                          </span>
                          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                            <RenderTextInput
                              required
                              // colClassName="addonAfterClass"
                              formItemProps={{
                                name: 'oilPresDif'
                                // rules: [
                                //   {
                                //     validator: validateLogFieldWithMinMaxNonRequired(
                                //       'oil pressure low',
                                //       0,
                                //       isUnitMetric ? 1379 : 200
                                //     )
                                //   }
                                // ]
                              }}
                              inputProps={{
                                // onFocus: () => handleFocus('oilPresDif'),
                                // onBlur: () => handleBlur('oilPresDif'),
                                onKeyDown: allowNegativeDecimalOnly,
                                maxLength: 10,
                                type: 'text'
                              }}
                            />
                          </Col>
                        </div>
                      </Col>
                    )}
                  {selectedChiller &&
                    selectedChiller?.compOPIndicator !== OIL_PRESSURE_DIFF?.[3]?.value && (
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="otherLogForm">
                          <span className="mainlabel">
                            Sump Temp.{' '}
                            <Tooltip
                              title="Enter the value for Oil Sump Temperature of the chiller's compressor."
                              color="#000ABC"
                            >
                              <InfoCircleOutlined style={{ color: '#000ABC' }} />
                            </Tooltip>
                          </span>
                          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                            <RenderTextInput
                              required
                              colClassName="addonAfterClass"
                              formItemProps={{
                                name: 'oilSumpTemp'
                                // rules: [
                                //   {
                                //     validator: validateLogFieldWithMinMaxNonRequired(
                                //       'oil sump temperature',
                                //       isUnitMetric ? -18 : 0,
                                //       isUnitMetric ? 93 : 200
                                //     )
                                //   }
                                // ]
                              }}
                              inputProps={{
                                // onFocus: () => handleFocus('oilSumpTemp'),
                                // onBlur: () => handleBlur('oilSumpTemp'),
                                addonAfterText: degreeUnit,
                                onKeyDown: allowNegativeDecimalOnly,
                                maxLength: 10,
                                type: 'text'
                              }}
                            />
                          </Col>
                        </div>
                      </Col>
                    )}
                  {selectedChiller &&
                    selectedChiller?.compOPIndicator !== OIL_PRESSURE_DIFF?.[3]?.value && (
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="otherLogForm">
                          <span className="mainlabel">
                            Oil Level{' '}
                            <Tooltip
                              title="Enter the oil level of the chiller's compressor."
                              color="#000ABC"
                            >
                              <InfoCircleOutlined style={{ color: '#000ABC' }} />
                            </Tooltip>
                          </span>
                          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                            <RenderTextInput
                              required
                              // colClassName="addonAfterClass"
                              formItemProps={{
                                name: 'oilLevel'
                                // rules: [
                                //   {
                                //     validator: validateLogFieldWithMinMaxNonRequired(
                                //       'oil level',
                                //       0,
                                //       100
                                //     )
                                //   }
                                // ]
                              }}
                              inputProps={{
                                // onFocus: () => handleFocus('oilLevel'),
                                // onBlur: () => handleBlur('oilLevel'),
                                onKeyDown: allowNegativeDecimalOnly,
                                maxLength: 10,
                                type: 'text'
                              }}
                            />
                          </Col>
                        </div>
                      </Col>
                    )}
                  {selectedChiller && selectedChiller?.haveBearingTemp && (
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="otherLogForm">
                        <span className="mainlabel">
                          Bearing Temp{' '}
                          <Tooltip
                            title="Enter the temperature of the bearings inside the compressor, indicating the condition of lubrication and mechanical health."
                            color="#000ABC"
                          >
                            <InfoCircleOutlined style={{ color: '#000ABC' }} />
                          </Tooltip>
                        </span>
                        <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                          <RenderTextInput
                            required
                            colClassName="addonAfterClass"
                            formItemProps={{
                              name: 'bearingTemp',
                              rules: [
                                {
                                  validator: validateLogFieldWithMinMaxNonRequired(
                                    'bearing temperature',
                                    isUnitMetric ? 32 : 90,
                                    isUnitMetric ? 93 : 200
                                  )
                                }
                              ]
                            }}
                            inputProps={{
                              onFocus: () => handleFocus('bearingTemp'),
                              onBlur: () => handleBlur('bearingTemp'),
                              addonAfterText: degreeUnit,
                              onKeyDown: allowNegativeDecimalOnly,
                              maxLength: 10,
                              type: 'text'
                            }}
                          />
                        </Col>
                      </div>
                    </Col>
                  )}
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">
                        Comp 1 Run Hours{' '}
                        <Tooltip title="Enter compressor's running hours." color="#000ABC">
                          <InfoCircleOutlined style={{ color: '#000ABC' }} />
                        </Tooltip>
                      </span>
                      <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                        <RenderTextInput
                          required
                          // colClassName="addonAfterClass"
                          formItemProps={{
                            name: 'comp1RunHours',
                            rules: [{ validator: validateCommonLogFields('comp 1 run hours') }]
                          }}
                          inputProps={{
                            onKeyDown: allowAverageLoad,
                            maxLength: 10,
                            type: 'text'
                          }}
                        />
                      </Col>
                    </div>
                  </Col>{' '}
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">
                        Begin Record Reading{' '}
                        <Tooltip
                          title="Check this box if you want the system to start validating the compressor run hours from this log entry, if you check we will consider the hours entered as correct without validating it against the value of the past entry."
                          color="#000ABC"
                        >
                          <InfoCircleOutlined style={{ color: '#000ABC' }} />
                        </Tooltip>
                      </span>
                      <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                        <RenderSelect
                          required
                          // colClassName="addonAfterClass"
                          formItemProps={{
                            name: 'comp1RunHourStart',
                            rules: [
                              {
                                required: true,
                                message: 'Please select begin record reading.'
                              }
                            ]
                          }}
                          inputProps={{
                            placeholder: 'Select',
                            options: [
                              { label: 'Yes', value: 'Yes' },
                              { label: 'No', value: 'No' }
                            ]
                          }}
                        />
                      </Col>
                    </div>
                  </Col>
                  {selectedChiller &&
                    selectedChiller?.numberOfCompressors?.toString() ===
                      NUMBER_OF_COMPRESSOR?.[1]?.value && (
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="otherLogForm">
                          <span className="mainlabel">
                            Comp 2 Run Hours{' '}
                            <Tooltip title="Enter 2nd compressor's running hours." color="#000ABC">
                              <InfoCircleOutlined style={{ color: '#000ABC' }} />
                            </Tooltip>
                          </span>
                          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                            <RenderTextInput
                              required
                              // colClassName="addonAfterClass"
                              formItemProps={{
                                name: 'comp2RunHours',
                                rules: [{ validator: validateCommonLogFields('comp 2 run hours') }]
                              }}
                              inputProps={{
                                onKeyDown: allowAverageLoad,
                                maxLength: 10,
                                type: 'text'
                              }}
                            />
                          </Col>
                        </div>
                      </Col>
                    )}{' '}
                  {selectedChiller &&
                    selectedChiller?.numberOfCompressors?.toString() ===
                      NUMBER_OF_COMPRESSOR?.[1]?.value && (
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="otherLogForm">
                          <span className="mainlabel">
                            Begin Record Reading{' '}
                            <Tooltip
                              title="Check this box if you want the system to start validating the compressor run hours from this log entry, if you check we will consider the hours entered as correct without validating it against the value of the past entry."
                              color="#000ABC"
                            >
                              <InfoCircleOutlined style={{ color: '#000ABC' }} />
                            </Tooltip>
                          </span>
                          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                            <RenderSelect
                              required
                              // colClassName="addonAfterClass"
                              formItemProps={{
                                name: 'comp2RunHourStart',
                                rules: [
                                  {
                                    required: true,
                                    message: 'Please select begin record reading.'
                                  }
                                ]
                              }}
                              inputProps={{
                                placeholder: 'Select',
                                options: [
                                  { label: 'Yes', value: 'Yes' },
                                  { label: 'No', value: 'No' }
                                ]
                              }}
                            />
                          </Col>
                        </div>
                      </Col>
                    )}
                  {selectedChiller &&
                    selectedChiller?.purgeReadingUnit === PURGE_READING_UNIT?.[1]?.value &&
                    selectedChiller?.havePurge && (
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="otherLogForm">
                          <span className="mainlabel">
                            Purge Time Hrs.{' '}
                            <Tooltip
                              title="Enter the duration of purge unit, that operates to remove non-condensable gases (like air) from the refrigerant system to maintain efficiency."
                              color="#000ABC"
                            >
                              <InfoCircleOutlined style={{ color: '#000ABC' }} />
                            </Tooltip>
                          </span>
                          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                            <RenderTextInput
                              required
                              // colClassName="addonAfterClass"
                              formItemProps={{
                                name: 'purgeTimeHr',
                                rules: [
                                  { validator: validateNonNegativeInteger('purge time in hours') }
                                ]
                              }}
                              inputProps={{
                                onKeyDown: allowOnlyNonNegativeInteger,
                                maxLength: 7,
                                type: 'text'
                              }}
                            />
                          </Col>
                        </div>
                      </Col>
                    )}
                  {selectedChiller && selectedChiller?.havePurge && (
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="otherLogForm">
                        <span className="mainlabel">
                          Purge Time Min.{' '}
                          <Tooltip
                            title="Enter the duration of purge unit, that operates to remove non-condensable gases (like air) from the refrigerant system to maintain efficiency."
                            color="#000ABC"
                          >
                            <InfoCircleOutlined style={{ color: '#000ABC' }} />
                          </Tooltip>
                        </span>
                        <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                          <RenderTextInput
                            required
                            // colClassName="addonAfterClass"
                            formItemProps={{
                              name: 'purgeTimeMin',
                              rules: [
                                { validator: validateNonNegativeInteger('purge time in minutes') }
                              ]
                            }}
                            inputProps={{
                              onKeyDown: allowOnlyNonNegativeInteger,
                              maxLength: 7,
                              type: 'text'
                            }}
                          />
                        </Col>
                      </div>
                    </Col>
                  )}
                </Row>
              </ShadowPaper>
            </Col>

            <Col xs={24} sm={24} md={24} lg={6} className="otherLogFormWrap">
              <ShadowPaper className="generalLogContentWrap">
                <h4>Electrical</h4>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <div className="otherLogForm">
                      <span className="mainlabel">
                        Amps Phase 1/% Load{' '}
                        <Tooltip
                          title="Amps Phase 1 : Enter the value for amps phase 1.
% Load : Enter the % load of the chiller."
                          color="#000ABC"
                        >
                          <InfoCircleOutlined style={{ color: '#000ABC' }} />
                        </Tooltip>
                      </span>
                      <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                        <RenderTextInput
                          required
                          // colClassName="addonAfterClass"
                          formItemProps={{
                            name: 'ampsPhase1'
                          }}
                          inputProps={{
                            onKeyDown: allowNegativeDecimalOnly,
                            maxLength: 10,
                            type: 'text'
                          }}
                        />
                      </Col>
                    </div>
                  </Col>
                  {selectedChiller &&
                    selectedChiller?.ampChoice === AMPERAGE_CHOICE?.[0]?.value && (
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="otherLogForm">
                          <span className="mainlabel">
                            Amps Phase 2{' '}
                            <Tooltip
                              title="Amps Phase 2 : Enter the value for amps phase 2."
                              color="#000ABC"
                            >
                              <InfoCircleOutlined style={{ color: '#000ABC' }} />
                            </Tooltip>
                          </span>
                          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                            <RenderTextInput
                              required
                              // colClassName="addonAfterClass"
                              formItemProps={{
                                name: 'ampsPhase2',
                                rules: [
                                  {
                                    validator: validateLogFieldWithMinMaxNonRequiredAmp(
                                      'amp phase 2',
                                      1500
                                    )
                                  }
                                ]
                              }}
                              inputProps={{
                                onFocus: () => handleFocus('ampsPhase2'),
                                onBlur: () => handleBlur('ampsPhase2'),
                                onKeyDown: allowNegativeDecimalOnly,
                                maxLength: 10,
                                type: 'text'
                              }}
                            />
                          </Col>
                        </div>
                      </Col>
                    )}
                  {selectedChiller &&
                    selectedChiller?.ampChoice === AMPERAGE_CHOICE?.[0]?.value && (
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="otherLogForm">
                          <span className="mainlabel">
                            Amps Phase 3{' '}
                            <Tooltip
                              title="Amps Phase 2 : Enter the value for amps phase 3."
                              color="#000ABC"
                            >
                              <InfoCircleOutlined style={{ color: '#000ABC' }} />
                            </Tooltip>
                          </span>
                          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                            <RenderTextInput
                              required
                              // colClassName="addonAfterClass"
                              formItemProps={{
                                name: 'ampsPhase3',
                                rules: [
                                  {
                                    validator: validateLogFieldWithMinMaxNonRequiredAmp(
                                      'amp phase 3',
                                      1500
                                    )
                                  }
                                ]
                              }}
                              inputProps={{
                                onFocus: () => handleFocus('ampsPhase3'),
                                onBlur: () => handleBlur('ampsPhase3'),
                                onKeyDown: allowNegativeDecimalOnly,
                                maxLength: 10,
                                type: 'text'
                              }}
                            />
                          </Col>
                        </div>
                      </Col>
                    )}{' '}
                  {selectedChiller &&
                    (selectedChiller?.voltageChoice === VOLTAGE_CHOICE?.[0]?.value ||
                      selectedChiller?.voltageChoice === VOLTAGE_CHOICE?.[1]?.value) && (
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="otherLogForm">
                          <span className="mainlabel">
                            Volts Phase 1{' '}
                            <Tooltip title="Enter the phase 1 volts." color="#000ABC">
                              <InfoCircleOutlined style={{ color: '#000ABC' }} />
                            </Tooltip>
                          </span>
                          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                            <RenderTextInput
                              required
                              // colClassName="addonAfterClass"
                              formItemProps={{
                                name: 'voltsPhase1',
                                rules: [
                                  {
                                    validator: validateLogFieldWithMinMaxNonRequired(
                                      'volts phase 1',
                                      850,
                                      1150
                                    )
                                  }
                                ]
                              }}
                              inputProps={{
                                onFocus: () => handleFocus('voltsPhase1'),
                                onBlur: () => handleBlur('voltsPhase1'),
                                onKeyDown: allowNegativeDecimalOnly,
                                maxLength: 10,
                                type: 'text'
                              }}
                            />
                          </Col>
                        </div>
                      </Col>
                    )}{' '}
                  {selectedChiller &&
                    selectedChiller?.voltageChoice === VOLTAGE_CHOICE?.[0]?.value && (
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="otherLogForm">
                          <span className="mainlabel">
                            Volts Phase 2{' '}
                            <Tooltip title="Enter the phase 2 volts." color="#000ABC">
                              <InfoCircleOutlined style={{ color: '#000ABC' }} />
                            </Tooltip>
                          </span>
                          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                            <RenderTextInput
                              required
                              // colClassName="addonAfterClass"
                              formItemProps={{
                                name: 'voltsPhase2',
                                rules: [
                                  {
                                    validator: validateLogFieldWithMinMaxNonRequired(
                                      'volts phase 2',
                                      850,
                                      1150
                                    )
                                  }
                                ]
                              }}
                              inputProps={{
                                onFocus: () => handleFocus('voltsPhase2'),
                                onBlur: () => handleBlur('voltsPhase2'),
                                onKeyDown: allowNegativeDecimalOnly,
                                maxLength: 10,
                                type: 'text'
                              }}
                            />
                          </Col>
                        </div>
                      </Col>
                    )}{' '}
                  {selectedChiller &&
                    selectedChiller?.voltageChoice === VOLTAGE_CHOICE?.[0]?.value && (
                      <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="otherLogForm">
                          <span className="mainlabel">
                            Volts Phase 3{' '}
                            <Tooltip title="Enter the phase 3 volts." color="#000ABC">
                              <InfoCircleOutlined style={{ color: '#000ABC' }} />
                            </Tooltip>
                          </span>
                          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
                            <RenderTextInput
                              required
                              // colClassName="addonAfterClass"
                              formItemProps={{
                                name: 'voltsPhase3',
                                rules: [
                                  {
                                    validator: validateLogFieldWithMinMaxNonRequired(
                                      'volts phase 3',
                                      850,
                                      1150
                                    )
                                  }
                                ]
                              }}
                              inputProps={{
                                onFocus: () => handleFocus('voltsPhase3'),
                                onBlur: () => handleBlur('voltsPhase3'),
                                onKeyDown: allowNegativeDecimalOnly,
                                maxLength: 10,
                                type: 'text'
                              }}
                            />
                          </Col>
                        </div>
                      </Col>
                    )}
                </Row>
              </ShadowPaper>
            </Col>
          </Row>
        </div>

        <div className="editButtonWrap extraActionButton">
          <Button
            className="title-cancel-btn"
            onClick={() => navigate(-1)}
            disabled={isPending || isEditPending || isLogLoading}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            shape="round"
            htmlType="button"
            onClick={onSubmit}
            className="title-btn"
            disabled={isPending || isEditPending || isLogLoading}
            loading={isPending || isEditPending}
            icon={!id && <PlusOutlined />}
          >
            {id ? 'Save' : 'Add / Save'}
          </Button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddEditLog;
