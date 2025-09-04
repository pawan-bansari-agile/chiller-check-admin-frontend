import React from 'react';

import { Col, Row } from 'antd';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';
import {
  MAKE,
  MEASUREMENT_UNITS,
  PATTERNS,
  refrigerantOptions,
  yearOptions
} from '@/shared/constants';
import {
  allowAverageLoad,
  allowEnergyCost,
  allowNegativeDecimalOnly,
  allowTonsKwr,
  getUnitValidator,
  getUnitValidatorForEfficiency,
  validateEnergyCost
} from '@/shared/utils/functions';

interface IProps {
  unit?: string;
}

const NamePlateForm: React.FC<IProps> = ({ unit }) => {
  const isMetric = unit === MEASUREMENT_UNITS[1]?.value;
  const isEnglish = unit === MEASUREMENT_UNITS[0]?.value;
  const isUnitSelected = isMetric || isEnglish;

  return (
    <div className="chillerAddEfitForm">
      <Row gutter={[20, 25]}>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderSelect
            label="Make"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'make',
              rules: [{ required: true, message: 'Please select make.' }]
            }}
            inputProps={{
              placeholder: 'Make',
              options: MAKE
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderTextInput
            label="Model"
            required
            tooltip="Enter the model of the chiller."
            formItemProps={{
              name: 'model',
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
              placeholder: 'Model'
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderTextInput
            label="Serial No."
            required
            tooltip="Enter chiller's unique serial number."
            formItemProps={{
              name: 'serialNo',
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
              placeholder: 'Serial No.'
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderSelect
            label="Year Manufactured"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'yearManufactured',
              rules: [{ required: true, message: 'Please select manufactured year.' }]
            }}
            inputProps={{
              placeholder: 'Year Manufactured',
              options: yearOptions
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderSelect
            label="Refrigerant Type"
            tooltip="Select the refrigerant Id of the chiller. It would let us know if its a high or low pressure chiller."
            colClassName="custom-select-col"
            formItemProps={{
              name: 'refrigerantType',
              rules: [{ required: true, message: 'Please select refrigerant type.' }]
            }}
            inputProps={{
              placeholder: 'Refrigerant Type',
              options: refrigerantOptions
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderTextInput
            label="Tons or kWR"
            required
            tooltip="Specify the chiller's capacity for the given unit."
            formItemProps={{
              name: 'tons/kwr',
              rules: isUnitSelected
                ? [
                    {
                      required: true,
                      message: `Please enter ${isMetric ? 'kWR' : 'tons'}.`
                    },
                    {
                      validator: getUnitValidator(isEnglish ? 'English' : 'SI Metric')
                    }
                  ]
                : []
            }}
            inputProps={{
              placeholder: 'Tons or kWR',
              type: 'text',
              maxLength: 10,
              inputMode: 'decimal',
              onKeyDown: allowTonsKwr,
              disabled: !isUnitSelected
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderTextInput
            label="Efficiency Rating"
            colClassName="addonAfterClass"
            required={true}
            tooltip="kW/ton - Value Must be between 0.3 and 3,
COP - Value must be between 3 and 12"
            formItemProps={{
              name: 'efficiencyRating',
              rules: isUnitSelected
                ? [
                    {
                      required: true,
                      message: `Please enter efficiency rating.`
                    },
                    {
                      validator: getUnitValidatorForEfficiency(isEnglish ? 'English' : 'SI Metric')
                    }
                  ]
                : []
            }}
            inputProps={{
              disabled: !isUnitSelected,
              placeholder: 'Efficiency Rating',
              addonAfterText: unit && unit === MEASUREMENT_UNITS?.[1]?.value ? 'COP' : 'kW/ton',
              type: 'text', // use "text" for full control
              inputMode: 'decimal', // show numeric keypad with decimal on mobile
              onKeyDown: allowAverageLoad,
              maxLength: 10
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderTextInput
            label="Energy Cost $ (kW. hr.)"
            required
            colClassName="addonAfterClass"
            tooltip="Enter the energy cost in USD for (kW/hr)."
            formItemProps={{
              name: 'energyCost',
              rules: [
                {
                  validator: validateEnergyCost('energy cost', true)
                }
              ]
            }}
            inputProps={{
              placeholder: 'Energy Cost $',
              addonAfterText: 'USD',
              maxLength: 10,
              type: 'text',
              inputMode: 'decimal',
              onKeyDown: allowEnergyCost
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderTextInput
            label="CO2e Emission Factor"
            required
            colClassName="addonAfterClass"
            tooltip="CO2e is a standardized unit of measurement that combines the warming impact of all greenhouse gases, including:  Carbon Dioxide (CO2), Methane (CH4), Nitrous Oxide (N2O) and Fluorinated gases (like HFCs, PFCs, and SF6).  Each of these gases has a different Global Warming Potential (GWP), which is a measure of how much heat it traps in the atmosphere compared to a similar amount of CO2 over a specific period (usually 100 years).  Using CO2e converts the emissions of these more potent gases into an equivalent amount of CO2. This allows for a single, uniform metric to compare the total climate impact from various sources.  CO2e is used for calculating and reporting a total carbon footprint for a company, a product, or a country.  The CO2e emission factor for electricity generation is often expressed as kilograms of CO2 per kilowatt-hour (kg CO2/kWh). This number varies depending on the fuel source (e.g., coal, natural gas, or renewables)."
            formItemProps={{
              name: 'emissionFactor',
              rules: [
                {
                  validator(_, value) {
                    if (!value?.trim())
                      return Promise.reject(new Error('Please enter CO2e emission factor.'));
                    if (value === '-' || value === '.' || value === '-.') {
                      return Promise.reject(
                        new Error('Please enter a valid CO2e emission factor.')
                      );
                    }

                    const validNumberRegex = /^-?\d+(\.\d+)?$/;

                    if (!validNumberRegex.test(value)) {
                      return Promise.reject(
                        new Error('Please enter a valid CO2e emission factor.')
                      );
                    }

                    const num = Number(value);

                    if (isNaN(num)) {
                      return Promise.reject(
                        new Error('Please enter a valid CO2e emission factor.')
                      );
                    }

                    return Promise.resolve();
                  }
                }
              ]
            }}
            inputProps={{
              placeholder: 'Enter Factor',
              type: 'text',
              maxLength: 10,
              addonAfterText: 'kg of CO2e per kWh',
              onKeyDown: allowNegativeDecimalOnly
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default NamePlateForm;
