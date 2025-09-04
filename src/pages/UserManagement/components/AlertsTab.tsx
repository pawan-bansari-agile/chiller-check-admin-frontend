import React, { useEffect, useMemo, useState } from 'react';

import { WarningOutlined } from '@ant-design/icons';
import { Col, Form, Row } from 'antd';

import { facilityHooks } from '@/services/facility';
import { userHooks } from '@/services/user';

import {
  RenderCheckboxGroupInput,
  RenderSelectDropDown,
  RenderTextInput
} from '@/shared/components/common/FormField';
import { ALert, USER_ROLES, logConfigs } from '@/shared/constants';
import {
  allowHoursPerWeek,
  allowNegativeDecimalOnly,
  capitalizeFirstLetter
} from '@/shared/utils/functions';

import { Wrapper } from '../style';

interface IProps {
  form: any;
  id?: string;
  response?: any;
  isDisabled?: boolean;
  role?: string;
  companyId?: string;
  facilityIds?: string[];
  alertFacilities?: any[];
  alertOperators?: any[];
}

const alertMetrics = [
  { key: 'outsideAirTemp', label: 'Outside Air Temp.' },
  { key: 'efficiencyLoss', label: '% Efficiency Loss' },
  { key: 'condenserLoss', label: '% Condenser Loss' },
  { key: 'evaporatorLoss', label: '% Evaporator Loss' },
  { key: 'effLossAtFullLoad', label: '% Eff Loss at Full Load Profile' }
];

const secondAlertMetrics = [
  { key: 'nonCondenserLoss', label: '% Non-Condenser Loss' },
  { key: 'otherLoss', label: '% Other Loss' },
  { key: 'effLossAtAvgLoad', label: '% Eff Loss at Avg Load Profile' }
];

const metricLabelMap: Record<string, string> = {
  outsideAirTemp: 'Outside Air Temp.',
  efficiencyLoss: '% Efficiency Loss',
  condenserLoss: '% Condenser Loss',
  evaporatorLoss: '% Evaporator Loss',
  effLossAtFullLoad: '% Eff Loss at Full Load Profile',
  nonCondenserLoss: '% Non-Condenser Loss',
  otherLoss: '% Other Loss',
  effLossAtAvgLoad: '% Eff Loss at Avg Load Profile'
};

const AlertsTab: React.FC<IProps> = ({
  form,
  id,
  response,
  isDisabled,
  role,
  companyId,
  facilityIds,
  alertFacilities,
  alertOperators
}) => {
  const [programCompanyId, setProgramCompanyId] = useState<string>('');
  const [programFacilityIds, setProgramFacilityIds] = useState<string[] | []>([]);

  const { data: facilityList, isLoading } =
    facilityHooks.AllFacilityListByCompany(programCompanyId);

  const { data: operatorList, isLoading: isOperatorLoading } =
    userHooks.OperatorsList(programFacilityIds);

  const facilityOptions = useMemo(() => {
    return (
      facilityList?.map((facility) => ({
        label: capitalizeFirstLetter(facility?.name),
        value: facility?._id
      })) || []
    );
  }, [facilityList]);

  useEffect(() => {
    if (companyId) setProgramCompanyId(companyId);
  }, [companyId]);

  useEffect(() => {
    if (facilityIds?.length) setProgramFacilityIds(facilityIds);
  }, [facilityIds]);

  useEffect(() => {
    if (id && response) {
      const transformed = transformAlertApiResponse(response);
      form.setFieldsValue(transformed);
      form.setFieldValue(
        'notifyBy',
        response?.general?.notifyBy === 'both' ? ['web', 'email'] : [response?.general?.notifyBy]
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, response, form]);

  const formatMetricToKey = (label: string): string => {
    const entry = Object.entries(metricLabelMap).find(([, val]) => val === label);
    return entry?.[0] || label;
  };

  const transformAlertApiResponse = (response: any) => {
    const general: any = {};

    (response?.general?.conditions || []).forEach((item: any) => {
      const key = formatMetricToKey(item.metric); // e.g., 'Outside Air Temp.' → 'outsideAirTemp'
      general[key] = {};

      if (item.warning) {
        general[key].warning = {
          ...item.warning,
          threshold:
            item.warning.threshold !== undefined && item.warning.threshold !== null
              ? String(item.warning.threshold)
              : undefined
        };
      }

      if (item.alert) {
        general[key].alert = {
          ...item.alert,
          threshold:
            item.alert.threshold !== undefined && item.alert.threshold !== null
              ? String(item.alert.threshold)
              : undefined
        };
      }
    });

    const logs = logConfigs.map(({ type, index }) => {
      const matchedLog = (response.logs || []).find((log: any) => log.type === type);

      if (matchedLog) {
        let notifyBy: string[] = [];
        if (matchedLog.notifyBy === 'web') notifyBy = ['web'];
        else if (matchedLog.notifyBy === 'email') notifyBy = ['email'];
        else if (matchedLog.notifyBy === 'both') notifyBy = ['web', 'email'];

        if (matchedLog?.type === 'program') {
          form.setFieldValue('programFacility', matchedLog?.facilityIds?.[0] || null);
          form.setFieldValue(
            'programOperator',
            matchedLog?.operatorIds?.length ? matchedLog?.operatorIds : null
          );
        } else {
          form.setFieldValue('programFacility', null);
          form.setFieldValue('programOperator', null);
        }

        return {
          ...matchedLog,
          type,
          index,
          notifyBy,
          daysSince:
            matchedLog.daysSince !== undefined && matchedLog.daysSince !== null
              ? String(matchedLog.daysSince)
              : undefined
        };
      }

      // Default blank structure for missing logs
      return {
        type,
        index,
        notifyBy: [],
        daysSince: undefined
      };
    });

    return {
      general,
      logs
    };
  };
  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <div className="alertBoxes">
            <RenderCheckboxGroupInput
              colProps={{ span: 24 }}
              required={true}
              colClassName="automatedNotification"
              formItemProps={{
                label: 'Automated Notification',
                name: 'notifyBy'
              }}
              inputProps={{
                disabled: isDisabled
              }}
              options={[
                { label: 'Web', value: 'web' },
                { label: 'Email', value: 'email' }
              ]}
            />
            <div className="scrollDiv">
              <div className="notificationAlertListWrap">
                <div className="notificationAlertList">
                  <div className="generalWrap">
                    <div className="generalName">
                      <span>General</span>
                    </div>
                    <div className="warningLabel">
                      <span>
                        <i style={{ color: '#F04924' }}>*</i> Warning{' '}
                        <WarningOutlined style={{ color: '#FEBE00' }} />
                      </span>
                    </div>
                    <div className="warningLabel">
                      <span>
                        <i style={{ color: '#F04924' }}>*</i> Alert{' '}
                        <WarningOutlined style={{ color: '#F04924' }} />
                      </span>
                    </div>
                  </div>
                  {alertMetrics?.map((metric) => (
                    <div className="generalWrap" key={metric.key}>
                      <div className="generalName">
                        <h3>{metric.label}</h3>
                      </div>

                      {['warning', 'alert'].map((type) => (
                        <div className="warningLabel" key={type}>
                          <Row gutter={[3, 3]}>
                            <Col span={10}>
                              <Form.Item
                                shouldUpdate={(prev, curr) =>
                                  prev?.general?.[metric.key]?.[type]?.threshold !==
                                  curr?.general?.[metric.key]?.[type]?.threshold
                                }
                                noStyle
                              >
                                {({ getFieldValue }) => {
                                  const threshold = getFieldValue([
                                    'general',
                                    metric.key,
                                    type,
                                    'threshold'
                                  ]);
                                  return (
                                    <RenderSelectDropDown
                                      formItemProps={{
                                        name: ['general', metric.key, type, 'operator'],
                                        rules: [
                                          {
                                            validator: (_, value) => {
                                              if (threshold && !value) {
                                                return Promise.reject(
                                                  new Error(
                                                    `${capitalizeFirstLetter(type)} operator is required.`
                                                  )
                                                );
                                              }
                                              return Promise.resolve();
                                            }
                                          }
                                        ]
                                      }}
                                      inputProps={{
                                        options: ALert || [],
                                        disabled: isDisabled,
                                        onChange: (value: any) => {
                                          if (!value) {
                                            form.setFieldsValue({
                                              general: {
                                                [metric.key]: {
                                                  [type]: {
                                                    threshold: undefined
                                                  }
                                                }
                                              }
                                            });
                                          }
                                          form.validateFields([
                                            ['general', metric.key, type, 'threshold']
                                          ]);
                                        }
                                      }}
                                    />
                                  );
                                }}
                              </Form.Item>
                            </Col>
                            <Col span={14}>
                              <Form.Item
                                shouldUpdate={(prev, curr) =>
                                  prev?.general?.[metric.key]?.[type]?.operator !==
                                  curr?.general?.[metric.key]?.[type]?.operator
                                }
                                noStyle
                              >
                                {({ getFieldValue }) => {
                                  const operator = getFieldValue([
                                    'general',
                                    metric.key,
                                    type,
                                    'operator'
                                  ]);
                                  return (
                                    <RenderTextInput
                                      label=""
                                      required={false}
                                      colClassName="addonAfterClass"
                                      formItemProps={{
                                        name: ['general', metric.key, type, 'threshold'],
                                        rules: [
                                          {
                                            validator(_, value) {
                                              if (!operator) return Promise.resolve();
                                              if (operator && !value) {
                                                return Promise.reject(
                                                  new Error(
                                                    `${capitalizeFirstLetter(type)} threshold is required.`
                                                  )
                                                );
                                              }

                                              if (
                                                value === undefined ||
                                                value === null ||
                                                value.trim() === '' ||
                                                value === '-' ||
                                                value === '.' ||
                                                value === '-.'
                                              ) {
                                                return Promise.reject(
                                                  new Error('Please enter a valid value.')
                                                );
                                              }

                                              const validNumberRegex = /^-?\d+(\.\d+)?$/;

                                              if (!validNumberRegex.test(value)) {
                                                return Promise.reject(
                                                  new Error('Please enter a valid value.')
                                                );
                                              }

                                              const num = Number(value);

                                              if (isNaN(num)) {
                                                return Promise.reject(
                                                  new Error('Please enter a valid value.')
                                                );
                                              }

                                              return Promise.resolve();
                                            }
                                          }
                                        ]
                                      }}
                                      inputProps={{
                                        placeholder: '',
                                        disabled: isDisabled,
                                        type: 'text',
                                        addonAfterText:
                                          metric?.key === 'outsideAirTemp' ? '℉' : '%',
                                        onChange: () =>
                                          form.validateFields([
                                            ['general', metric.key, type, 'operator']
                                          ]),
                                        onKeyDown: allowNegativeDecimalOnly
                                      }}
                                    />
                                  );
                                }}
                              </Form.Item>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="notificationAlertList">
                  <div className="generalWrap">
                    <div className="generalName">
                      <span></span>
                    </div>
                    <div className="warningLabel">
                      <span>
                        <i style={{ color: '#F04924' }}>*</i> Warning{' '}
                        <WarningOutlined style={{ color: '#FEBE00' }} />
                      </span>
                    </div>
                    <div className="warningLabel">
                      <span>
                        <i style={{ color: '#F04924' }}>*</i> Alert{' '}
                        <WarningOutlined style={{ color: '#F04924' }} />
                      </span>
                    </div>
                  </div>
                  {secondAlertMetrics?.map((metric) => (
                    <div className="generalWrap" key={metric.key}>
                      <div className="generalName">
                        <h3>{metric.label}</h3>
                      </div>

                      {['warning', 'alert'].map((type) => (
                        <div className="warningLabel" key={type}>
                          <Row gutter={[3, 3]}>
                            <Col span={10}>
                              <Form.Item
                                shouldUpdate={(prev, curr) =>
                                  prev?.general?.[metric.key]?.[type]?.threshold !==
                                  curr?.general?.[metric.key]?.[type]?.threshold
                                }
                                noStyle
                              >
                                {({ getFieldValue }) => {
                                  const threshold = getFieldValue([
                                    'general',
                                    metric.key,
                                    type,
                                    'threshold'
                                  ]);
                                  return (
                                    <RenderSelectDropDown
                                      formItemProps={{
                                        name: ['general', metric.key, type, 'operator'],
                                        rules: [
                                          {
                                            validator: (_, value) => {
                                              if (threshold && !value) {
                                                return Promise.reject(
                                                  new Error(
                                                    `${capitalizeFirstLetter(type)} operator is required.`
                                                  )
                                                );
                                              }
                                              return Promise.resolve();
                                            }
                                          }
                                        ]
                                      }}
                                      inputProps={{
                                        options: ALert || [],
                                        disabled: isDisabled,
                                        onChange: (value: any) => {
                                          if (!value) {
                                            form.setFieldsValue({
                                              general: {
                                                [metric.key]: {
                                                  [type]: {
                                                    threshold: undefined
                                                  }
                                                }
                                              }
                                            });
                                            return;
                                          }
                                          form.validateFields([
                                            ['general', metric.key, type, 'threshold']
                                          ]);
                                        }
                                      }}
                                    />
                                  );
                                }}
                              </Form.Item>
                            </Col>
                            <Col span={14}>
                              <Form.Item
                                shouldUpdate={(prev, curr) =>
                                  prev?.general?.[metric.key]?.[type]?.operator !==
                                  curr?.general?.[metric.key]?.[type]?.operator
                                }
                                noStyle
                              >
                                {({ getFieldValue }) => {
                                  const operator = getFieldValue([
                                    'general',
                                    metric.key,
                                    type,
                                    'operator'
                                  ]);
                                  return (
                                    <RenderTextInput
                                      label=""
                                      required={false}
                                      colClassName="addonAfterClass"
                                      formItemProps={{
                                        name: ['general', metric.key, type, 'threshold'],
                                        rules: [
                                          {
                                            validator(_, value) {
                                              if (!operator) return Promise.resolve();
                                              if (operator && !value) {
                                                return Promise.reject(
                                                  new Error(
                                                    `${capitalizeFirstLetter(type)} threshold is required.`
                                                  )
                                                );
                                              }

                                              if (
                                                value === undefined ||
                                                value === null ||
                                                value.trim() === '' ||
                                                value === '-' ||
                                                value === '.' ||
                                                value === '-.'
                                              ) {
                                                return Promise.reject(
                                                  new Error('Please enter a valid value.')
                                                );
                                              }

                                              const validNumberRegex = /^-?\d+(\.\d+)?$/;

                                              if (!validNumberRegex.test(value)) {
                                                return Promise.reject(
                                                  new Error('Please enter a valid value.')
                                                );
                                              }

                                              const num = Number(value);

                                              if (isNaN(num)) {
                                                return Promise.reject(
                                                  new Error('Please enter a valid value.')
                                                );
                                              }

                                              return Promise.resolve();
                                            }
                                          }
                                        ]
                                      }}
                                      inputProps={{
                                        placeholder: '',
                                        disabled: isDisabled,
                                        type: 'text',
                                        addonAfterText: '%',
                                        onChange: () =>
                                          form.validateFields([
                                            ['general', metric.key, type, 'operator']
                                          ]),
                                        onKeyDown: allowNegativeDecimalOnly
                                      }}
                                    />
                                  );
                                }}
                              </Form.Item>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div className="alertBoxes">
            <h2 className="logEntryLabel">Log Entries</h2>
            <div className="scrollDiv">
              <div className="logEntryListWrap">
                {logConfigs
                  ?.filter((log, idx, arr) => {
                    // If the role is 'operator' and this is the last item and of type 'program', exclude it
                    const isLast = idx === arr.length - 1;
                    return !(role === USER_ROLES.OPERATOR && isLast && log.type === 'program');
                  })
                  ?.map((log) => (
                    <div className="logEntryList" key={log.type}>
                      {/* Hidden input to store log type */}
                      <Form.Item
                        name={['logs', log.index, 'type']}
                        initialValue={log.type}
                        hidden
                      />

                      <div className="logInput">
                        <RenderTextInput
                          label=""
                          required={false}
                          colClassName="logmaininput"
                          formItemProps={{
                            name: ['logs', log.index, 'daysSince']
                          }}
                          inputProps={{
                            type: 'text',
                            inputMode: 'numeric',
                            maxLength: 10,
                            disabled: isDisabled,
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                              const newValue = e.target.value;
                              const trimmed = newValue.trim();
                              if (!trimmed) {
                                // Clear notifyBy if input is cleared
                                form.setFieldValue(['logs', log.index, 'notifyBy'], undefined);
                              }
                            },
                            onKeyDown: allowHoursPerWeek
                          }}
                        />
                        <span className="logInputLabel">{log.label}</span>
                      </div>

                      <div className="logDropdown">
                        {log.type === 'program' && (
                          <>
                            {role === USER_ROLES.CORPORATE_MANAGER && (
                              <Form.Item
                                shouldUpdate={(prev, curr) =>
                                  prev?.logs?.[log.index]?.daysSince !==
                                  curr?.logs?.[log.index]?.daysSince
                                }
                                noStyle
                              >
                                {({ getFieldValue }) => {
                                  const value = getFieldValue(['logs', log.index, 'daysSince']);
                                  const isDisabledPrivate = !value || String(value).trim() === '';
                                  return (
                                    <RenderSelectDropDown
                                      colClassName="dropdownWithSearch operatorSelect"
                                      formItemProps={{
                                        name: 'programFacility'
                                      }}
                                      inputProps={{
                                        placeholder: 'Select Facilities',
                                        onChange: (value) => {
                                          form.setFieldValue('programOperator', null);
                                          setProgramFacilityIds([value]);
                                        },
                                        // options: facilityOptions || [],
                                        options: isDisabled
                                          ? [
                                              {
                                                label: alertFacilities?.[0]?.name,
                                                value: alertFacilities?.[0]?._id
                                              }
                                            ]
                                          : facilityOptions || [],
                                        disabled:
                                          isDisabled ||
                                          isLoading ||
                                          isDisabledPrivate ||
                                          !facilityOptions?.length
                                      }}
                                    />
                                  );
                                }}
                              </Form.Item>
                            )}
                            {(role === USER_ROLES.FACILITY_MANAGER ||
                              role === USER_ROLES.CORPORATE_MANAGER) && (
                              <Form.Item
                                shouldUpdate={(prev, curr) =>
                                  prev?.logs?.[log.index]?.daysSince !==
                                  curr?.logs?.[log.index]?.daysSince
                                }
                                noStyle
                              >
                                {({ getFieldValue }) => {
                                  const value = getFieldValue(['logs', log.index, 'daysSince']);
                                  const isDisabledPrivate = !value || String(value).trim() === '';
                                  return (
                                    <RenderSelectDropDown
                                      colClassName="dropdownWithSearch operatorSelect"
                                      formItemProps={{
                                        name: 'programOperator'
                                      }}
                                      inputProps={{
                                        mode: 'multiple',
                                        placeholder: 'Select Operators',
                                        options: isDisabled
                                          ? alertOperators?.map((operator) => {
                                              return {
                                                label:
                                                  operator?.firstName + ' ' + operator?.lastName,
                                                value: operator?._id
                                              };
                                            })
                                          : operatorList || [],
                                        disabled:
                                          isDisabled ||
                                          isDisabledPrivate ||
                                          isOperatorLoading ||
                                          !operatorList?.length,
                                        maxTagCount: 1,
                                        maxTagPlaceholder: (omittedValues: any[]) => (
                                          <span
                                            title={omittedValues
                                              ?.map((value) => value?.label)
                                              ?.join(', ')}
                                          >
                                            +{omittedValues.length}
                                          </span>
                                        )
                                      }}
                                    />
                                  );
                                }}
                              </Form.Item>
                            )}
                          </>
                        )}
                      </div>

                      <div className="logCheckbox">
                        <span className="automatedLabel">Automated Notification</span>

                        <Form.Item
                          shouldUpdate={(prev, curr) =>
                            prev?.logs?.[log.index]?.daysSince !==
                            curr?.logs?.[log.index]?.daysSince
                          }
                          noStyle
                        >
                          {({ getFieldValue }) => {
                            const value = getFieldValue(['logs', log.index, 'daysSince']);
                            const isDisabledPrivate = !value || String(value).trim() === '';
                            return (
                              <RenderCheckboxGroupInput
                                colProps={{ span: 12 }}
                                formItemProps={{
                                  label: '',
                                  name: ['logs', log.index, 'notifyBy']
                                }}
                                inputProps={{
                                  disabled: isDisabled || isDisabledPrivate
                                }}
                                options={[
                                  { label: 'Web', value: 'web' },
                                  { label: 'Email', value: 'email' }
                                ]}
                              />
                            );
                          }}
                        </Form.Item>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default AlertsTab;
