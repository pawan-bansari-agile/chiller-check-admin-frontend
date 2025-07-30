import React from 'react';

import { Col, Row } from 'antd';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';
import { AMPERAGE_CHOICE, VOLTAGE_CHOICE } from '@/shared/constants';
import { allowAverageLoad, validateDesignVoltage } from '@/shared/utils/functions';

const ElectricalForm: React.FC = () => {
  return (
    <div className="chillerAddEfitForm">
      <Row gutter={[20, 25]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <RenderTextInput
            label="Design Voltage"
            tooltip="Enter the designed voltage of the chiller."
            required
            formItemProps={{
              name: 'designVoltage',
              rules: [
                {
                  validator: validateDesignVoltage('design voltage', 208, 13000)
                }
              ]
            }}
            inputProps={{
              placeholder: 'Design Voltage',
              type: 'text', // use "text" for full control
              inputMode: 'decimal', // show numeric keypad with decimal on mobile
              onKeyDown: allowAverageLoad,
              maxLength: 10
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <RenderSelect
            tooltip="Select the voltage choice of the chiller. You can select 'Do not log voltage' if you don't want to report voltage."
            label="Voltage Choice"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'voltageChoice',
              rules: [
                {
                  required: true,
                  message: 'Please select a voltage choice.'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Voltage Choice',
              options: VOLTAGE_CHOICE
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <RenderTextInput
            tooltip="Enter the amperage at full load."
            label="Full-Load Amperage"
            required
            formItemProps={{
              name: 'fullLoadAmperage',
              rules: [
                {
                  validator: validateDesignVoltage('full load amperage', 15, 3000)
                }
              ]
            }}
            inputProps={{
              placeholder: 'Full-Load Amperage',
              type: 'text', // use "text" for full control
              inputMode: 'decimal', // show numeric keypad with decimal on mobile
              onKeyDown: allowAverageLoad,
              maxLength: 10
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <RenderSelect
            tooltip="Select how the Amperage will be reported."
            label="Amperage Choice"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'amperageChoice',
              rules: [
                {
                  required: true,
                  message: 'Please select an amperage option.'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Amperage Choice',
              options: AMPERAGE_CHOICE
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ElectricalForm;
