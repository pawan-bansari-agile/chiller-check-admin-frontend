import React, { useEffect, useMemo, useRef } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { ClockCircleOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, Tooltip } from 'antd';

import { chillerQueryKeys } from '@/services/chiller';
import { companyHooks, companyQueryKeys } from '@/services/company';
import { dashboardQueryKey } from '@/services/dashboard';
import { facilityHooks, facilityQueryKeys } from '@/services/facility';
import { logQueryKeys } from '@/services/log';
import { maintenanceQueryKey } from '@/services/maintenance';
import { reportQueryKey } from '@/services/report';
import { userQueryKeys } from '@/services/user';

import { authStore } from '@/store/auth';

import {
  RenderGoogleAutocompleteInput,
  RenderSelect,
  RenderTextInput
} from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import {
  ALTITUDE_OPTIONS,
  APP_ENV,
  COUNTRY,
  ENVIRONMENT,
  MAKE,
  MEASUREMENT_UNITS,
  PATTERNS,
  STATES,
  TIMEZONE_OPTIONS,
  refrigerantOptions,
  yearOptions
} from '@/shared/constants';
import {
  allowAverageLoad,
  allowEnergyCost,
  allowHoursPerWeek,
  allowNegativeDecimalOnly,
  allowTonsKwr,
  capitalizeFirstLetter,
  capitalizeFirstLetterWhileTyping,
  getUnitValidator,
  showToaster,
  uniqueFieldValidator,
  validateAverageLoad,
  validateEnergyCost,
  validateWeeklyHours
} from '@/shared/utils/functions';

import { Wrapper } from '../style';

interface FacilityChillers {
  chillerName: string;
  make: string;
  model: string;
  refrigType: string;
  manufacturedYear: string;
  tons?: string;
  serialNumber: string;
  energyCost: string;
  weeklyHours: string;
  weeksPerYear: string;
  avgLoadProfile: string;
  unit: string;
  kwr?: string;
}

interface IFormValues {
  companyId: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  timezone: string;
  altitude: number;
  altitudeUnit: string;
  chillers: FacilityChillers[] | [] | undefined;
}

const FacilityAddEditForm: React.FC = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { userData } = authStore((state) => state);
  const queryClient = useQueryClient();
  const { data: companyList, isLoading: isCompanyLoading } = companyHooks.AllCompanyList();
  const { mutate: addFacilityAction, isPending } = facilityHooks.useAddFacility();
  const { mutate: editFacilityAction, isPending: isEditPending } = facilityHooks.useEditFacility();
  const { data, isLoading } = facilityHooks.FacilityView(id ?? '');

  const initialChillersLength = useRef(0);

  useEffect(() => {
    if (userData?.companyId && !isCompanyLoading) {
      form.setFieldValue('companyId', userData?.companyId);
    }
  }, [form, id, isCompanyLoading, userData?.companyId]);

  useEffect(() => {
    if (!data) return;

    const mappedChillers =
      data?.chillers?.map((chiller) => {
        return {
          chillerName: chiller?.ChillerNo,
          model: chiller?.model,
          make: chiller?.make,
          weeklyHours: chiller?.weeklyHours?.toString(),
          weeksPerYear: chiller?.weeksPerYear?.toString(),
          avgLoadProfile: chiller?.avgLoadProfile?.toString(),
          serialNumber: chiller?.serialNumber,
          manufacturedYear: chiller?.manufacturedYear,
          energyCost: chiller?.energyCost,
          refrigType: chiller?.refrigType,
          unit: chiller?.unit,
          tons: chiller?.unit === MEASUREMENT_UNITS?.[0]?.value ? chiller?.tons : chiller?.kwr
        };
      }) || [];

    initialChillersLength.current = mappedChillers.length;

    form.setFieldsValue({
      name: data?.name,
      address1: data?.address1,
      address2: data?.address2,
      city: data?.city,
      state: data?.state,
      zipcode: data?.zipcode,
      country: data?.country,
      companyId: data?.companyId,
      chillers: mappedChillers,
      altitude: data?.altitude?.toString(),
      altitudeUnit: data?.altitudeUnit,
      timezone: data?.timezone
    });
  }, [data, form]);

  const shouldDisable = (index: number) => index < initialChillersLength.current;

  const companyOptions = useMemo(() => {
    return (
      companyList?.map((company) => ({
        label: capitalizeFirstLetter(company?.name),
        value: company?._id
      })) || []
    );
  }, [companyList]);

  const handleCapitalizedChange =
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const capitalized = capitalizeFirstLetterWhileTyping(e.target.value);
      form.setFieldsValue({ [fieldName]: capitalized });
    };

  const clearFieldErrors = (fields: { name: any; errors: string[] }[]) => {
    if (fields.length) {
      form.setFields(fields);
    }
  };

  const onPlaceSelected = (place: any) => {
    const getComponent = (type: string) =>
      place?.address_components?.find((comp: any) => comp.types.includes(type))?.long_name;

    const city = getComponent('locality');
    const state = getComponent('administrative_area_level_1');
    const zipcode = getComponent('postal_code');
    const country = place?.address_components?.find((comp: any) =>
      comp.types.includes('country')
    )?.short_name;

    form.setFieldsValue({ address1: place?.name, city, state, zipcode, country });

    clearFieldErrors(
      ['city', 'state', 'zipcode', 'address1', 'country']
        .filter((field) => !!form.getFieldValue(field))
        .map((field) => ({ name: field, errors: [] }))
    );
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

  const buildChillerPayload = (chillers: FacilityChillers[] | []) => {
    return chillers?.length
      ? chillers.slice(id ? initialChillersLength.current : 0).map((chiller) => {
          const unit = chiller?.unit;
          const isMetric = unit === MEASUREMENT_UNITS[1]?.value;
          const isEnglish = unit === MEASUREMENT_UNITS[0]?.value;

          const dynamicKey = isMetric ? 'kwr' : isEnglish ? 'tons' : undefined;
          const capacity = chiller?.tons ? Number(chiller?.tons) : undefined;

          return {
            name: chiller?.chillerName,
            weeklyHours: Number(chiller?.weeklyHours),
            weeksPerYear: Number(chiller?.weeksPerYear),
            avgLoadProfile: Number(chiller?.avgLoadProfile),
            make: chiller?.make,
            model: chiller?.model,
            serialNumber: chiller?.serialNumber,
            manufacturedYear: Number(chiller?.manufacturedYear),
            refrigType: chiller?.refrigType,
            energyCost: Number(chiller?.energyCost),
            unit: chiller?.unit,
            ...(dynamicKey ? { [dynamicKey]: capacity } : {}) // ✅ dynamic key
          };
        })
      : [];
  };

  const onSubmit = (values: IFormValues) => {
    const payload = {
      ...values,
      altitude: Number(values?.altitude),
      zipcode: values?.zipcode?.trim()?.toUpperCase(),
      chillers: buildChillerPayload(values?.chillers || [])
    };

    if (id) {
      editFacilityAction(
        { ...payload, _id: id },
        {
          onSuccess: (res) => handleSuccess(res?.message || ''),
          onError: handleError
        }
      );
    } else {
      addFacilityAction(payload, {
        onSuccess: (res) => handleSuccess(res?.message || ''),
        onError: handleError
      });
    }
  };

  return (
    <Wrapper>
      <div className="shadowPaperWrap">
        {isLoading && <Loader />}
        <Form
          className="add-facility-form"
          onFinish={onSubmit}
          form={form}
          disabled={isPending || isLoading || isEditPending}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
        >
          <HeaderToolbar
            title={id ? 'Edit Facility' : 'Add Facility'}
            backBtn={true}
            className="addEditHeader"
            button={
              <div className="editButtonWrap">
                <Button
                  className="title-cancel-btn"
                  onClick={() => navigate(-1)}
                  disabled={isPending || isEditPending}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  className="title-btn"
                  loading={isPending || isEditPending}
                  disabled={isPending || isEditPending || isLoading}
                  htmlType="submit"
                  icon={!id && <PlusOutlined />}
                >
                  {id ? 'Save' : 'Add / Save'}
                </Button>
              </div>
            }
          />
          <ShadowPaper>
            <div className="facilityFormWrap">
              <Row gutter={[20, 20]}>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <RenderSelect
                    label="Company Name"
                    colClassName="custom-select-col"
                    formItemProps={{
                      name: 'companyId',
                      rules: [{ required: true, message: 'Please select company' }]
                    }}
                    inputProps={{
                      placeholder: 'Select Company',
                      options: companyOptions || [],
                      disabled:
                        isCompanyLoading ||
                        isPending ||
                        isLoading ||
                        isEditPending ||
                        !!userData?.companyId
                    }}
                  />
                </Col>

                <Col xs={24} sm={24} md={12} lg={12}>
                  <RenderTextInput
                    label="Facility Name"
                    required
                    // tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                    formItemProps={{
                      name: 'name',
                      rules: [
                        {
                          required: true,
                          message: 'Please enter facility name.'
                        },
                        {
                          pattern: PATTERNS.BLANK_SPACE,
                          message: 'Please enter valid facility name.'
                        }
                      ]
                    }}
                    inputProps={{
                      placeholder: 'Enter Facility Name',
                      onChange: handleCapitalizedChange('name')
                    }}
                  />
                </Col>

                <Col xs={24} sm={24} md={12} lg={12}>
                  {APP_ENV !== ENVIRONMENT['LOCAL'] ? (
                    <RenderGoogleAutocompleteInput
                      formItemProps={{
                        name: 'address1',
                        label: 'Address Line 1',
                        required: true,
                        rules: [
                          {
                            required: true,
                            message: 'Please enter address line1.'
                          },
                          {
                            pattern: PATTERNS.BLANK_SPACE,
                            message: 'Please enter valid address line1.'
                          }
                        ]
                      }}
                      inputProps={{
                        placeholder: 'Address Line 1',
                        onChange: handleCapitalizedChange('address1'),
                        disabled: isPending || isLoading || isEditPending
                      }}
                      googleAutocompleteProps={{
                        onPlaceSelected,
                        options: {
                          fields: ['ALL'],
                          types: ['geocode'], // Restrict to geocode type (addresses).
                          componentRestrictions: { country: ['us', 'ca'] }
                        }
                      }}
                    />
                  ) : (
                    <RenderTextInput
                      label="Address Line 1"
                      required
                      formItemProps={{
                        name: 'address1',
                        rules: [
                          {
                            required: true,
                            message: 'Please enter address line1.'
                          },
                          {
                            pattern: PATTERNS.BLANK_SPACE,
                            message: 'Please enter valid address line1.'
                          }
                        ]
                      }}
                      inputProps={{
                        placeholder: 'Address Line 1',
                        onChange: handleCapitalizedChange('address1'),
                        disabled: isPending || isLoading || isEditPending
                      }}
                    />
                  )}
                </Col>

                <Col xs={24} sm={24} md={12} lg={12}>
                  <RenderTextInput
                    label="Address Line 2"
                    formItemProps={{
                      name: 'address2',
                      rules: [
                        {
                          pattern: PATTERNS.BLANK_SPACE,
                          message: 'Please enter valid address line2.'
                        }
                      ]
                    }}
                    inputProps={{
                      placeholder: 'Address Line 2',
                      onChange: handleCapitalizedChange('address2')
                    }}
                  />
                </Col>

                <Col xs={24} sm={24} md={12} lg={12}>
                  <RenderTextInput
                    label="City"
                    required
                    formItemProps={{
                      name: 'city',
                      rules: [
                        {
                          required: true,
                          message: 'Please enter city.'
                        },
                        {
                          pattern: PATTERNS.BLANK_SPACE,
                          message: 'Please enter valid city.'
                        }
                      ]
                    }}
                    inputProps={{
                      placeholder: 'Enter City',
                      onChange: handleCapitalizedChange('city')
                    }}
                  />
                </Col>

                <Col xs={24} sm={24} md={12} lg={12}>
                  <RenderSelect
                    label="State"
                    colClassName="custom-select-col"
                    formItemProps={{
                      name: 'state',
                      rules: [{ required: true, message: 'Please select state.' }]
                    }}
                    inputProps={{
                      disabled: isPending || isLoading || isEditPending,
                      placeholder: 'Select State',
                      options: STATES
                    }}
                  />
                </Col>

                <Col xs={24} sm={24} md={12} lg={12}>
                  <RenderTextInput
                    label="Zipcode"
                    required
                    formItemProps={{
                      name: 'zipcode',
                      rules: [
                        {
                          required: true,
                          message: 'Please enter zipcode.'
                        },
                        {
                          pattern: PATTERNS.BLANK_SPACE,
                          message: 'Please enter a valid ipcode.'
                        }
                      ]
                    }}
                    inputProps={{
                      placeholder: 'Enter Zipcode',
                      // maxLength: 7,
                      inputMode: 'text' // shows numeric keyboard on mobile
                      // pattern: '[0-9]*', // prevents character input on some browsers
                      // onKeyDown: allowOnlyNumbers
                    }}
                  />
                </Col>

                <Col xs={24} sm={24} md={12} lg={12}>
                  <RenderSelect
                    label="Country"
                    colClassName="custom-select-col"
                    formItemProps={{
                      name: 'country',
                      rules: [
                        {
                          required: true,
                          message: 'Please select country'
                        }
                      ]
                    }}
                    inputProps={{
                      placeholder: 'Select Country',
                      options: COUNTRY
                    }}
                  />
                </Col>

                <Col xs={24} sm={24} md={12} lg={12}>
                  <RenderSelect
                    label="TimeZone"
                    colProps={{ xs: 24 }}
                    formItemProps={{
                      name: 'timezone',
                      rules: [{ required: true, message: 'Please select timezone.' }]
                    }}
                    inputProps={{
                      disabled: isPending || isLoading || isEditPending,
                      placeholder: 'Select Timezone',
                      suffixIcon: <ClockCircleOutlined />,
                      options: TIMEZONE_OPTIONS
                    }}
                  />
                </Col>

                <Col xs={24} sm={24} md={12} lg={12}>
                  <Row gutter={[10, 10]} className="altitudeRow">
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <RenderTextInput
                        label="Altitude"
                        required
                        formItemProps={{
                          name: 'altitude',
                          validateFirst: true,
                          rules: [
                            {
                              required: true,
                              message: 'Please enter altitude.'
                            },
                            {
                              validator(_, value) {
                                const unit = form.getFieldValue('altitudeUnit');

                                if (
                                  value === undefined ||
                                  value === null ||
                                  value.trim() === '' ||
                                  value === '-' ||
                                  value === '.' ||
                                  value === '-.'
                                ) {
                                  return Promise.reject(
                                    new Error('Please enter a valid altitude.')
                                  );
                                }

                                const validNumberRegex = /^-?\d+(\.\d+)?$/;

                                if (!validNumberRegex.test(value)) {
                                  return Promise.reject(
                                    new Error('Please enter a valid altitude.')
                                  );
                                }

                                const num = Number(value);

                                if (isNaN(num)) {
                                  return Promise.reject(
                                    new Error('Please enter a valid altitude.')
                                  );
                                }

                                if (unit === 'meter' && (num < -500 || num > 30000)) {
                                  return Promise.reject(
                                    new Error('Altitude must be between -500 and 30,000 meters.')
                                  );
                                }

                                if (unit === 'feet' && (num < -1640 || num > 98425)) {
                                  return Promise.reject(
                                    new Error('Altitude must be between -1640 and 98,425 feet.')
                                  );
                                }

                                return Promise.resolve();
                              }
                            }
                          ]
                        }}
                        inputProps={{
                          placeholder: 'Enter Altitude',
                          maxLength: 10,
                          type: 'text',
                          onKeyDown: allowNegativeDecimalOnly
                        }}
                      />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                      <RenderSelect
                        colClassName="selectUnitFacility"
                        formItemProps={{
                          name: 'altitudeUnit',
                          rules: [{ required: true, message: 'Please select unit.' }]
                        }}
                        inputProps={{
                          disabled: isPending || isLoading || isEditPending,
                          placeholder: 'Select Unit',
                          options: ALTITUDE_OPTIONS,
                          onChange: () => {
                            form.validateFields(['altitude']); // 👈 revalidate altitude
                          }
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </ShadowPaper>

          <ShadowPaper>
            <div className="addFacilityHeader">
              <h2 className="themeColor">Chillers</h2>
            </div>
            <Form.List name="chillers">
              {(fields, { add, remove }) => (
                <>
                  {fields.length > 0 && (
                    <CommonTable
                      className="facilityChillerTable"
                      scroll={{ x: 'max-content' }}
                      rowKey={'_id'}
                      columns={[
                        {
                          title: '#',
                          key: 'index',
                          width: 60,
                          render: (_: any, __: any, index: number) => <>{index + 1}</>
                        },
                        {
                          title: (
                            <>
                              <span className="requiredStar">*</span>
                              Chiller Name
                            </>
                          ),
                          width: 250,
                          key: 'chillerName',
                          render: (_: any, __: any, index: number) => (
                            <RenderTextInput
                              required={false}
                              formItemProps={{
                                name: [index, 'chillerName'],
                                validateFirst: true,
                                rules: shouldDisable(index)
                                  ? []
                                  : [
                                      {
                                        required: true,
                                        message: 'Please enter chiller name.'
                                      },
                                      {
                                        pattern: PATTERNS.BLANK_SPACE,
                                        message: 'Please enter valid chiller name.'
                                      },
                                      {
                                        validator: uniqueFieldValidator(
                                          form,
                                          'chillers',
                                          'chillerName',
                                          'Chiller name must be unique.'
                                        )
                                      }
                                    ]
                              }}
                              inputProps={{
                                placeholder: 'Chiller Name',
                                disabled: shouldDisable(index),
                                onChange: () => {
                                  const fields = form.getFieldValue('chillers') || [];
                                  // Trigger validation for all chillerName fields
                                  fields.forEach((_: any, i: number) => {
                                    form.validateFields([['chillers', i, 'chillerName']]);
                                  });
                                }
                              }}
                            />
                          )
                        },
                        {
                          title: (
                            <>
                              <span className="requiredStar">*</span>
                              Units
                            </>
                          ),
                          key: 'Units',
                          width: 150,
                          render: (_: any, __: any, index: number) => (
                            <RenderSelect
                              formItemProps={{
                                name: [index, 'unit'],
                                rules: [{ required: true, message: 'Please select unit.' }]
                              }}
                              inputProps={{
                                placeholder: 'Select',
                                options: MEASUREMENT_UNITS,
                                disabled:
                                  shouldDisable(index) || isPending || isLoading || isEditPending,
                                onChange: () => {
                                  form.validateFields([['chillers', index, 'tons']]); // 👈 revalidate altitude
                                }
                              }}
                            />
                          )
                        },
                        {
                          title: (
                            <>
                              <span className="requiredStar">*</span>
                              Make
                            </>
                          ),
                          key: 'make',
                          width: 170,
                          render: (_: any, __: any, index: number) => (
                            <RenderSelect
                              formItemProps={{
                                name: [index, 'make'],
                                rules: [{ required: true, message: 'Please select make.' }]
                              }}
                              inputProps={{
                                placeholder: 'Select',
                                options: MAKE,
                                disabled:
                                  shouldDisable(index) || isPending || isLoading || isEditPending
                              }}
                            />
                          )
                        },
                        {
                          title: (
                            <>
                              <span className="requiredStar">*</span>
                              Model
                            </>
                          ),
                          key: 'model',
                          width: 140,
                          render: (_: any, __: any, index: number) => (
                            <RenderTextInput
                              required={false}
                              formItemProps={{
                                name: [index, 'model'],
                                validateFirst: true,
                                rules: [
                                  {
                                    required: true,
                                    message: 'Please enter model name.'
                                  },
                                  {
                                    pattern: PATTERNS.BLANK_SPACE,
                                    message: 'Please enter valid model name.'
                                  }
                                ]
                              }}
                              inputProps={{
                                placeholder: 'Model',
                                disabled: shouldDisable(index)
                              }}
                            />
                          )
                        },
                        {
                          title: (
                            <>
                              <span className="requiredStar">*</span>
                              Year
                            </>
                          ),
                          key: 'year',
                          width: 100,
                          render: (_: any, __: any, index: number) => (
                            <RenderSelect
                              formItemProps={{
                                name: [index, 'manufacturedYear'],
                                rules: [{ required: true, message: 'Please select year.' }]
                              }}
                              inputProps={{
                                placeholder: 'Select',
                                options: yearOptions,
                                disabled:
                                  shouldDisable(index) || isPending || isLoading || isEditPending
                              }}
                            />
                          )
                        },
                        {
                          title: (
                            <>
                              <span className="requiredStar">*</span>
                              Ref. Type
                            </>
                          ),
                          key: 'refType',
                          width: 120,
                          render: (_: any, __: any, index: number) => (
                            <RenderSelect
                              formItemProps={{
                                name: [index, 'refrigType'],
                                rules: [{ required: true, message: 'Please select ref. type.' }]
                              }}
                              inputProps={{
                                placeholder: 'Select',
                                options: refrigerantOptions,
                                disabled:
                                  shouldDisable(index) || isPending || isLoading || isEditPending
                              }}
                            />
                          )
                        },
                        {
                          title: (
                            <>
                              <span className="requiredStar">*</span>
                              Tons or kWR
                            </>
                          ),
                          key: 'tons',
                          width: 100,
                          render: (_: any, __: any, index: number) => (
                            <Form.Item
                              noStyle
                              shouldUpdate={(prev, curr) =>
                                prev?.chillers?.[index]?.unit !== curr?.chillers?.[index]?.unit
                              }
                            >
                              {() => {
                                const unit = form.getFieldValue(['chillers', index, 'unit']);
                                const isMetric = unit === MEASUREMENT_UNITS[1]?.value;
                                const isEnglish = unit === MEASUREMENT_UNITS[0]?.value;
                                const isUnitSelected = isMetric || isEnglish;

                                return (
                                  <RenderTextInput
                                    required={false}
                                    formItemProps={{
                                      name: [index, 'tons'],
                                      rules:
                                        isUnitSelected && !shouldDisable(index)
                                          ? [
                                              {
                                                required: true,
                                                message: `Please enter ${isMetric ? 'kWR' : 'Tons'}.`
                                              },
                                              {
                                                validator: getUnitValidator(
                                                  isEnglish ? 'English' : 'SI Metric'
                                                )
                                              }
                                            ]
                                          : []
                                    }}
                                    inputProps={{
                                      placeholder: isMetric ? 'kWR' : isEnglish ? 'Tons' : '',
                                      maxLength: 10,
                                      type: 'text',
                                      inputMode: 'decimal',
                                      onKeyDown: allowTonsKwr,
                                      disabled: !isUnitSelected || shouldDisable(index)
                                    }}
                                  />
                                );
                              }}
                            </Form.Item>
                          )
                        },
                        {
                          title: (
                            <>
                              <span className="requiredStar">*</span>
                              Serial #
                            </>
                          ),
                          key: 'serialNumber',
                          width: 100,
                          render: (_: any, __: any, index: number) => (
                            <RenderTextInput
                              required={false}
                              formItemProps={{
                                name: [index, 'serialNumber'],
                                rules: [
                                  {
                                    required: true,
                                    message: 'Please enter serial number.'
                                  },
                                  {
                                    pattern: /^\S+$/,
                                    message: 'Please enter valid serial number.'
                                  }
                                ]
                              }}
                              inputProps={{
                                placeholder: 'Serial #',
                                type: 'text', // use text to block "-" and "."
                                disabled: shouldDisable(index)
                              }}
                            />
                          )
                        },
                        {
                          title: (
                            <>
                              <span className="requiredStar">*</span>
                              Energy $
                            </>
                          ),
                          key: 'energyCost',
                          width: 110,
                          render: (_: any, __: any, index: number) => (
                            <RenderTextInput
                              required={false}
                              formItemProps={{
                                name: [index, 'energyCost'],
                                rules: [
                                  {
                                    validator: validateEnergyCost('energy cost', true)
                                  }
                                ]
                              }}
                              inputProps={{
                                placeholder: '00.00',
                                type: 'text',
                                maxLength: 10,
                                inputMode: 'decimal',
                                onKeyDown: allowEnergyCost,
                                disabled: shouldDisable(index)
                              }}
                            />
                          )
                        },
                        {
                          title: (
                            <>
                              <span className="requiredStar">*</span>
                              Wkly Opt. Hrs.
                              <Tooltip title="Weekly Operating Hours" color="#000ABC">
                                <InfoCircleOutlined style={{ color: '#000ABC' }} />
                              </Tooltip>
                            </>
                          ),
                          key: 'weeklyHours',
                          width: 165,
                          render: (_: any, __: any, index: number) => (
                            <RenderTextInput
                              required={false}
                              formItemProps={{
                                name: [index, 'weeklyHours'],
                                rules: [
                                  {
                                    validator: validateWeeklyHours('weekly operating hours', 1, 168)
                                  }
                                ]
                              }}
                              inputProps={{
                                placeholder: '00',
                                type: 'text',
                                maxLength: 10,
                                inputMode: 'numeric',
                                onKeyDown: allowHoursPerWeek,
                                disabled: shouldDisable(index)
                              }}
                            />
                          )
                        },
                        {
                          title: (
                            <>
                              <span className="requiredStar">*</span>
                              Wks Per Yr.
                              <Tooltip title="Weeks Per Year" color="#000ABC">
                                <InfoCircleOutlined style={{ color: '#000ABC' }} />
                              </Tooltip>
                            </>
                          ),
                          key: 'weeksPerYear',
                          width: 145,
                          render: (_: any, __: any, index: number) => (
                            <RenderTextInput
                              required={false}
                              formItemProps={{
                                name: [index, 'weeksPerYear'],
                                rules: [
                                  {
                                    validator: validateWeeklyHours('weeks per year', 1, 52)
                                  }
                                ]
                              }}
                              inputProps={{
                                placeholder: '00',
                                type: 'text',
                                maxLength: 10,
                                inputMode: 'numeric',
                                onKeyDown: allowHoursPerWeek,
                                disabled: shouldDisable(index)
                              }}
                            />
                          )
                        },
                        {
                          title: (
                            <>
                              <span className="requiredStar">*</span>
                              Avg. Load Pro.
                              <Tooltip title="Average Load Profile" color="#000ABC">
                                <InfoCircleOutlined style={{ color: '#000ABC' }} />
                              </Tooltip>
                            </>
                          ),
                          key: 'avgLoadProfile',
                          width: 165,
                          render: (_: any, __: any, index: number) => (
                            <RenderTextInput
                              required={false}
                              formItemProps={{
                                name: [index, 'avgLoadProfile'],
                                rules: [
                                  {
                                    validator: validateAverageLoad('average load', 10, 100)
                                  }
                                ]
                              }}
                              inputProps={{
                                placeholder: '00.00',
                                maxLength: 10,
                                type: 'text', // use "text" for full control
                                inputMode: 'decimal', // show numeric keypad with decimal on mobile
                                onKeyDown: allowAverageLoad,
                                disabled: shouldDisable(index)
                              }}
                            />
                          )
                        },
                        {
                          title: 'Action',
                          key: 'action',
                          render: (_: any, __: any, index: number) => (
                            <Button
                              type="link"
                              disabled={shouldDisable(index)}
                              danger
                              onClick={() => remove(index)}
                            >
                              Remove
                            </Button>
                          )
                        }
                      ]}
                      dataSource={fields.map((field) => ({ key: field.key }))}
                      pagination={false}
                    />
                  )}

                  <div style={{ marginTop: 16 }}>
                    <Button onClick={() => add()} icon={<PlusOutlined />} className="addChillerBtn">
                      Add Chiller
                    </Button>
                  </div>
                </>
              )}
            </Form.List>
          </ShadowPaper>

          <div className="editButtonWrap extraActionButton">
            <Button
              className="title-cancel-btn"
              onClick={() => navigate(-1)}
              disabled={isPending || isEditPending}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              shape="round"
              className="title-btn"
              loading={isPending || isEditPending}
              disabled={isPending || isEditPending || isLoading}
              htmlType="submit"
              icon={!id && <PlusOutlined />}
            >
              {id ? 'Save' : 'Add / Save'}
            </Button>
          </div>
        </Form>
      </div>
    </Wrapper>
  );
};

export default FacilityAddEditForm;
