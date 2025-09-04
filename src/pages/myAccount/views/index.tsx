import React, { useMemo, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import AlertsTab from '@/pages/UserManagement/components/AlertsTab';
import PermissionTab from '@/pages/UserManagement/components/PermissionTab';
import ViewFacilityResponsibilitiesTab from '@/pages/UserManagement/components/ViewFacilityResponsibilities';
import ViewResponsibilitiesTab from '@/pages/UserManagement/components/ViewResponsibilitiesTab';
import { ExclamationCircleOutlined, LoginOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Form, Image, Tabs } from 'antd';

import { profileHooks } from '@/services/profile';

import { authStore } from '@/store/auth';

import Details from '@/shared/components/common/Details';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { IMAGE_MODULE_NAME, IMAGE_URL, Role, USER_ROLES } from '@/shared/constants';
import { formatLoginTime } from '@/shared/constants/day';
import { ROUTES } from '@/shared/constants/routes';
import { EditIcon, EmailIcon, User, UserRole } from '@/shared/svg';
import { capitalizeFirstLetter, formatPhoneNumber } from '@/shared/utils/functions';

import { Wrapper } from '../style';

const MyAccount: React.FC = () => {
  const navigate = useNavigate();
  const { userData } = authStore((state) => state);
  const { data, isLoading } = profileHooks.useProfile(userData?._id ?? '');
  const [form] = Form.useForm();

  const initialRef = useRef(false);

  const profileImage = useMemo(() => {
    if (!data?.profileImage) return '';
    return (
      `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${data?.profileImage || ''}` || ''
    );
  }, [data?.profileImage]);

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
            <h2 className="themeColor">User Details</h2>
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
                detailsDescription={Role?.find((val) => val?.value === data?.role)?.label || '-'}
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
        {userData?.role !== USER_ROLES.ADMIN && (
          <ShadowPaper>
            <Form form={form}>
              <Tabs defaultActiveKey="1" destroyInactiveTabPane={false}>
                <Tabs.TabPane tab="Permission" key="1" forceRender>
                  <Form.Item name="permissions">
                    {data?.role && (
                      <PermissionTab
                        role={data?.role}
                        form={form}
                        id={userData?._id}
                        permission={data?.permissions}
                        isDisabled={true}
                        initialRef={initialRef}
                      />
                    )}
                  </Form.Item>
                </Tabs.TabPane>

                {data?.role && data?.role !== USER_ROLES.SUB_ADMIN && (
                  <>
                    <Tabs.TabPane tab="Responsibilities" key="2" forceRender>
                      {data?.role === USER_ROLES.CORPORATE_MANAGER ? (
                        <ViewResponsibilitiesTab
                          companyList={data?.company ? [data?.company] : []}
                        />
                      ) : (
                        (data?.role === USER_ROLES.FACILITY_MANAGER ||
                          data?.role === USER_ROLES.OPERATOR) && (
                          <ViewFacilityResponsibilitiesTab
                            facilityList={data?.facilities || []}
                            role={data?.role}
                            chillerList={data?.chillers || []}
                            companyName={data?.company?.name || '-'}
                          />
                        )
                      )}
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Alerts" key="3" forceRender>
                      <AlertsTab
                        form={form}
                        id={userData?._id}
                        response={data?.alerts}
                        isDisabled={true}
                        role={data?.role}
                        alertFacilities={data?.alertFacilities || []}
                        alertOperators={data?.alertOperators || []}
                      />
                    </Tabs.TabPane>
                  </>
                )}
              </Tabs>
            </Form>
          </ShadowPaper>
        )}
      </div>
    </Wrapper>
  );
};

export default MyAccount;
