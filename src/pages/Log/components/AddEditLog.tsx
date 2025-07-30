import React from 'react';

import { useNavigate } from 'react-router-dom';

import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Switch, TimePicker, TimePickerProps, Tooltip } from 'antd';
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
  const navigate = useNavigate();

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
                  tooltip="Enter the chiller's air temperature."
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
                  tooltip="Enter the running hours of the chiller from the chiller's reading."
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
                      title="Check this box if you want the system to start validating the run hours from this log entry, if you check we will consider the hours entered as correct without validating it against the value of the past entry."
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
                  tooltip="Enter any user notes that would help the viewer to get more clarity about the entry."
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
                  <span className="mainlabel">
                    Inlet Temperature{' '}
                    <Tooltip
                      title="Enter the temperature of the fluid (usually water or air) entering the condenser to absorb and carry away heat from the refrigerant."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Outlet Temperature{' '}
                    <Tooltip
                      title="Enter the temperature of the fluid (usually water or air) exiting the condenser after absorbing heat from the refrigerant."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>

                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Refrig Temp.{' '}
                    <Tooltip
                      title="Enter the temperature of the refrigerant as it releases heat and changes from a vapor to a liquid within the condenser."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Pressure{' '}
                    <Tooltip
                      title="Enter the pressure of the refrigerant within the condenser as it condenses from vapor to liquid by releasing heat."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Pressure Drop{' '}
                    <Tooltip
                      title="Enter the decrease in air pressure as it flows across the condenser coil, indicating airflow resistance and coil cleanliness."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Inlet Temperature{' '}
                    <Tooltip
                      title="Enter the temperature of the fluid (usually water) entering the evaporator to be cooled by the refrigerant."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Outlet Temperature{' '}
                    <Tooltip
                      title="Enter the temperature of the fluid exiting the evaporator after being cooled by the refrigerant."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Sat.Refrig Temp.{' '}
                    <Tooltip
                      title="Enter the temperature of the refrigerant as it absorbs heat and evaporates from liquid to vapor inside the evaporator."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Pressure{' '}
                    <Tooltip
                      title="Enter the pressure of the refrigerant within the evaporator as it absorbs heat and evaporates into a vapor."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Pressure Drop{' '}
                    <Tooltip
                      title="Explain the difference in pressure of the fluid (usually water) between the evaporator inlet and outlet, indicating flow resistance."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Oil Press Dif{' '}
                    <Tooltip
                      title="Compressor oil pressure difference at which lubricating oil is supplied to the compressor’s moving parts to ensure proper lubrication & prevent wear."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Sump Temp.{' '}
                    <Tooltip
                      title="Enter the value for Oil Sump Temperature of the chiller's compressor."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Oil Level{' '}
                    <Tooltip
                      title="Enter the oil level of the chiller's compressor."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Bearing Temp{' '}
                    <Tooltip
                      title="Enter the temperature of the bearings inside the compressor, indicating the condition of lubrication and mechanical health."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Comp 1 Run Hours{' '}
                    <Tooltip title="Enter compressor's running hours." color="#000ABC">
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Begin Record Reading{' '}
                    <Tooltip
                      title="Check this box if you want the system to start validating the compressor run hours from this log entry, if you check we will consider the hours entered as correct without validating it against the value of the past entry."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Comp 2 Run Hours{' '}
                    <Tooltip title="Enter 2nd compressor's running hours." color="#000ABC">
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Begin Record Reading{' '}
                    <Tooltip
                      title="Check this box if you want the system to start validating the compressor run hours from this log entry, if you check we will consider the hours entered as correct without validating it against the value of the past entry."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Purge Time{' '}
                    <Tooltip
                      title="Enter the duration of purge unit, that operates to remove non-condensable gases (like air) from the refrigerant system to maintain efficiency."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Amps Phase 1/% Load{' '}
                    <Tooltip
                      title="Amps Phase 1 : Enter the value for amps phase 1.
% Load : Enter the % load of the chiller."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Amps Phase 2{' '}
                    <Tooltip
                      title="Amps Phase 2 : Enter the value for amps phase 2."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Amps Phase 3{' '}
                    <Tooltip
                      title="Amps Phase 2 : Enter the value for amps phase 3."
                      color="#000ABC"
                    >
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Volts Phase 1{' '}
                    <Tooltip title="Enter the phase 1 volts." color="#000ABC">
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Volts Phase 2{' '}
                    <Tooltip title="Enter the phase 2 volts." color="#000ABC">
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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
                  <span className="mainlabel">
                    Volts Phase 3{' '}
                    <Tooltip title="Enter the phase 3 volts." color="#000ABC">
                      <InfoCircleOutlined style={{ color: '#000ABC' }} />
                    </Tooltip>
                  </span>
                  <Col xs={24} sm={24} md={24} lg={24} xl={11}>
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

      <div className="logButtonWrap extraActionButton">
        <Button className="title-cancel-btn" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="primary" className="title-btn" icon={<PlusOutlined />}>
          Add / Save
        </Button>
      </div>
    </Wrapper>
  );
};

export default AddEditLog;
