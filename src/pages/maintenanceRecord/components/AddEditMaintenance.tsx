import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  AuditOutlined,
  ClockCircleOutlined,
  FileOutlined,
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Button, Col, Form, Row, Upload, message } from 'antd';
import type { GetProp, UploadProps } from 'antd';

import CardWithTitle from '@/shared/components/common/CardWithTitle';
import Details from '@/shared/components/common/Details';
import {
  RenderDatePickerInput,
  RenderSelect,
  RenderTextAreaInput
} from '@/shared/components/common/FormField';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { ChillerIcon } from '@/shared/svg';

import { Wrapper } from '../style';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const AddEditMaintenance: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const navigate = useNavigate();

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Wrapper>
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

      <ShadowPaper>
        <Row className="maintenanceFields" gutter={[20, 20]}>
          <Col xs={24} sm={24} md={12} lg={8}>
            <RenderDatePickerInput
              label="Maintenance Date & Time"
              // tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
              formItemProps={{
                name: 'startDate',
                rules: [{ required: true, message: 'Please select a date' }]
              }}
              inputProps={{ placeholder: 'Select Maintenance Date & Time' }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <RenderSelect
              label="Maintenance Category"
              colClassName="custom-select-col"
              formItemProps={{
                name: 'Maintenance Category',
                rules: [
                  {
                    required: true,
                    message: 'Please select maintenance category'
                  }
                ]
              }}
              inputProps={{
                placeholder: 'Select',
                options: [
                  { label: 'Do Not Log Tube System', value: 'Do Not Log Tube System' },
                  { label: 'Do Not Log Tube System', value: 'Do Not Log Tube System' }
                ]
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <RenderSelect
              label="Maintenance Type"
              colClassName="custom-select-col"
              formItemProps={{
                name: 'Maintenance Type',
                rules: [
                  {
                    required: true,
                    message: 'Please select Maintenance Type'
                  }
                ]
              }}
              inputProps={{
                placeholder: 'Select',
                options: [
                  { label: 'Do Not Log Tube System', value: 'Do Not Log Tube System' },
                  { label: 'Do Not Log Tube System', value: 'Do Not Log Tube System' }
                ]
              }}
            />
          </Col>
        </Row>
      </ShadowPaper>

      <Row className="maintenanceCol" gutter={[20, 20]}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <CardWithTitle title="Maintenance Notes">
            <Form className="noteForm">
              <RenderTextAreaInput
                colProps={{ span: 24 }}
                label="Notes"
                formItemProps={{
                  name: 'notes',
                  label: 'notes',
                  rules: [{ required: true, message: 'Please enter notes' }]
                }}
                inputProps={{
                  placeholder: 'Enter User Notes',
                  autoSize: { minRows: 6, maxRows: 6 }
                }}
              />
            </Form>
          </CardWithTitle>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12}>
          <CardWithTitle title="Maintenance File">
            <Upload
              name="avatar"
              listType="picture-card"
              className="maintenanceuploader"
              showUploadList={false}
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </CardWithTitle>
        </Col>
      </Row>

      <div className="maintenanceButtonWrap extraActionButton">
        <Button className="title-cancel-btn" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button className="title-btn" type="primary" shape="round" icon={<PlusOutlined />}>
          Add / Save
        </Button>
      </div>
    </Wrapper>
  );
};

export default AddEditMaintenance;
