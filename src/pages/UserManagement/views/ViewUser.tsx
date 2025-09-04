import React, { useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import {
  CheckSquareOutlined,
  // CheckSquareOutlined,
  // CheckSquareOutlined,
  ExclamationCircleOutlined,
  LockOutlined,
  LoginOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Image, Tabs } from 'antd';

import { authHooks } from '@/services/auth';
import { chillerQueryKeys } from '@/services/chiller';
import { companyQueryKeys } from '@/services/company';
import { dashboardQueryKey } from '@/services/dashboard';
import { facilityQueryKeys } from '@/services/facility';
import { logQueryKeys } from '@/services/log';
import { maintenanceQueryKey } from '@/services/maintenance';
import { reportQueryKey } from '@/services/report';
import { userHooks, userQueryKeys } from '@/services/user';

import Details from '@/shared/components/common/Details';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import CommonModal from '@/shared/components/common/Modal/components/CommonModal';
// import CommonModal from '@/shared/components/common/Modal/components/CommonModal';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import {
  APP_ENV,
  ENVIRONMENT,
  IMAGE_MODULE_NAME,
  IMAGE_URL,
  Role,
  USER_ROLES
} from '@/shared/constants';
import { formatLoginTime } from '@/shared/constants/day';
import { ROUTES } from '@/shared/constants/routes';
import { EditIcon, EmailIcon, User, UserRole } from '@/shared/svg';
import {
  formatPhoneNumberInUsFormat,
  hasPermission,
  showToaster,
  toAbsoluteUrl
} from '@/shared/utils/functions';

import AlertsTab from '../components/AlertsTab';
import PermissionTab from '../components/PermissionTab';
import ViewFacilityResponsibilitiesTab from '../components/ViewFacilityResponsibilities';
import ViewResponsibilitiesTab from '../components/ViewResponsibilitiesTab';
import { Wrapper } from '../style';

const ViewUser: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initialRef = useRef(false);

  const { id } = useParams();
  const [form] = Form.useForm();
  const { data, isLoading } = userHooks.GetUserDetail(id ?? '');
  const { mutate: activeInactiveAction, isPending } = userHooks.useActiveInactiveUser();
  const { mutate: forgotPasswordAction, isPending: isGeneratePending } =
    authHooks.useForgotPassword();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailHTML, setEmailHTML] = useState('');

  const activeInactiveUser = ({
    isActive,
    isUnAssign
  }: {
    isActive: boolean;
    isUnAssign: boolean;
  }) => {
    const payload = {
      id: id || '',
      isActive: isActive,
      shouldUnassign: isUnAssign
    };
    activeInactiveAction(payload, {
      onSuccess: (res) => {
        showToaster('success', res?.data || 'User Status Updated.');
        queryClient.invalidateQueries({ queryKey: facilityQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: chillerQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: logQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: maintenanceQueryKey.all });
        queryClient.invalidateQueries({ queryKey: reportQueryKey.all });
        queryClient.invalidateQueries({ queryKey: dashboardQueryKey.all });

        setIsModalOpen(false);
      },
      onError: (err) => {
        showToaster('error', err?.message || err?.message?.[0] || 'Something went wrong');
      }
    });
  };

  const generatePassword = () => {
    const forgotPasswordPayload = {
      email: data?.email
    };
    forgotPasswordAction(forgotPasswordPayload, {
      onSuccess: (res) => {
        const { data } = res || {};

        if (data?.link && APP_ENV === ENVIRONMENT['LOCAL']) {
          setEmailHTML(data?.link);
          setIsEmailModalOpen(true);
        } else {
          showToaster('success', 'Password reset link sent to the registered email.');
        }
      },
      onError: (err) => {
        const errorMsg = err?.message || err?.message?.[0] || 'Something went wrong';
        showToaster('error', errorMsg);
      }
    });
  };

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; // Avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  };

  const copyHtmlToClipboard = async () => {
    if (!emailHTML) return;

    try {
      fallbackCopy(emailHTML);
      showToaster('success', 'Link copied to clipboard');
      setEmailHTML('');
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }
  };

  return (
    <Wrapper>
      <Meta title="User Management" />
      {isLoading && <Loader />}
      <HeaderToolbar
        title="View User"
        backBtn={true}
        button={
          <div className="button-wrap">
            {!isLoading && hasPermission('users', 'toggleStatus') && (
              <Button className="title-cancel-btn" onClick={() => setIsModalOpen(true)}>
                {data?.isActive ? 'Inactivate ' : 'Activate'}
              </Button>
            )}

            <Button
              type="primary"
              className="title-btn"
              shape="round"
              icon={<LockOutlined />}
              onClick={generatePassword}
              loading={isGeneratePending}
              disabled={isGeneratePending}
            >
              Generate Password Link
            </Button>

            {hasPermission('users', 'edit') && (
              <Button
                type="primary"
                className="title-btn"
                onClick={() => navigate(ROUTES.EDIT_USER_MANAGEMENT(id!))}
                shape="round"
                icon={<EditIcon />}
              >
                Edit
              </Button>
            )}
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
              <Image
                src={`${data?.profileImage ? `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${data?.profileImage || ''}` : toAbsoluteUrl('/icons/placeHolder.jpg')}`}
                alt="user"
              />
            </figure>
            <ul className="userDetailsList">
              <Details
                detailsIcon={<User />}
                detailsTitle="Full Name"
                detailsDescription={`${data?.firstName} ${data?.lastName}`}
              />
              <Details
                detailsIcon={<UserRole />}
                detailsTitle="User Role"
                detailsDescription={Role?.find((val) => val?.value === data?.role)?.label || '-'}
              />
              <Details
                detailsIcon={<LoginOutlined />}
                detailsTitle="Last Log in"
                detailsDescription={formatLoginTime(data?.lastLoginTime) || '-'}
              />
              <Details
                detailsIcon={<EmailIcon />}
                detailsTitle="Email"
                detailsDescription={data?.email || '-'}
              />
              <Details
                detailsIcon={<PhoneOutlined />}
                detailsTitle="Phone Number"
                detailsDescription={formatPhoneNumberInUsFormat(data?.phoneNumber)}
              />
              {data?.role !== USER_ROLES.SUB_ADMIN && data?.role !== USER_ROLES.ADMIN && (
                <>
                  <Details
                    detailsIcon={<EmailIcon />}
                    detailsTitle="Company"
                    detailsDescription={data?.company?.name || '-'}
                  />
                  <Details
                    detailsIcon={<PhoneOutlined />}
                    detailsTitle="Facility"
                    detailsDescription={
                      data?.role === USER_ROLES.CORPORATE_MANAGER
                        ? data?.facilities?.length || '-'
                        : data?.role === USER_ROLES.FACILITY_MANAGER ||
                            data?.role === USER_ROLES.OPERATOR
                          ? data?.facilities?.length
                            ? data?.facilities?.map((val: any) => val?.name)?.join(', ')
                            : '-'
                          : '-'
                    }
                  />
                </>
              )}
              <Details
                detailsIcon={<ExclamationCircleOutlined />}
                detailsTitle="Status"
                detailsDescription={
                  <button className={`statusBtn ${data?.isActive ? 'active' : 'inactive'}`}>
                    {data?.isActive ? 'Active' : 'Inactive'}
                  </button>
                }
              />
            </ul>
          </div>
        </ShadowPaper>
        <ShadowPaper>
          <ShadowPaper>
            <Form form={form}>
              <Tabs defaultActiveKey="1" destroyInactiveTabPane={false} className="userTab">
                <Tabs.TabPane tab="Permission" key="1" forceRender>
                  <Form.Item name="permissions">
                    {data?.role && (
                      <PermissionTab
                        role={data?.role}
                        form={form}
                        id={id}
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
                        id={id}
                        response={data?.alerts}
                        isDisabled={true}
                        role={data?.role}
                        companyId={
                          data?.role === USER_ROLES.CORPORATE_MANAGER
                            ? data?.company?._id || ''
                            : ''
                        }
                        facilityIds={
                          data?.role === USER_ROLES.FACILITY_MANAGER
                            ? data?.facilityIds || []
                            : data?.role === USER_ROLES.CORPORATE_MANAGER
                              ? data?.alerts?.logs?.find((val: any) => val?.type === 'program')
                                  ?.facilityIds || []
                              : []
                        }
                        alertFacilities={data?.alertFacilities || []}
                        alertOperators={data?.alertOperators || []}
                      />
                    </Tabs.TabPane>
                  </>
                )}
              </Tabs>
            </Form>
          </ShadowPaper>
        </ShadowPaper>

        <div className="button-wrap extraActionButton">
          {!isLoading && hasPermission('users', 'toggleStatus') && (
            <Button className="title-cancel-btn" onClick={() => setIsModalOpen(true)}>
              {data?.isActive ? 'Inactivate ' : 'Activate'}
            </Button>
          )}

          <Button
            type="primary"
            className="title-btn"
            shape="round"
            icon={<LockOutlined />}
            onClick={generatePassword}
            loading={isGeneratePending}
            disabled={isGeneratePending}
          >
            Generate Password Link
          </Button>

          {hasPermission('users', 'edit') && (
            <Button
              type="primary"
              className="title-btn"
              onClick={() => navigate(ROUTES.EDIT_USER_MANAGEMENT(id!))}
              shape="round"
              icon={<EditIcon />}
            >
              Edit
            </Button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <CommonModal
          open={isModalOpen}
          closeIcon={true}
          closable={true}
          width={565}
          centered={true}
          maskClosable={false}
          className="InactiveModalWrap active-inactive-user-modal"
          title={
            <div className="modalTitleWrapper">
              <i>
                {data?.isActive ? (
                  <ExclamationCircleOutlined style={{ color: '#FEBE00' }} />
                ) : (
                  <CheckSquareOutlined style={{ color: '#00A86B' }} />
                )}
              </i>
              <span className="main-title">
                {data?.isActive ? 'Inactivate User' : 'Activate User'}
              </span>
            </div>
          }
          onCancel={() => setIsModalOpen(false)}
        >
          <p>
            {data?.isActive
              ? `This User will be immediately Inactivate & won’t be able to login unless you activate the User back. But would you like to unassigned company/facility/chiller?`
              : 'Once the inactivated user is activated back they will be sent an email & they can now log in & use the system as it is.'}
          </p>
          <div className="modalFooter">
            <Button onClick={() => setIsModalOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button
              className="footerBtn"
              onClick={() => activeInactiveUser({ isActive: !data.isActive, isUnAssign: false })}
              loading={isPending}
            >
              {data?.isActive ? 'Inactivate' : 'Activate'}
            </Button>
            {data?.isActive &&
              data?.role !== USER_ROLES.SUB_ADMIN &&
              data?.role !== USER_ROLES.ADMIN && (
                <Button
                  className="unassignBtn"
                  onClick={() => activeInactiveUser({ isActive: false, isUnAssign: true })}
                  loading={isPending}
                >
                  Unassign & Inactivate
                </Button>
              )}
          </div>
        </CommonModal>
      )}
      {isEmailModalOpen && (
        <CommonModal
          open={isEmailModalOpen}
          closeIcon={true}
          closable={true}
          centered={true}
          maskClosable={false}
          className="changePasswordModal"
          title={
            <div className="modalTitleWrapper">
              <span className="main-title">Copy Reset Link</span>
            </div>
          }
          onCancel={() => {
            setIsEmailModalOpen(false);
          }}
        >
          <p>
            A password reset link has been generated. Please copy the link below and share it with
            the user.
          </p>
          <div className="modalFooter">
            <Button
              type="primary"
              className="footerBtn"
              onClick={() => {
                copyHtmlToClipboard();
                setIsEmailModalOpen(false);
              }}
            >
              Copy Link
            </Button>
          </div>
        </CommonModal>
      )}
    </Wrapper>
  );
};

export default ViewUser;
