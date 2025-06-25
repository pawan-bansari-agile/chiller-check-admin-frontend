import { Button, Tabs, TabsProps } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { EditIcon, FileIcon } from '@/shared/svg';

import AnalyticsTab from '../components/AnalyticsTab';
import DetailsTab from '../components/DetailsTab';
import TimelineTab from '../components/TimelineTab';
import { Wrapper } from '../style';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Analytics',
    children: <AnalyticsTab />
  },
  {
    key: '2',
    label: 'Details',
    children: <DetailsTab />
  },
  {
    key: '3',
    label: 'Timeline',
    children: <TimelineTab />
  }
];

const ViewChiller = () => {
  return (
    <Wrapper>
      <Meta title="Chiller Management" />
      <HeaderToolbar
        title="View Chiller"
        backBtn={true}
        button={
          <div className="viewButtonWrap">
            <Button className="title-cancel-btn">Inactivate</Button>
            <Button className="title-btn" type="primary" icon={<EditIcon />}>
              Edit
            </Button>
            <Button className="title-btn" type="primary" icon={<FileIcon />}>
              Log Entries
            </Button>
          </div>
        }
      />
      <ShadowPaper>
        <Tabs defaultActiveKey="1" items={items} className="userTab" />
      </ShadowPaper>
    </Wrapper>
  );
};

export default ViewChiller;
