import React from 'react';

import { AuditOutlined, ClockCircleOutlined, FileOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';

import CardWithTitle from '@/shared/components/common/CardWithTitle';
import Details from '@/shared/components/common/Details';
import { RenderTextAreaInput } from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { User } from '@/shared/svg';

import { Wrapper } from '../style';

const ConfigureFiled: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Configure Field" />
      <HeaderToolbar
        title="Configure Field"
        backBtn={true}
        button={
          <div className="viewButtonWrap">
            <Button className="title-cancel-btn">Cancel</Button>
            <Button type="primary" className="title-btn" shape="round">
              Save
            </Button>
          </div>
        }
      />
      <div className="shadowWrap">
        <ShadowPaper>
          <ul className="configureLists">
            <Details
              detailsIcon={<AuditOutlined />}
              detailsTitle="Field Module"
              detailsDescription="General"
            />
            <Details
              detailsIcon={<FileOutlined />}
              detailsTitle="Field Name"
              detailsDescription="Outside Air Temp."
            />
            <Details
              detailsIcon={<User />}
              detailsTitle="Updated By"
              detailsDescription="Monica Gellar"
            />
            <Details
              detailsIcon={<ClockCircleOutlined />}
              detailsTitle="Updated At"
              detailsDescription="12/11/24 15:53"
            />
          </ul>
        </ShadowPaper>
        <div className="cardWrap">
          <CardWithTitle title="Problem">
            <Form className="ConfigureFiledForm">
              <RenderTextAreaInput
                colProps={{ span: 24 }}
                label="Write problem"
                formItemProps={{
                  name: 'Write problem',
                  label: 'Write problem',
                  rules: [{ required: true, message: 'Please enter notes' }]
                }}
                inputProps={{
                  placeholder: 'Enter User Notes',
                  autoSize: { minRows: 9, maxRows: 6 }
                }}
              />
            </Form>
          </CardWithTitle>
          <CardWithTitle title="Solution">
            <Form className="ConfigureFiledForm">
              <RenderTextAreaInput
                colProps={{ span: 24 }}
                label="Write Solution"
                formItemProps={{
                  name: 'Write Solution',
                  label: 'Write Solution',
                  rules: [{ required: true, message: 'Please enter notes' }]
                }}
                inputProps={{
                  placeholder: 'Enter User Notes',
                  autoSize: { minRows: 9, maxRows: 6 }
                }}
              />
            </Form>
          </CardWithTitle>
        </div>
      </div>
    </Wrapper>
  );
};

export default ConfigureFiled;
