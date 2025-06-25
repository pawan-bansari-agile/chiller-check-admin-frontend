import React, { useEffect, useRef } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row } from 'antd';

import { companyHooks, companyQueryKeys } from '@/services/company';

import {
  RenderGoogleAutocompleteInput,
  RenderSelect,
  RenderTextInput
} from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import { ALTITUDE_OPTIONS, PATTERNS, STATES, TIMEZONE_OPTIONS } from '@/shared/constants';
import {
  allowNegativeDecimalOnly,
  allowOnlyNumbers,
  capitalizeFirstLetterWhileTyping,
  showToaster,
  uniqueFieldValidator
} from '@/shared/utils/functions';

interface CompanyFacility {
  facilityName: string;
  address: string;
  facilityCity: string;
  facilityState: string;
  facilityAddress2: string;
  facilityCountry: string;
  facilityZipcode: string;
  timeZone: string;
  altitude: number;
  altitudeUnit: string;
}

interface IFormValues {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  website: string;
  facilities: CompanyFacility[] | [] | undefined;
}

const CompanyAddEditForm: React.FC = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: addCompanyAction, isPending } = companyHooks.useAddCompany();
  const { mutate: editCompanyAction, isPending: isEditPending } = companyHooks.useEditCompany();
  const { data, isLoading } = companyHooks.CompanyView(id ?? '');

  const initialFacilityLength = useRef(0);

  useEffect(() => {
    if (!data) return;

    const mappedFacilities =
      data?.facilities?.map((facility) => ({
        facilityName: facility?.name,
        address: facility?.address1,
        facilityAddress2: facility?.address2,
        facilityCity: facility?.city,
        facilityState: facility?.state,
        facilityZipcode: facility?.zipcode,
        facilityCountry: 'USA',
        altitude: facility?.altitude,
        altitudeUnit: facility?.altitudeUnit,
        timeZone: facility?.timezone
      })) || [];

    initialFacilityLength.current = mappedFacilities.length;

    form.setFieldsValue({
      name: data?.name,
      address1: data?.address1,
      address2: data?.address2,
      city: data?.city,
      state: data?.state,
      zipcode: data?.zipcode,
      website: data?.website,
      facilities: mappedFacilities
    });
  }, [data, form]);

  const shouldDisable = (index: number) => index < initialFacilityLength.current;

  const handleCapitalizedChange =
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const capitalized = capitalizeFirstLetterWhileTyping(e.target.value);
      form.setFieldsValue({ [fieldName]: capitalized });
    };

  const handleIndexedCapitalizedChange =
    (index: number, field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const capitalized = capitalizeFirstLetterWhileTyping(e.target.value);
      const currentValues = form.getFieldValue('facilities') || [];

      // Update only the specific index
      const updatedFacilities = [...currentValues];
      updatedFacilities[index] = {
        ...updatedFacilities[index],
        [field]: capitalized
      };

      form.setFieldsValue({ facilities: updatedFacilities });
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

    form.setFieldsValue({ address1: place?.name, city, state, zipcode });

    clearFieldErrors(
      ['city', 'state', 'zipcode', 'address1']
        .filter((field) => !!form.getFieldValue(field))
        .map((field) => ({ name: field, errors: [] }))
    );
  };

  const onPlaceSelectedIndexWise = (place: any, index: number) => {
    const getComponent = (type: string) =>
      place?.address_components?.find((comp: any) => comp.types.includes(type))?.long_name;

    form.setFieldsValue({
      facilities: {
        [index]: {
          address: place?.name,
          facilityCity: getComponent('locality'),
          facilityState: getComponent('administrative_area_level_1'),
          facilityZipcode: getComponent('postal_code')
        }
      }
    });

    clearFieldErrors(
      ['facilityCity', 'facilityState', 'facilityZipcode', 'address']
        .filter((field) => !!form.getFieldValue(['facilities', index, field]))
        .map((field) => ({ name: ['facilities', index, field], errors: [] }))
    );
  };

  const buildFacilityPayload = (facilities: CompanyFacility[] | []) => {
    return facilities?.length
      ? facilities.slice(id ? initialFacilityLength.current : 0).map((facility) => ({
          name: facility?.facilityName,
          address1: facility?.address,
          address2: facility?.facilityAddress2,
          city: facility?.facilityCity,
          state: facility?.facilityState,
          country: facility?.facilityCountry,
          zipcode: facility?.facilityZipcode,
          timezone: facility?.timeZone,
          altitude: Number(facility?.altitude),
          altitudeUnit: facility?.altitudeUnit
        }))
      : [];
  };

  const handleSuccess = (message: string) => {
    showToaster('success', message);
    queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
    navigate(-1);
  };

  const handleError = (err: any) => {
    const errorMsg = err?.message || err?.message?.[0] || 'Something went wrong';
    showToaster('error', errorMsg);
  };

  const onSubmit = (values: IFormValues) => {
    const payload = {
      ...values,
      facilities: buildFacilityPayload(values?.facilities || [])
    };

    if (id) {
      editCompanyAction(
        { ...payload, _id: id },
        {
          onSuccess: (res) => handleSuccess(res?.message || ''),
          onError: handleError
        }
      );
    } else {
      addCompanyAction(payload, {
        onSuccess: (res) => handleSuccess(res?.message || ''),
        onError: handleError
      });
    }
  };

  return (
    <div className="shadowPaperWrap">
      {isLoading && <Loader />}
      <Form
        className="add-company-form"
        form={form}
        onFinish={onSubmit}
        disabled={isPending || isLoading || isEditPending}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      >
        <HeaderToolbar
          title={id ? 'Edit Company' : 'Add Company'}
          backBtn={true}
          button={
            <div className="editButtonWrap">
              {id && (
                <Button
                  className="title-cancel-btn"
                  onClick={() => navigate(-1)}
                  disabled={isPending || isEditPending}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="primary"
                shape="round"
                className="title-btn"
                loading={isPending || isEditPending}
                disabled={isPending || isEditPending || isLoading}
                htmlType="submit"
                icon={!id && <PlusOutlined />}
              >
                {id ? 'Save' : 'Add'}
              </Button>
            </div>
          }
        />
        <div className="shadowWrap">
          <ShadowPaper>
            <div className="company-details-header">
              <h2>Company Details</h2>
            </div>
            <Row gutter={[20, 20]} className="companyAddEditMainForm">
              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderTextInput
                  label="Company Name"
                  required
                  formItemProps={{
                    name: 'name',
                    rules: [
                      {
                        required: true,
                        message: 'Please enter company name.'
                      },
                      {
                        pattern: PATTERNS.BLANK_SPACE,
                        message: 'Please enter valid company name.'
                      }
                    ]
                  }}
                  inputProps={{
                    placeholder: 'Enter Company Name',
                    onChange: handleCapitalizedChange('name')
                  }}
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={8}>
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
                    disabled: isPending || isLoading || isEditPending,
                    placeholder: 'Address Line 1',
                    onChange: handleCapitalizedChange('address1')
                  }}
                  googleAutocompleteProps={{
                    onPlaceSelected,
                    options: {
                      fields: ['ALL'],
                      types: ['geocode'], // Restrict to geocode type (addresses).
                      componentRestrictions: { country: 'us' } // Restrict to USA.
                    }
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderTextInput
                  label="Address Line 2"
                  required
                  formItemProps={{
                    name: 'address2',
                    rules: [
                      {
                        required: true,
                        message: 'Please enter address line2.'
                      },
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

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderTextInput
                  label="City"
                  required
                  formItemProps={{
                    name: 'city',
                    rules: [
                      {
                        required: true,
                        message: 'Please enter a city.'
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

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderSelect
                  label="State"
                  colClassName="custom-select-col"
                  formItemProps={{
                    name: 'state',
                    rules: [{ required: true, message: 'Please select state.' }]
                  }}
                  inputProps={{
                    placeholder: 'Select State',
                    options: STATES
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
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
                        pattern: PATTERNS.ZIP_CODE,
                        message: 'Please enter a valid 5-digit zipcode.'
                      }
                    ]
                  }}
                  inputProps={{
                    placeholder: 'Enter Zipcode',
                    maxLength: 5,
                    inputMode: 'numeric', // shows numeric keyboard on mobile
                    pattern: '[0-9]*', // prevents character input on some browsers
                    onKeyDown: allowOnlyNumbers
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderTextInput
                  label="Country"
                  required
                  formItemProps={{
                    initialValue: 'USA',
                    name: 'country',
                    rules: [
                      {
                        required: true,
                        message: 'Please enter country'
                      }
                    ]
                  }}
                  inputProps={{
                    disabled: true,
                    placeholder: 'Enter Country'
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderTextInput
                  label="Corporate Website"
                  required
                  formItemProps={{
                    name: 'website',
                    rules: [
                      {
                        required: true,
                        message: 'Please enter corporate website.'
                      },
                      {
                        type: 'url',
                        message: 'Please enter valid corporate website.'
                      }
                    ]
                  }}
                  inputProps={{
                    placeholder: 'Add Corporate Website'
                  }}
                />
              </Col>
            </Row>
          </ShadowPaper>
          <ShadowPaper>
            <div className="company-details-header">
              <h2>Facilities</h2>
            </div>
            <Form.List name="facilities">
              {(fields, { add, remove }) => (
                <>
                  {fields.length > 0 && (
                    <CommonTable
                      scroll={{ x: 2000 }}
                      className="companyFacilityTable"
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
                              Facility Name
                            </>
                          ),
                          width: 250,
                          key: 'facilityName',
                          render: (_: any, __: any, index: number) => (
                            <RenderTextInput
                              required={false}
                              formItemProps={{
                                name: [index, 'facilityName'],
                                validateFirst: true,
                                rules: shouldDisable(index)
                                  ? []
                                  : [
                                      {
                                        required: true,
                                        message: 'Please enter facility name.'
                                      },
                                      {
                                        pattern: PATTERNS.BLANK_SPACE,
                                        message: 'Please enter valid facility name.'
                                      },
                                      {
                                        validator: uniqueFieldValidator(
                                          form,
                                          'facilities',
                                          'facilityName',
                                          'Facility name must be unique.'
                                        )
                                      }
                                    ]
                              }}
                              inputProps={{
                                disabled: shouldDisable(index),
                                placeholder: 'Facility',
                                onChange: handleIndexedCapitalizedChange(index, 'facilityName')
                              }}
                            />
                          )
                        },
                        {
                          title: (
                            <>
                              <span className="requiredStar">*</span>
                              Address
                            </>
                          ),
                          key: 'address',
                          width: 250,
                          render: (_: any, __: any, index: number) => (
                            <RenderGoogleAutocompleteInput
                              formItemProps={{
                                name: [index, 'address'],
                                required: true,
                                rules: [
                                  {
                                    required: true,
                                    message: 'Please enter address.'
                                  },
                                  {
                                    pattern: PATTERNS.BLANK_SPACE,
                                    message: 'Please enter valid address.'
                                  }
                                ]
                              }}
                              inputProps={{
                                placeholder: 'Address',
                                disabled:
                                  isPending || isLoading || shouldDisable(index) || isEditPending,
                                onChange: handleIndexedCapitalizedChange(index, 'address')
                              }}
                              googleAutocompleteProps={{
                                onPlaceSelected: (place: any) =>
                                  onPlaceSelectedIndexWise(place, index),
                                options: {
                                  fields: ['ALL'],
                                  types: ['geocode'], // Restrict to geocode type (addresses).
                                  componentRestrictions: { country: 'us' } // Restrict to USA.
                                }
                              }}
                            />
                          )
                        },
                        {
                          title: 'Address Line 2',
                          key: 'facilityAddress2',
                          width: 300,
                          render: (_: any, __: any, index: number) => (
                            <RenderTextInput
                              required={false}
                              formItemProps={{
                                name: [index, 'facilityAddress2'],
                                rules: [
                                  {
                                    required: true,
                                    message: 'Please enter address line2.'
                                  },
                                  {
                                    pattern: PATTERNS.BLANK_SPACE,
                                    message: 'Please enter valid address line2.'
                                  }
                                ]
                              }}
                              inputProps={{
                                placeholder: 'Address Line 2',
                                disabled: shouldDisable(index),
                                onChange: handleIndexedCapitalizedChange(index, 'facilityAddress2')
                              }}
                            />
                          )
                        },
                        {
                          title: 'City',
                          key: 'city',
                          width: 250,
                          render: (_: any, __: any, index: number) => (
                            <RenderTextInput
                              required={false}
                              formItemProps={{
                                name: [index, 'facilityCity'],
                                rules: [
                                  {
                                    required: true,
                                    message: 'Please enter a city.'
                                  },
                                  {
                                    pattern: PATTERNS.BLANK_SPACE,
                                    message: 'Please enter valid city.'
                                  }
                                ]
                              }}
                              inputProps={{
                                placeholder: 'City',
                                disabled: shouldDisable(index),
                                onChange: handleIndexedCapitalizedChange(index, 'facilityCity')
                              }}
                            />
                          )
                        },
                        {
                          title: 'State',
                          key: 'state',
                          width: 200,
                          render: (_: any, __: any, index: number) => (
                            <RenderSelect
                              formItemProps={{
                                name: [index, 'facilityState'],
                                rules: [{ required: true, message: 'Please select state.' }]
                              }}
                              inputProps={{
                                disabled: shouldDisable(index),
                                placeholder: 'State',
                                options: STATES
                              }}
                            />
                          )
                        },
                        {
                          title: 'Country',
                          key: 'country',
                          width: 200,
                          render: (_: any, __: any, index: number) => (
                            <RenderTextInput
                              required={false}
                              formItemProps={{
                                initialValue: 'USA',
                                name: [index, 'facilityCountry'],
                                rules: [
                                  {
                                    required: true,
                                    message: 'Please enter country'
                                  }
                                ]
                              }}
                              inputProps={{
                                disabled: true,
                                placeholder: 'Enter Country'
                              }}
                            />
                          )
                        },
                        {
                          title: 'Zip Code',
                          key: 'zipCode',
                          width: 250,
                          render: (_: any, __: any, index: number) => (
                            <RenderTextInput
                              required={false}
                              formItemProps={{
                                name: [index, 'facilityZipcode'],
                                rules: [
                                  {
                                    required: true,
                                    message: 'Please enter zipcode.'
                                  },
                                  {
                                    pattern: PATTERNS.ZIP_CODE,
                                    message: 'Please enter a valid 5-digit zipcode.'
                                  }
                                ]
                              }}
                              inputProps={{
                                disabled: shouldDisable(index),
                                placeholder: 'Zipcode',
                                maxLength: 5,
                                inputMode: 'numeric', // shows numeric keyboard on mobile
                                pattern: '[0-9]*', // prevents character input on some browsers
                                onKeyDown: allowOnlyNumbers
                              }}
                            />
                          )
                        },
                        {
                          title: 'Altitude',
                          key: 'altitude',
                          width: 300,
                          render: (_: any, __: any, index: number) => (
                            <div style={{ display: 'flex', gap: 8, width: '300px' }}>
                              <RenderTextInput
                                required={false}
                                formItemProps={{
                                  name: [index, 'altitude'],
                                  validateFirst: true,
                                  rules: [
                                    {
                                      required: true,
                                      message: 'Please enter altitude.'
                                    },
                                    {
                                      validator(_, value) {
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

                                        return Promise.resolve();
                                      }
                                    }
                                  ]
                                }}
                                inputProps={{
                                  disabled: shouldDisable(index),
                                  placeholder: 'Altitude',
                                  type: 'text',
                                  onKeyDown: allowNegativeDecimalOnly
                                }}
                              />
                              <RenderSelect
                                formItemProps={{
                                  name: [index, 'altitudeUnit'],
                                  className: 'altitudeUnit',
                                  rules: [{ required: true, message: 'Please select unit.' }]
                                }}
                                inputProps={{
                                  disabled: shouldDisable(index),
                                  placeholder: 'Unit',
                                  options: ALTITUDE_OPTIONS
                                }}
                              />
                            </div>
                          )
                        },
                        {
                          title: (
                            <>
                              <span className="requiredStar">*</span>
                              TimeZone
                            </>
                          ),
                          key: 'timeZone',
                          width: 200,
                          render: (_: any, __: any, index: number) => (
                            <RenderSelect
                              formItemProps={{
                                name: [index, 'timeZone'],
                                rules: [{ required: true, message: 'Please select timezone.' }]
                              }}
                              inputProps={{
                                disabled: shouldDisable(index),
                                placeholder: 'Time Zone',
                                options: TIMEZONE_OPTIONS
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
                              danger
                              onClick={() => remove(index)}
                              disabled={shouldDisable(index)}
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
                    <Button
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      className="addFacilityBtn"
                    >
                      Add Facility
                    </Button>
                  </div>
                </>
              )}
            </Form.List>
          </ShadowPaper>
        </div>
      </Form>
    </div>
  );
};

export default CompanyAddEditForm;
