import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';

import { cmsHooks } from '@/services/cms';

import { authStore } from '@/store/auth';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CMS_TYPE, USER_ROLES } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';

import { Wrapper } from '../style';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  const { userData } = authStore((state) => state);
  const { data, isLoading } = cmsHooks.useCmsList(CMS_TYPE.PRIVACY_POLICY);
  return (
    <Wrapper>
      <Meta title="Privacy Policy" />
      {isLoading && <Loader />}
      <HeaderToolbar title="Privacy Policy" backBtn={false} />

      <ShadowPaper>
        <div className="editButton">
          {userData?.role === USER_ROLES.ADMIN && (
            <Button
              type="primary"
              onClick={() => navigate(ROUTES.EDIT_PRIVACY_POLICY)}
              className="title-btn savBtn"
            >
              Edit
            </Button>
          )}
        </div>
        <p className="cmsContent" dangerouslySetInnerHTML={{ __html: data?.description || '' }} />
      </ShadowPaper>
    </Wrapper>
  );
};

export default PrivacyPolicy;
