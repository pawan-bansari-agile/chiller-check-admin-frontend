import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';

import CompanyAddEditForm from '../components/CompanyAddEditForm';
import { Wrapper } from '../style';

const AddCompany: React.FC = () => {
  return (
    <>
      <Wrapper>
        <Meta title="Company Management" />
        <HeaderToolbar
          title="Add Company"
          backBtn={true}
          button={
            <Button type="primary" shape="round" icon={<PlusOutlined />}>
              Add
            </Button>
          }
        />
        <CompanyAddEditForm />
      </Wrapper>
    </>
  );
};

export default AddCompany;
