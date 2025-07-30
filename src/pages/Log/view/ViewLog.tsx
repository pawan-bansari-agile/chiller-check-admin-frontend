import React from 'react';

import { Link } from 'react-router-dom';

import { AuditOutlined, ClockCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';

import CardWithTitle from '@/shared/components/common/CardWithTitle';
import Details from '@/shared/components/common/Details';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { ROUTES } from '@/shared/constants/routes';
import {
  ChillerIcon,
  CondLossIcon,
  EditIcon,
  EfficiencyLossIcon,
  EvaLossIcon,
  FacilityIcon,
  NonCondLossIcon,
  OtherLossIcon
} from '@/shared/svg';
import { hasPermission, toAbsoluteUrl } from '@/shared/utils/functions';

import { Wrapper } from '../style';

const ViewLog: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Log Entries" />
      <HeaderToolbar
        title="View Log"
        backBtn={true}
        button={
          <div className="logButtonWrap">
            {hasPermission('log', 'toggleStatus') && (
              <Button className="title-cancel-btn delete-btn" icon={<DeleteOutlined />}>
                Delete
              </Button>
            )}
            {hasPermission('log', 'edit') && (
              <Button type="primary" className="title-btn" icon={<EditIcon />}>
                <Link to={ROUTES.EDIT_LOG_ENTRY}>Edit</Link>
              </Button>
            )}
          </div>
        }
      />

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <ShadowPaper>
            <ul className="viewLogMainDetails">
              <li>
                <div className="titleWrap">
                  <span>
                    <AuditOutlined />
                  </span>
                  <h2>Company</h2>
                </div>
                <p>The Agile Tech</p>
              </li>
              <li>
                <div className="titleWrap">
                  <span>
                    <FacilityIcon />
                  </span>
                  <h2>Facility</h2>
                </div>
                <p>ChillTech ArcticCore V156</p>
              </li>
              <li>
                <div className="titleWrap">
                  <span>
                    <ChillerIcon />
                  </span>
                  <h2>CryoStream</h2>
                </div>
                <p>CHL-983472-AQ</p>
              </li>
              <li>
                <div className="titleWrap userTitleWrap">
                  <figure>
                    <img src={toAbsoluteUrl('/icons/placeHolder.jpg')} alt="" />
                  </figure>
                  <div>
                    <h2>Joey Tribiyani</h2>
                    <p>12/11/24 15:00</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="titleWrap">
                  <span>
                    <ClockCircleOutlined />
                  </span>
                  <h2>Modified At</h2>
                </div>
                <p>12/14/2024 03:00 PM</p>
              </li>
              <li>
                <div className="titleWrap lossesWrap">
                  <span>
                    <EfficiencyLossIcon />
                  </span>
                  <h3>
                    Efficient Loss: <span>70.25%</span>
                  </h3>
                </div>
                <div className="titleWrap lossesWrap">
                  <span>
                    <CondLossIcon />
                  </span>
                  <h3>
                    Cond. App. Loss: <span>17.35%</span>
                  </h3>
                </div>
              </li>
              <li>
                <div className="titleWrap lossesWrap">
                  <span>
                    <EvaLossIcon />
                  </span>
                  <h3>
                    Evap. App. Loss: <span>70.25%</span>
                  </h3>
                </div>
                <div className="titleWrap lossesWrap">
                  <span>
                    <NonCondLossIcon />
                  </span>
                  <h3>
                    Non-Cond. Loss: <span>17.35%</span>
                  </h3>
                </div>
              </li>
              <li>
                <div className="titleWrap lossesWrap">
                  <span>
                    <OtherLossIcon />
                  </span>
                  <h3>
                    Other Losses: <span>70.25%</span>
                  </h3>
                </div>
              </li>
            </ul>
          </ShadowPaper>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} className="fullWidthCol">
          <CardWithTitle title="General">
            <ul className="generalDetailList">
              <Details
                detailsTitle="Outside Air Temp."
                className="commonBadge"
                detailsDescription="60 ℉"
                detailsIcon
              />
              <Details
                detailsTitle="Reading Time"
                detailsDescription="12/14/24 03:00 PM EST"
                detailsIcon
              />
              <Details
                detailsTitle="Reading Time UTC"
                detailsDescription="12/14/24 16:00"
                detailsIcon
              />
              <Details
                className="readingDetails"
                detailsTitle="Chiller Run Hours"
                detailsDescription="27"
                detailsIcon
              />
              <Details
                detailsTitle="Begin Recording Run Hrs."
                detailsDescription="Yes"
                detailsIcon
                className="readingDetails"
              />
            </ul>
          </CardWithTitle>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} className="fullWidthCol">
          <CardWithTitle title="General">
            <p className="generalLogContent">
              Lorem ipsum dolor sit amet, vince adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </CardWithTitle>
        </Col>

        <Col xs={24} sm={24} md={12} lg={6} className="otherLogFormWrap">
          <ShadowPaper>
            <h4>Condenser</h4>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Inlet Temperature</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Outlet Temperature</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Refrig Temp.</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Excess Approach</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Pressure</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Non Cond.</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Pressure Drop</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>
            </Row>
          </ShadowPaper>
        </Col>

        <Col xs={24} sm={24} md={12} lg={6} className="otherLogFormWrap">
          <ShadowPaper>
            <h4>Evaporator</h4>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Inlet Temperature</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Outlet Temperature</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Sat.Refrig Temp.</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Excess Approach</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Pressure</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Pressure Drop</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>
            </Row>
          </ShadowPaper>
        </Col>

        <Col xs={24} sm={24} md={12} lg={6} className="otherLogFormWrap">
          <ShadowPaper>
            <h4>Compressor</h4>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Oil Press Dif</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Sump Temp.</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Oil Level</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Bearing Temp</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Comp 1 Run Hours</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Begin Record Reading</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Comp 2 Run Hours</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Begin Record Reading</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Purge Time</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>
            </Row>
          </ShadowPaper>
        </Col>

        <Col xs={24} sm={24} md={12} lg={6} className="otherLogFormWrap">
          <ShadowPaper>
            <h4>Electrical</h4>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Amps Phase 1/% Load</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Amps Phase 2</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Amps Phase 3</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Volts Phase 1</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Volts Phase 2</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>{' '}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="otherLogForm">
                  <span className="mainlabel">Volts Phase 3</span>
                  <span className="mainLabelValue">60.00 ℉</span>
                </div>
              </Col>
            </Row>
          </ShadowPaper>
        </Col>
      </Row>

      <div className="logButtonWrap extraActionButton">
        {hasPermission('log', 'toggleStatus') && (
          <Button className="title-cancel-btn delete-btn" icon={<DeleteOutlined />}>
            Delete
          </Button>
        )}
        {hasPermission('log', 'edit') && (
          <Button type="primary" className="title-btn" icon={<EditIcon />}>
            <Link to={ROUTES.EDIT_LOG_ENTRY}>Edit</Link>
          </Button>
        )}
      </div>
    </Wrapper>
  );
};

export default ViewLog;
