import React from 'react';

import { Link } from 'react-router-dom';

import {
  AuditOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  FileOutlined
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';

import CardWithTitle from '@/shared/components/common/CardWithTitle';
import Details from '@/shared/components/common/Details';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { ROUTES } from '@/shared/constants/routes';
import { ChillerIcon, EditIcon } from '@/shared/svg';
import { hasPermission, toAbsoluteUrl } from '@/shared/utils/functions';

import { Wrapper } from '../style';

const ViewMaintenance: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Maintenance Records" />
      <HeaderToolbar
        title="Maintenance Records"
        backBtn={true}
        button={
          <div className="maintenanceButtonWrap">
            {hasPermission('maintenance', 'toggleStatus') && (
              <Button className="title-cancel-btn delete-btn" icon={<DeleteOutlined />}>
                Delete
              </Button>
            )}
            {hasPermission('maintenance', 'edit') && (
              <Button className="title-btn" type="primary" shape="round" icon={<EditIcon />}>
                <Link to={ROUTES.EDIT_MAINTENANCE}>Edit</Link>
              </Button>
            )}
          </div>
        }
      />
      <Row className="mainFirstRow">
        <Col xs={24} sm={24} md={24} lg={24}>
          <ShadowPaper>
            <ul className="maintenanceDetails">
              <Details
                detailsTitle="CryoStream"
                detailsDescription="CHL-983472-AQ"
                detailsIcon={<ChillerIcon />}
              />
              <Details
                detailsTitle="CryoSystems ArcticCore V10"
                detailsDescription
                detailsIcon={<AuditOutlined />}
              />
              <Details
                detailsTitle="1992 | 1000 R-22"
                detailsDescription
                detailsIcon={<FileOutlined />}
              />
              <Details
                detailsTitle="Joey Tribiyani"
                detailsDescription="12/11/24 15:00"
                detailsIcon
              />
              <Details
                detailsTitle="12/14/2024"
                detailsDescription="03:00 PM"
                detailsIcon={<ClockCircleOutlined />}
              />
            </ul>
          </ShadowPaper>
        </Col>
      </Row>

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} className="generalCol">
              <CardWithTitle title="General">
                <ul className="generalList">
                  <Details
                    detailsTitle="Maintenance Date & Time"
                    detailsDescription="12/14/2024 03:00 PM EST"
                    detailsIcon
                  />
                  <Details
                    detailsTitle="Category"
                    detailsDescription="Annual Maintenance"
                    detailsIcon
                  />
                  <Details detailsTitle="Type" detailsDescription="Annual" detailsIcon />
                </ul>
              </CardWithTitle>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} className="generalCol">
              <CardWithTitle title="Maintenance Notes">
                <p className="notes">
                  Lorem ipsum dolor sit amet, vince adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </CardWithTitle>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={12} lg={16} className="generalCol">
          <CardWithTitle title="Files">
            <figure className="files">
              <img src={toAbsoluteUrl('/public/icons/gauge.png')} alt="file" />
            </figure>
          </CardWithTitle>
        </Col>
      </Row>

      <div className="maintenanceButtonWrap extraActionButton">
        {hasPermission('maintenance', 'toggleStatus') && (
          <Button className="title-cancel-btn delete-btn" icon={<DeleteOutlined />}>
            Delete
          </Button>
        )}
        {hasPermission('maintenance', 'edit') && (
          <Button className="title-btn" type="primary" shape="round" icon={<EditIcon />}>
            <Link to={ROUTES.EDIT_MAINTENANCE}>Edit</Link>
          </Button>
        )}
      </div>
    </Wrapper>
  );
};

export default ViewMaintenance;
