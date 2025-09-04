import React from 'react';

import { Col, Row } from 'antd';

import { RenderRadioGroupInput, RenderTextInput } from '@/shared/components/common/FormField';
import { PURGE_READING_UNIT } from '@/shared/constants';
import { allowHoursPerWeek } from '@/shared/utils/functions';

const ReadoutsForm: React.FC = () => {
  return (
    <div className="chillerAddEfitForm">
      <Row gutter={[20, 25]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <RenderRadioGroupInput
            tooltip="Select if the purge exists."
            label="Purge Total Pumpout Time Readout On Chiller?"
            colProps={{ span: 24 }}
            colClassName="radio-field"
            formItemProps={{
              name: 'pumpOutTimeReadout',
              rules: [
                {
                  required: true,
                  message:
                    'Please select if the purge total pumpout time readout is on the chiller.'
                }
              ]
            }}
            inputProps={{
              options: [
                { label: 'Yes', value: true },
                { label: 'No', value: false }
              ]
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <RenderRadioGroupInput
            colProps={{ span: 24 }}
            colClassName="radio-field"
            tooltip="Select the purge reading unit."
            label="Purge Total Pumpout Time Measured In What Units?"
            formItemProps={{
              name: 'purgePumpOutReading',
              rules: [
                {
                  required: true,
                  message: 'Please select the unit in which purge total pumpout time is measured.'
                }
              ]
            }}
            inputProps={{
              options: PURGE_READING_UNIT
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <RenderTextInput
            label="Max. Daily Purge Total Pumpout Time Before Alert"
            tooltip="Specify what is the maximum purge time."
            required
            colClassName="addonAfterClass"
            formItemProps={{
              name: 'maxDailyPurge',
              rules: [
                {
                  required: true,
                  message: 'Please enter maximum daily purge total pumpout time before alert.'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Max. Daily Purge Total Pumpout Time Before Alert',
              addonAfterText: 'Min.',
              type: 'text',
              inputMode: 'numeric',
              onKeyDown: allowHoursPerWeek,
              maxLength: 7
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <RenderRadioGroupInput
            tooltip="Specify the bearing temperature presence."
            label="Readout For Bearing Temp.?"
            colProps={{ span: 24 }}
            colClassName="radio-field"
            formItemProps={{
              name: 'bearingTemp',
              rules: [
                {
                  required: true,
                  message: 'Please specify whether a readout for bearing temperature is available.'
                }
              ]
            }}
            inputProps={{
              options: [
                { label: 'Yes', value: true },
                { label: 'No', value: false }
              ]
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ReadoutsForm;
