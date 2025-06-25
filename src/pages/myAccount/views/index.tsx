import React, { useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import PermissionTab from '@/pages/UserManagement/components/PermissionTab';
import { ExclamationCircleOutlined, LoginOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Image, Tabs, TabsProps } from 'antd';

import { profileHooks } from '@/services/profile';

import { authStore } from '@/store/auth';

import Details from '@/shared/components/common/Details';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { IMAGE_MODULE_NAME, IMAGE_URL } from '@/shared/constants';
import { formatLoginTime } from '@/shared/constants/day';
import { ROUTES } from '@/shared/constants/routes';
import { EditIcon, EmailIcon, User, UserRole } from '@/shared/svg';
import { capitalizeFirstLetter, formatPhoneNumber } from '@/shared/utils/functions';

import { Wrapper } from '../style';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Permission',
    children: <PermissionTab />
  }
];

const MyAccount: React.FC = () => {
  const navigate = useNavigate();
  const { userData } = authStore((state) => state);
  const { data, isLoading } = profileHooks.useProfile(userData?._id ?? '');

  const profileImage = useMemo(() => {
    if (!data?.profileImage) return '';
    return (
      `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${data?.profileImage || ''}` || ''
    );
  }, [data?.profileImage]);

  const userRole = useMemo(() => capitalizeFirstLetter(data?.role || '-'), [data?.role]);

  const statusButton = useMemo(
    () => (
      <button className={`statusBtn ${data?.isActive ? 'active' : 'inActive'}`}>
        {data?.isActive ? 'Active' : 'Inactive'}
      </button>
    ),
    [data?.isActive]
  );
  return (
    <Wrapper>
      <Meta title="My Profile" />
      {isLoading && <Loader />}
      <HeaderToolbar
        title="View User"
        backBtn={true}
        backTo={ROUTES.DASHBOARD}
        button={
          <div className="button-wrap">
            <Button
              onClick={() => navigate('/change-password')}
              type="primary"
              className="title-btn"
              shape="round"
            >
              Change Password
            </Button>

            <Button
              onClick={() => navigate('/my-profile/edit')}
              type="primary"
              className="title-btn"
              shape="round"
              icon={<EditIcon />}
            >
              Edit
            </Button>
          </div>
        }
      />
      <div className="viewCompanyShadow">
        <ShadowPaper>
          <div className="viewUserDetails">
            <h2>User Details</h2>
          </div>
          <div className="userInfo">
            <figure className="userImg">
              <Image src={profileImage || '/icons/placeHolder.jpg'} alt="user" />
            </figure>
            <ul>
              <Details
                detailsIcon={<User />}
                detailsTitle="Full Name"
                detailsDescription={
                  capitalizeFirstLetter(data?.firstName || '') +
                  ' ' +
                  capitalizeFirstLetter(data?.lastName || '')
                }
              />
              <Details
                detailsIcon={<UserRole />}
                detailsTitle="User Role"
                detailsDescription={userRole}
              />
              <Details
                detailsIcon={<LoginOutlined />}
                detailsTitle="Last Log In"
                detailsDescription={formatLoginTime(data?.lastLoginTime)}
              />
              <Details
                detailsIcon={<EmailIcon />}
                detailsTitle="Email"
                detailsDescription={data?.email || '-'}
              />
              <Details
                detailsIcon={<PhoneOutlined />}
                detailsTitle="Phone Number"
                detailsDescription={formatPhoneNumber(data?.phoneNumber ?? '')}
              />
              <Details
                detailsIcon={<ExclamationCircleOutlined />}
                detailsTitle="Status"
                detailsDescription={statusButton}
              />
            </ul>
          </div>
        </ShadowPaper>
        <ShadowPaper>
          <Tabs defaultActiveKey="1" items={items} />
        </ShadowPaper>
      </div>
    </Wrapper>
  );
};

export default MyAccount;
