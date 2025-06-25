import React from 'react';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Form, Row, Switch, TimePicker, TimePickerProps, Tooltip } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import CardWithTitle from '@/shared/components/common/CardWithTitle';
import {
  RenderDatePickerInput,
  RenderSelect,
  RenderTextAreaInput,
  RenderTextInput
} from '@/shared/components/common/FormField';
import ShadowPaper from '@/shared/components/common/ShadowPaper';

import { Wrapper } from '../style';

dayjs.extend(customParseFormat);

const onChange: TimePickerProps['onChange'] = (time, timeString) => {
  console.log(time, timeString);
};

const AddEditLog: React.FC = () => {
  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <ShadowPaper>
            <Form className="addMainForm">
              <Row gutter={[20, 20]}>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <RenderSelect
                    label="Company"
                    tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                    colClassName="custom-select-col"
                    formItemProps={{
                      name: 'company',

                      rules: [{ required: true, message: 'Please select company.' }]
                    }}
                    inputProps={{
                      placeholder: 'Select company',
                      options: [{ label: 'the Agile tech', value: 'the Agile tech' }]
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <RenderSelect
                    label="Select Facility"
                    tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                    colClassName="custom-select-col"
                    formItemProps={{
                      name: 'facility',
                      rules: [{ required: true, message: 'Please select facility.' }]
                    }}
                    inputProps={{
                      placeholder: 'Select facility',
                      options: [
                        { label: 'ChillTech ArcticCore V156', value: 'ChillTech ArcticCore V156' }
                      ]
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <RenderSelect
                    label="Select Chiller"
                    tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                    colClassName="custom-select-col"
                    formItemProps={{
                      name: 'chiller',
                      rules: [{ required: true, message: 'Please select chiller.' }]
                    }}
                    inputProps={{
                      placeholder: 'Select chiller',
                      options: [
                        { label: 'CryoStream - CHL-983472-AQ', value: 'CryoStream - CHL-983472-AQ' }
                      ]
                    }}
                  />
                </Col>
              </Row>
            </Form>
          </ShadowPaper>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} className="fullWidthCol">
          <CardWithTitle title="General">
            <Row gutter={[20, 25]} className="generalRow">
              <Col xs={24} sm={24} md={24} lg={16}>
                <Row gutter={[5, 5]} className="doubleInputRow">
                  <Col xs={24} sm={24} md={24} lg={12}>
                    <RenderDatePickerInput
                      label="Reading Date & Time"
                      tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                      formItemProps={{
                        name: 'startDate',
                        rules: [{ required: true, message: 'Please select a date' }]
                      }}
                      inputProps={{ placeholder: 'Select Reading Date & Time' }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} className="timeWrap">
                    <TimePicker
                      onChange={onChange}
                      defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                    />
                    <div className="timezone">EST</div>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8}>
                <RenderTextInput
                  label="Outside Air Temp."
                  colClassName="addonAfterClass"
                  required
                  formItemProps={{
                    name: 'Outside Air Temp.',
                    rules: [
                      {
                        required: true,
                        message: 'Please enter outside Air Temp.'
                      }
                    ]
                  }}
                  inputProps={{
                    placeholder: 'Enter Outside Air Temp.',
                    addonAfterText: '℉'
                  }}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <RenderTextInput
                  label="Chiller Run Hours"
                  tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                  required
                  formItemProps={{
                    name: 'Chiller Run Hours',
                    rules: [
                      {
                        required: true,
                        message: 'Please enter chiller run hours'
                      }
                    ]
                  }}
                  inputProps={{
                    placeholder: 'Enter Chiller Run Hours'
                  }}
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <div className="switchLabelWrap">
                  <label className="switchLabel">
                    <i className="esteriskSign">*</i>Begin Recording Run Hrs.
                    <Tooltip
                      title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </label>
                  <Switch checkedChildren="Yes" unCheckedChildren="No" className="generalSwitch" />
                </div>
              </Col>
            </Row>
          </CardWithTitle>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} className="fullWidthCol">
          <CardWithTitle title="Additional Info">
            <Row gutter={[0, 15]} className="generalRow">
              <Col>
                <RenderTextAreaInput
                  colProps={{ span: 24 }}
                  label="Operator Notes"
                  formItemProps={{
                    name: 'Operator Notes',
                    label: 'Operator Notes',
                    rules: [{ required: true, message: 'Please enter operator notes' }]
                  }}
                  inputProps={{
                    placeholder: 'Enter User Operator Notes',
                    autoSize: { minRows: 5, maxRows: 6 }
                  }}
                />
              </Col>
            </Row>
          </CardWithTitle>
        </Col>

        <Col xs={24} sm={24} md={24} lg={6} className="otherLogFormWrap">
          <ShadowPaper>
            <h4>Condenser</h4>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Inlet Temperature</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Outlet Temperature</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Refrig Temp.</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Excess Approach</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Pressure</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Non Cond.</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Pressure Drop</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>
            </Row>
          </ShadowPaper>
        </Col>

        <Col xs={24} sm={24} md={24} lg={6} className="otherLogFormWrap">
          <ShadowPaper>
            <h4>Evaporator</h4>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Inlet Temperature</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Outlet Temperature</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Sat.Refrig Temp.</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Excess Approach</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Pressure</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Pressure Drop</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>
            </Row>
          </ShadowPaper>
        </Col>

        <Col xs={24} sm={24} md={24} lg={6} className="otherLogFormWrap">
          <ShadowPaper>
            <h4>Compressor</h4>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Oil Press Dif</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Sump Temp.</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Oil Level</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Bearing Temp</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Comp 1 Run Hours</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Begin Record Reading</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Comp 2 Run Hours</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Begin Record Reading</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Purge Time</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>
            </Row>
          </ShadowPaper>
        </Col>

        <Col xs={24} sm={24} md={24} lg={6} className="otherLogFormWrap">
          <ShadowPaper>
            <h4>Electrical</h4>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Amps Phase 1/% Load</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Amps Phase 2</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Amps Phase 3</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Volts Phase 1</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Volts Phase 2</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Volts Phase 3</span>
                  <Col span={11}>
                    <RenderTextInput
                      required
                      colClassName="addonAfterClass"
                      formItemProps={{
                        name: 'Temperature'
                      }}
                      inputProps={{
                        placeholder: 'Enter Temperature',
                        addonAfterText: '℉'
                      }}
                    />
                  </Col>
                </div>
              </Col>
            </Row>
          </ShadowPaper>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default AddEditLog;
