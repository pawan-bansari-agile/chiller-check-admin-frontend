import React from 'react';

import { Col, Row } from 'antd';

import { RenderSelect, RenderTextAreaInput } from '@/shared/components/common/FormField';
import {
  AVERAGE_EFFICIENCY_LOSS,
  NUMBER_OF_COMPRESSOR,
  OIL_PRESSURE_DIFF
} from '@/shared/constants';

const AdditionalInfoForm: React.FC = () => {
  return (
    <div className="chillerAddEfitForm">
      <Row gutter={[20, 25]}>
        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderSelect
            tooltip="Select Compressor oil pressure difference unit."
            label="Oil Pressure Differential"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'oilPressureDifferential',
              rules: [
                {
                  required: true,
                  message: 'Please select the oil pressure differential.'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Select',
              options: OIL_PRESSURE_DIFF
            }}
          />
        </Col>{' '}
        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderSelect
            label="Calculate Efficiency Using"
            tooltip="If you check this box, Log reading must include Run Hours."
            colClassName="custom-select-col"
            formItemProps={{
              name: 'calculateEfficiencyUsing',
              rules: [
                {
                  required: true,
                  message: 'Please select a calculate efficiency.'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Select',
              options: AVERAGE_EFFICIENCY_LOSS
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderSelect
            tooltip="Select how many compressors does the chiller have."
            label="Number Of Compressors"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'noOfCompressors',
              rules: [
                {
                  required: true,
                  message: 'Please select number of compressors.'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Select',
              options: NUMBER_OF_COMPRESSOR
            }}
          />
        </Col>
        <Col span={24}>
          <RenderTextAreaInput
            colProps={{ span: 24 }}
            tooltip="Enter any notes for the chiller."
            label="User Notes"
            formItemProps={{
              name: 'userNotes',
              label: 'User Notes',
              rules: [
                {
                  validator: (_, value) => {
                    if (value && value.trim() === '') {
                      return Promise.reject(new Error('Please enter valid user notes.'));
                    }
                    return Promise.resolve();
                  }
                }
              ]
            }}
            inputProps={{
              placeholder: 'Enter User Notes',
              autoSize: { minRows: 3, maxRows: 6 }
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AdditionalInfoForm;
