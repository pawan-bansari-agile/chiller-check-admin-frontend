import React from 'react';

import { Col, Form, Row, Switch } from 'antd';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';
import {
  Actual_Condenser_Water_Pressure_Drop_English,
  Actual_Condenser_Water_Pressure_Drop_SI_Metric,
  Design_Condenser_Water_Pressure_Drop_English,
  Design_Condenser_Water_Pressure_Drop_SI_Metric,
  MEASUREMENT_UNITS
} from '@/shared/constants';
import { allowNegativeDecimalOnly } from '@/shared/utils/functions';

interface IProps {
  unit?: string;
}
const EvaporatorForm: React.FC<IProps> = ({ unit }) => {
  const isMetric = unit === MEASUREMENT_UNITS[1]?.value;
  const isEnglish = unit === MEASUREMENT_UNITS[0]?.value;
  const isUnitSelected = isMetric || isEnglish;
  return (
    <div className="chillerAddEfitForm">
      <Row gutter={[20, 25]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Row gutter={[5, 5]} className="doubleInputRow">
            <Col xs={24} sm={24} md={24} lg={16} xl={16}>
              <RenderTextInput
                label="Design Chill Water Pressure Drop"
                tooltip="Enter Evaporator differential pressure drop.
                Select the Evaporator differential pressure drop unit."
                formItemProps={{
                  name: 'chillWaterPressureDrop',
                  rules: [
                    {
                      validator(_, value) {
                        if (!value?.trim()) return Promise.resolve();
                        if (value === '-' || value === '.' || value === '-.') {
                          return Promise.reject(
                            new Error('Please enter a valid design chill water pressure drop.')
                          );
                        }

                        const validNumberRegex = /^-?\d+(\.\d+)?$/;

                        if (!validNumberRegex.test(value)) {
                          return Promise.reject(
                            new Error('Please enter a valid design chill water pressure drop.')
                          );
                        }

                        const num = Number(value);

                        if (isNaN(num)) {
                          return Promise.reject(
                            new Error('Please enter a valid design chill water pressure drop.')
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
                  onKeyDown: allowNegativeDecimalOnly,
                  maxLength: 10
                }}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <RenderSelect
                colClassName="custom-select-col"
                formItemProps={{
                  name: 'chillWaterPressureDropOption'
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
            label="Actual Chill Water Pressure Drop Unit"
            tooltip="Enter Evaporator Approach Pressure Drop Unit."
            colClassName="custom-select-col"
            required
            formItemProps={{
              name: 'actualChillWaterPressureDropUnit',
              rules: isUnitSelected
                ? [
                    {
                      required: true,
                      message: 'Please select the actual chill water pressure drop.'
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
            tooltip="Enter Evaporator pressure unit."
            label="Evaporator Pressure Unit"
            colClassName="custom-select-col"
            required
            formItemProps={{
              name: 'evaporatorPressureUnit',
              rules: isUnitSelected
                ? [
                    {
                      required: true,
                      message: 'Please select the evaporator pressure unit.'
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
          <div className="switchLabelWrap">
            <label className="switchLabel">
              <i className="esteriskSign">*</i>Enter a Saturated Refrig. Temp.?
            </label>

            <Form.Item
              name="saturatedRefrigerantTemp"
              initialValue={false} // false = "No", true = "Yes"
            >
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderTextInput
            label="Design Evaporator Approach Temp."
            tooltip="Enter the evaporator approach."
            required={false}
            colClassName="addonAfterClass"
            formItemProps={{
              name: 'designEvaporatorApproachTemp',
              rules: [
                {
                  validator(_, value) {
                    if (!value?.trim()) return Promise.resolve();
                    if (value === '-' || value === '.' || value === '-.') {
                      return Promise.reject(
                        new Error('Please enter a valid design evaporator approach temperature.')
                      );
                    }

                    const num = parseFloat(value);
                    const min = 0;
                    const max = isMetric ? 11 : 20;
                    if (isNaN(num)) {
                      return Promise.reject(
                        new Error('Please enter a valid design evaporator approach temperature.')
                      );
                    }

                    const decimalRegex = /^-?\d+(\.\d+)?$/; // allows 0, 0.1, 10.25, etc.

                    if (!decimalRegex.test(value)) {
                      return Promise.reject(
                        new Error(`Please enter a valid design evaporator approach temperature.`)
                      );
                    }

                    if (isNaN(num) || num < min || num > max) {
                      return Promise.reject(
                        new Error(
                          `Design evaporator approach temperature must be between ${min} and ${max} degrees.`
                        )
                      );
                    }

                    return Promise.resolve();
                  }
                }
              ]
            }}
            inputProps={{
              placeholder: 'Design Evaporator Approach Temp.',
              addonAfterText: isMetric ? '°C' : '℉',
              onKeyDown: allowNegativeDecimalOnly,
              type: 'text',
              maxLength: 10
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderTextInput
            label="Evaporator Design Outlet Water Temp."
            tooltip="Enter the evaporator DOW temperature."
            required
            colClassName="addonAfterClass"
            formItemProps={{
              name: 'evaporatorDesignOutletWaterTemp',
              rules: [
                {
                  required: true,
                  message: 'Please enter evaporator design outlet water temperature.'
                },
                {
                  validator(_, value) {
                    if (!value?.trim()) return Promise.resolve();
                    if (value === '-' || value === '.' || value === '-.') {
                      return Promise.reject(
                        new Error(
                          'Please enter a valid evaporator design outlet water temperature.'
                        )
                      );
                    }

                    const validNumberRegex = /^-?\d+(\.\d+)?$/;

                    if (!validNumberRegex.test(value)) {
                      return Promise.reject(
                        new Error(
                          'Please enter a valid evaporator design outlet water temperature.'
                        )
                      );
                    }

                    const num = Number(value);

                    if (isNaN(num)) {
                      return Promise.reject(
                        new Error(
                          'Please enter a valid evaporator design outlet water temperature.'
                        )
                      );
                    }

                    return Promise.resolve();
                  }
                }
              ]
            }}
            inputProps={{
              placeholder: 'Evaporator Design Outlet Water Temp.',
              addonAfterText: isMetric ? '°C' : '℉',
              onKeyDown: allowNegativeDecimalOnly,
              type: 'text',
              maxLength: 10
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderTextInput
            label="Evaporator Design ∆ T"
            tooltip="The temperature difference between the chilled water entering and leaving the evaporator under design conditions."
            required={true}
            colClassName="addonAfterClass"
            formItemProps={{
              name: 'evaporatorDesignT',
              rules: [
                {
                  validator(_, value) {
                    if (!value || !value?.trim()) {
                      return Promise.reject(new Error('Please enter evaporator design ∆ T.'));
                    }
                    if (value === '-' || value === '.' || value === '-.') {
                      return Promise.reject(
                        new Error('Please enter a valid evaporator design ∆ T.')
                      );
                    }

                    const validNumberRegex = /^-?\d+(\.\d+)?$/;

                    if (!validNumberRegex.test(value)) {
                      return Promise.reject(
                        new Error('Please enter a valid evaporator design ∆ T.')
                      );
                    }

                    const num = Number(value);

                    if (isNaN(num)) {
                      return Promise.reject(
                        new Error('Please enter a valid evaporator design ∆ T.')
                      );
                    }

                    return Promise.resolve();
                  }
                }
              ]
            }}
            inputProps={{
              placeholder: 'Evaporator Design ∆ T',
              addonAfterText: isMetric ? '°C' : '℉',
              onKeyDown: allowNegativeDecimalOnly,
              type: 'text',
              maxLength: 10
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderTextInput
            label="Evaporator Design Flow"
            required={true}
            tooltip="The specified chilled water flow rate needed to absorb the desired cooling load under design conditions."
            formItemProps={{
              name: 'designEvaporatorFlow',
              rules: [
                {
                  validator(_, value) {
                    if (!value || !value?.trim()) {
                      return Promise.reject(new Error('Please enter evaporator design flow.'));
                    }
                    if (value === '-' || value === '.' || value === '-.') {
                      return Promise.reject(
                        new Error('Please enter a valid evaporator design flow.')
                      );
                    }

                    const validNumberRegex = /^-?\d+(\.\d+)?$/;

                    if (!validNumberRegex.test(value)) {
                      return Promise.reject(
                        new Error('Please enter a valid evaporator design flow.')
                      );
                    }

                    const num = Number(value);

                    if (isNaN(num)) {
                      return Promise.reject(
                        new Error('Please enter a valid evaporator design flow.')
                      );
                    }

                    return Promise.resolve();
                  }
                }
              ]
            }}
            inputProps={{
              placeholder: 'Evaporator Design Flow',
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

export default EvaporatorForm;
