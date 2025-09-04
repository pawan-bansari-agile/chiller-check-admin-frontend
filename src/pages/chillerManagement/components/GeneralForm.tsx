import React from 'react';

import { Col, FormInstance, Row } from 'antd';

import { authStore } from '@/store/auth';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';
import { DES_INLET_WATER_TEMP, MEASUREMENT_UNITS, PATTERNS } from '@/shared/constants';
import {
  allowAverageLoad,
  allowHoursPerWeek,
  validateAverageLoad,
  validateWeeklyHours
} from '@/shared/utils/functions';

interface IProps {
  companyOptions: { label: string; value: string }[] | [];
  facilityOptions: { label: string; value: string }[] | [];
  isCompanyLoading: boolean;
  companyName?: string;
  isFacilityLoading: boolean;
  form: FormInstance;
  id?: string;
}

const GeneralForm: React.FC<IProps> = ({
  companyOptions,
  isCompanyLoading,
  companyName,
  facilityOptions,
  isFacilityLoading,
  form,
  id
}) => {
  const { userData } = authStore((state) => state);
  return (
    <div className="chillerAddEfitForm">
      <Row gutter={[20, 25]}>
        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderTextInput
            label="Chiller #"
            required
            formItemProps={{
              name: 'ChillerNumber',
              rules: [
                {
                  validator: (_: any, value: string) => {
                    if (!value || value.trim() === '') {
                      return Promise.reject(new Error(`Please enter chiller number.`));
                    }
                    if (!/^[1-9]\d*$/.test(value)) {
                      return Promise.reject(new Error(`Please enter valid chiller number.`));
                    }
                    return Promise.resolve();
                  }
                }
              ]
            }}
            inputProps={{
              type: 'text',
              maxLength: 10,
              inputMode: 'numeric',
              onKeyDown: allowHoursPerWeek,
              placeholder: 'Chiller #'
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderSelect
            label="Company Name"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'companyId',
              rules: [{ required: true, message: 'Please select company.' }]
            }}
            inputProps={{
              placeholder: 'Select Company',
              options: companyOptions,
              disabled: isCompanyLoading || !!id || !!userData?.companyId,
              onChange: () => {
                const isFacilityTouched = form.isFieldTouched('facilityId');
                form.setFieldValue('facilityId', null);
                if (isFacilityTouched) {
                  form.validateFields(['facilityId']);
                }
              }
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderSelect
            label="Facility"
            colClassName="custom-select-col"
            required
            formItemProps={{
              name: 'facilityId',
              rules: companyName ? [{ required: true, message: 'Please select facility.' }] : []
            }}
            inputProps={{
              placeholder: 'Select Facility',
              options: facilityOptions,
              disabled: !companyName || isFacilityLoading || !!id
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderSelect
            label="Type"
            colClassName="custom-select-col"
            formItemProps={{
              required: true,
              initialValue: 'Electric',
              name: 'type'
            }}
            inputProps={{
              disabled: true,
              placeholder: 'Select Type',
              options: [{ label: 'Electric', value: 'Electric' }]
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderSelect
            label="Unit"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'unit',
              rules: [{ required: true, message: 'Please select unit.' }]
            }}
            inputProps={{
              placeholder: 'Select Unit',
              options: MEASUREMENT_UNITS,
              disabled: !!id,
              onChange: () => {
                const isTonsTouched = form.isFieldTouched('tons/kwr');
                const isEfficiencyTouched = form.isFieldTouched('efficiencyRating');

                if (isTonsTouched) {
                  form.validateFields(['tons/kwr']);
                }
                if (isEfficiencyTouched) {
                  form.validateFields(['efficiencyRating']);
                }
                form.setFieldValue('actualCondenserWaterPressureDrop', null);
                form.validateFields(['actualCondenserWaterPressureDrop']);
                form.setFieldValue('condenserWaterPressureDropOption', null);
                form.validateFields(['condenserWaterPressureDropOption']);
                form.setFieldValue('condenserPressureUnit', null);
                form.validateFields(['condenserPressureUnit']);
                form.setFieldValue('chillWaterPressureDropOption', null);
                form.validateFields(['chillWaterPressureDropOption']);
                form.setFieldValue('actualChillWaterPressureDropUnit', null);
                form.validateFields(['actualChillWaterPressureDropUnit']);
                form.setFieldValue('evaporatorPressureUnit', null);
                form.validateFields(['evaporatorPressureUnit']);
                form.setFieldValue('designCondenserApproachTemp', null);
                form.validateFields(['designCondenserApproachTemp']);
                form.setFieldValue('designEvaporatorApproachTemp', null);
                form.validateFields(['designEvaporatorApproachTemp']);
              }
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderTextInput
            label="Chiller Name/No"
            required
            formItemProps={{
              name: 'chillerNo',
              rules: [
                {
                  required: true,
                  message: 'Please enter chiller name/no.'
                },
                {
                  pattern: PATTERNS.BLANK_SPACE,
                  message: 'Please enter valid chiller name/no.'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Chiller Name'
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderTextInput
            label="Weekly Hours Of Operation"
            colClassName="addonAfterClass"
            required
            tooltip="Enter the hours is the chiller going to operate in a week. Ideally between 1 and 168"
            formItemProps={{
              name: 'weeklyHours',
              rules: [
                {
                  validator: validateWeeklyHours('weekly hours of operation', 1, 168)
                }
              ]
            }}
            inputProps={{
              type: 'text',
              maxLength: 10,
              inputMode: 'numeric',
              onKeyDown: allowHoursPerWeek,
              placeholder: 'Weekly Hours Of Operation',
              addonAfterText: 'Hrs'
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderTextInput
            label="Weeks Per Year"
            required
            tooltip="Enter the number of weeks the chiller is going to operate in a year.  Ideally between 1 and 52."
            formItemProps={{
              name: 'weeksPerYear',
              rules: [
                {
                  validator: validateWeeklyHours('weeks per year', 1, 52)
                }
              ]
            }}
            inputProps={{
              type: 'text',
              maxLength: 10,
              inputMode: 'numeric',
              onKeyDown: allowHoursPerWeek,
              placeholder: 'Weeks Per Year'
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderTextInput
            label="Avg. Load Profile"
            colClassName="addonAfterClass"
            required
            tooltip="An average load profile in a chiller represents the typical cooling demand or load on the chiller over a specific time period, used to assess performance and efficiency. Ideally within 10% to 100%."
            formItemProps={{
              name: 'avgLoadProfile',
              rules: [
                {
                  validator: validateAverageLoad('average load profile', 10, 100)
                }
              ]
            }}
            inputProps={{
              type: 'text', // use "text" for full control
              maxLength: 10,
              inputMode: 'decimal', // show numeric keypad with decimal on mobile
              onKeyDown: allowAverageLoad,
              placeholder: 'Avg. Load Profile',
              addonAfterText: '%'
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderSelect
            label="Design Inlet Water Temp."
            tooltip="Enter the designed inlet water temperature of the chiller."
            colClassName="custom-select-col"
            formItemProps={{
              name: 'designInletWaterTemp',
              rules: [{ required: true, message: 'Please select design inlet water temperature.' }]
            }}
            inputProps={{
              placeholder: 'Design Inlet Water Temp.',
              options: DES_INLET_WATER_TEMP
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default GeneralForm;
