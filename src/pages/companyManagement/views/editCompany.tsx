import Meta from '@/shared/components/common/Meta';

import CompanyAddEditForm from '../components/CompanyAddEditForm';
import { Wrapper } from '../style';

const EditCompany: React.FC = () => {
  return (
    <>
      <Wrapper>
        <Meta title="Company Management" />
        <CompanyAddEditForm />
      </Wrapper>
    </>
  );
};

export default EditCompany;
