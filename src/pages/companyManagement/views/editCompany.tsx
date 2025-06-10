import { Button } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';

import CompanyAddEditForm from '../components/CompanyAddEditForm';
import { Wrapper } from '../style';

const EditCompany: React.FC = () => {
  return (
    <>
      <Wrapper>
        <Meta title="Company Management" />
        <HeaderToolbar
          title="Edit Company"
          backBtn={true}
          button={
            <>
              <Button type="primary" shape="round">
                Cancel
              </Button>
              <Button type="primary" shape="round">
                Save
              </Button>
            </>
          }
        />
        <CompanyAddEditForm />
      </Wrapper>
    </>
  );
};

export default EditCompany;
