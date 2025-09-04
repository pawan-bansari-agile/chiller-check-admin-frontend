import React from 'react';

import { Col, Row } from 'antd';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';
import {
  Actual_Condenser_Water_Pressure_Drop_English,
  Actual_Condenser_Water_Pressure_Drop_SI_Metric,
  Design_Condenser_Water_Pressure_Drop_English,
  Design_Condenser_Water_Pressure_Drop_SI_Metric,
  MEASUREMENT_UNITS
} from '@/shared/constants';
import { allowNegativeDecimalOnly } from '@/shared/utils/functions';

export interface IProps {
  unit?: string;
}

const CondensorForm: React.FC<IProps> = ({ unit }) => {
  const isMetric = unit === MEASUREMENT_UNITS[1]?.value;
  const isEnglish = unit === MEASUREMENT_UNITS[0]?.value;
  const isUnitSelected = isMetric || isEnglish;

  return (
    <div className="chillerAddEfitForm">
      <Row gutter={[20, 25]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={24}>
          <Row gutter={[20, 25]}>
            <Col xs={24} sm={24} md={24} lg={16} xl={8}>
              <RenderTextInput
                label="Design Condenser Water Pressure Drop"
                tooltip="Enter the Condenser differential pressure drop.
                Select the Condenser differential pressure drop unit."
                formItemProps={{
                  name: 'condenserWaterPressureDrop',
                  rules: [
                    {
                      validator(_, value) {
                        if (!value?.trim()) return Promise.resolve();
                        if (value === '-' || value === '.' || value === '-.') {
                          return Promise.reject(
                            new Error('Please enter a valid design condenser water pressure drop.')
                          );
                        }

                        const validNumberRegex = /^-?\d+(\.\d+)?$/;

                        if (!validNumberRegex.test(value)) {
                          return Promise.reject(
                            new Error('Please enter a valid design condenser water pressure drop.')
                          );
                        }

                        const num = Number(value);

                        if (isNaN(num)) {
                          return Promise.reject(
                            new Error('Please enter a valid design condenser water pressure drop.')
                          );
                        }

                        return Promise.resolve();
                      }
                    }
                  ]
                }}
                inputProps={{
                  placeholder: 'Enter Here',
                  type: 'text',
                  maxLength: 10,
                  onKeyDown: allowNegativeDecimalOnly
                }}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <RenderSelect
                label="Design Condenser Water Pressure Drop Unit"
                colClassName="custom-select-col"
                formItemProps={{
                  name: 'condenserWaterPressureDropOption'
                }}
                inputProps={{
                  disabled: !isUnitSelected,
                  placeholder: 'Choose',
                  options:
                    isUnitSelected && isEnglish
                      ? Design_Condenser_Water_Pressure_Drop_English
                      : isUnitSelected && isMetric
                        ? Design_Condenser_Water_Pressure_Drop_SI_Metric
                        : []
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderSelect
            label="Actual Condenser Water Pressure Drop Unit"
            tooltip="Select the Condenser approach pressure drop unit."
            colClassName="custom-select-col"
            required
            formItemProps={{
              name: 'actualCondenserWaterPressureDrop',
              rules: isUnitSelected
                ? [
                    {
                      required: true,
                      message: 'Please select an actual condenser water pressure drop unit.'
                    }
                  ]
                : []
            }}
            inputProps={{
              disabled: !isUnitSelected,
              placeholder: 'Select',
              options:
                isUnitSelected && isEnglish
                  ? Design_Condenser_Water_Pressure_Drop_English
                  : isUnitSelected && isMetric
                    ? Design_Condenser_Water_Pressure_Drop_SI_Metric
                    : []
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderSelect
            label="Condenser Pressure Unit"
            tooltip="Select the Condenser pressure unit."
            colClassName="custom-select-col"
            required
            formItemProps={{
              name: 'condenserPressureUnit',
              rules: isUnitSelected
                ? [
                    {
                      required: true,
                      message: 'Please select the condenser pressure unit.'
                    }
                  ]
                : []
            }}
            inputProps={{
              disabled: !isUnitSelected,
              placeholder: 'Select',
              options:
                isUnitSelected && isEnglish
                  ? Actual_Condenser_Water_Pressure_Drop_English
                  : isUnitSelected && isMetric
                    ? Actual_Condenser_Water_Pressure_Drop_SI_Metric
                    : []
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderTextInput
            label="Design Condenser Approach Temp."
            tooltip="Enter the Condenser Approach - in a chiller is the pressure of the refrigerant inside the condenser as it releases heat and condenses from a vapor to a liquid."
            colClassName="addonAfterClass"
            required={true}
            formItemProps={{
              name: 'designCondenserApproachTemp',
              rules: [
                {
                  required: true,
                  message: 'Please enter design condensor approach temperature.'
                },
                {
                  validator(_, value) {
                    if (!value?.trim()) return Promise.resolve();
                    if (value === '-' || value === '.' || value === '-.') {
                      return Promise.reject(
                        new Error('Please enter a valid design condenser approach temperature.')
                      );
                    }
                    const num = parseFloat(value);
                    const min = 0;
                    const max = isMetric ? 11 : 20;
                    if (isNaN(num)) {
                      return Promise.reject(
                        new Error('Please enter a valid design condenser approach temperature.')
                      );
                    }

                    const decimalRegex = /^-?\d+(\.\d+)?$/; // allows 0, 0.1, 10.25, etc.

                    if (!decimalRegex.test(value)) {
                      return Promise.reject(
                        new Error(`Please enter a valid design condenser approach temperature.`)
                      );
                    }

                    if (isNaN(num) || num < min || num > max) {
                      return Promise.reject(
                        new Error(
                          `Design condenser approach temperature must be between ${min} and ${max} degrees.`
                        )
                      );
                    }

                    return Promise.resolve();
                  }
                }
              ]
            }}
            inputProps={{
              placeholder: 'Design Condenser Approach Temp.',
              addonAfterText: isMetric ? '°C' : '℉',
              onKeyDown: allowNegativeDecimalOnly,
              type: 'text',
              maxLength: 10
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderTextInput
            label="Design Condenser ∆ T"
            tooltip="The temperature difference between the condensing temperature and the entering condenser water temperature under design conditions. This ΔT helps determine heat rejection performance and sizing for cooling towers and condenser water loops."
            required={true}
            formItemProps={{
              name: 'designCondenserT',
              rules: [
                {
                  validator(_, value) {
                    if (!value || !value?.trim()) {
                      return Promise.reject(new Error('Please enter design condenser ∆ T.'));
                    }
                    if (value === '-' || value === '.' || value === '-.') {
                      return Promise.reject(
                        new Error('Please enter a valid design condenser ∆ T.')
                      );
                    }

                    const validNumberRegex = /^-?\d+(\.\d+)?$/;

                    if (!validNumberRegex.test(value)) {
                      return Promise.reject(
                        new Error('Please enter a valid design condenser ∆ T.')
                      );
                    }

                    const num = Number(value);

                    if (isNaN(num)) {
                      return Promise.reject(
                        new Error('Please enter a valid design condenser ∆ T.')
                      );
                    }

                    return Promise.resolve();
                  }
                }
              ]
            }}
            inputProps={{
              placeholder: 'Design Condenser ∆ T',
              onKeyDown: allowNegativeDecimalOnly,
              type: 'text',
              maxLength: 10
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderTextInput
            label="Design Condenser Flow"
            required={true}
            tooltip="The specified rate of water flow required through the condenser to efficiently reject heat under design conditions."
            formItemProps={{
              name: 'designCondenserFlow',
              rules: [
                {
                  validator(_, value) {
                    if (!value || !value?.trim()) {
                      return Promise.reject(new Error('Please enter design condenser flow.'));
                    }
                    if (value === '-' || value === '.' || value === '-.') {
                      return Promise.reject(
                        new Error('Please enter a valid design condenser flow.')
                      );
                    }

                    const validNumberRegex = /^-?\d+(\.\d+)?$/;

                    if (!validNumberRegex.test(value)) {
                      return Promise.reject(
                        new Error('Please enter a valid design condenser flow.')
                      );
                    }

                    const num = Number(value);

                    if (isNaN(num)) {
                      return Promise.reject(
                        new Error('Please enter a valid design condenser flow.')
                      );
                    }

                    return Promise.resolve();
                  }
                }
              ]
            }}
            inputProps={{
              placeholder: 'Design Condenser Flow',
              onKeyDown: allowNegativeDecimalOnly,
              type: 'text',
              maxLength: 10
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CondensorForm;
