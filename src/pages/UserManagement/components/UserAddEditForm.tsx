import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Image, Row, Spin, Tabs } from 'antd';

import { authApi } from '@/services/auth';
import { chillerQueryKeys } from '@/services/chiller';
import { commonApi } from '@/services/common';
import { companyHooks, companyQueryKeys } from '@/services/company';
import { dashboardQueryKey } from '@/services/dashboard';
import { facilityQueryKeys } from '@/services/facility';
import { logQueryKeys } from '@/services/log';
import { maintenanceQueryKey } from '@/services/maintenance';
import { reportQueryKey } from '@/services/report';
import { userHooks, userQueryKeys } from '@/services/user';

import { authStore } from '@/store/auth';

import {
  RenderPatternFormatInput,
  RenderSelect,
  RenderTextInput
} from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import CommonModal from '@/shared/components/common/Modal/components/CommonModal';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import {
  APP_ENV,
  ENVIRONMENT,
  IMAGE_MODULE_NAME,
  IMAGE_URL,
  MODULES_BY_ROLE,
  PATTERNS,
  USER_ADD_ROLE,
  USER_ROLES,
  getDefaultLogs
} from '@/shared/constants';
import { CameraIcon } from '@/shared/svg';
import {
  capitalizeFirstLetter,
  capitalizeFirstLetterWhileTyping,
  showToaster,
  toAbsoluteUrl,
  validatePhoneNumber
} from '@/shared/utils/functions';

import { Wrapper } from '../style';
import AlertsTab from './AlertsTab';
import FacilityResponsibilitiesTab from './FacilityResponsibilities';
import PermissionTab from './PermissionTab';
import ResponsibilitiesTab from './ResponsibilitiesTab';

type AlertCondition = {
  operator?: string;
  threshold?: string | number;
};

type AlertConfig = {
  warning?: AlertCondition;
  alert?: AlertCondition;
};

type AlertsData = Record<string, AlertConfig>;

type MetricAlert = {
  metric?: string;
  warning?: AlertCondition;
  alert?: AlertCondition;
};

type FinalAlertFormat = {
  general?: { conditions?: MetricAlert[] };
};

type RawLogEntry = {
  type?: string;
  daysSince?: string;
  notifyBy?: string[];
};

type CleanedLogEntry = {
  type?: string;
  daysSince?: number;
  notifyBy?: string;
};

const UserAddEditForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const { userData } = authStore((state) => state);
  const queryClient = useQueryClient();

  const initialRef = useRef(false);
  const lastValidatedPhone = useRef<string | null>(null); // for successful validations
  const lastFailedPhone = useRef<string | null>(null); // for failed validations

  const { data: userDetails, isLoading } = userHooks.GetUserDetail(id ?? '');

  const { data: companyList, isLoading: isCompanyLoading } = companyHooks.AllCompanyList();
  const { mutate: addUserAction, isPending } = userHooks.useAddUser();
  const { mutate: editUserAction, isPending: isEditPending } = userHooks.useEditUser();

  const [imageShow, setImageShow] = useState<string>('');
  const [imageName, setImageName] = useState<string>('');
  const [companyId, setCompanyId] = useState<string>('');
  const [facilityIds, setFacilityIds] = useState<string[] | []>([]);
  const [chillerIds, setChillerIds] = useState<string[] | []>([]);

  const [activeTab, setActiveTab] = useState<string>('1');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [emailTemplateHtml, setEmailTemplateHtml] = useState<string>('');
  const [phoneLoading, setPhoneLoading] = useState<boolean>(false);

  const [imageLoader, setImageLoader] = useState<boolean>(false);

  const selectRole = Form.useWatch('role', form);
  const companySelect = Form.useWatch('companySelect', form);

  useEffect(() => {
    if (userData?.companyId && !isCompanyLoading) {
      form.setFieldValue('companySelect', userData?.companyId);
    }
  }, [form, isCompanyLoading, userData?.companyId]);

  // Transforms company list into dropdown options
  const companyOptions = useMemo(() => {
    return (
      companyList?.map((company) => ({
        label: capitalizeFirstLetter(company.name),
        value: company._id
      })) || []
    );
  }, [companyList]);

  const getOptionsByRole = useCallback(() => {
    switch (userData?.role) {
      case USER_ROLES.ADMIN:
        return USER_ADD_ROLE;
      case USER_ROLES.SUB_ADMIN:
        return USER_ADD_ROLE.slice(1);
      case USER_ROLES.CORPORATE_MANAGER:
        return USER_ADD_ROLE.slice(2);
      case USER_ROLES.FACILITY_MANAGER:
        return USER_ADD_ROLE.slice(3);
      default:
        return [];
    }
  }, [userData?.role]);

  useEffect(() => {
    if (id && userDetails) {
      form.setFieldsValue({
        role: userDetails?.role,
        firstName: userDetails?.firstName,
        lastName: userDetails?.lastName,
        email: userDetails?.email,
        phoneNumber: userDetails?.phoneNumber?.startsWith('+1')
          ? userDetails?.phoneNumber?.slice(2)
          : userDetails?.phoneNumber
      });
      setImageName(userDetails?.profileImage || '');
      const imgUrl = userDetails?.profileImage
        ? `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${userDetails?.profileImage || ''}`
        : '';
      setImageShow(imgUrl);
      if (userDetails?.role === USER_ROLES.CORPORATE_MANAGER) {
        setCompanyId(userDetails?.company?._id);
      }
      if (
        userDetails?.role === USER_ROLES.FACILITY_MANAGER ||
        userDetails?.role === USER_ROLES.OPERATOR
      ) {
        setFacilityIds(userDetails?.facilityIds || []);
        setChillerIds(userDetails?.chillerIds || []);
        form.setFieldValue('companySelect', userDetails?.company?._id);
      }
    } else {
      form.setFieldValue('role', getOptionsByRole()?.[0]?.value);
    }
  }, [form, getOptionsByRole, id, userDetails, userDetails?.role]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSizeInMB = 5;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    // ✅ Validate file type
    if (!validTypes.includes(selectedFile.type)) {
      showToaster('error', 'Only JPG, JPEG, or PNG files are allowed.');
      return;
    }

    // ✅ Validate file size
    if (selectedFile.size > maxSizeInBytes) {
      showToaster('error', 'File size should not exceed 5 MB.');
      return;
    }
    setImageLoader(true);
    try {
      const response = await commonApi.uploadFileAction({
        files: selectedFile,
        moduleName: IMAGE_MODULE_NAME.PROFILE_PIC
      });
      if (response) {
        const imgUrl = `${IMAGE_URL}tmp-chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${response?.[0]?.name}`;
        setImageShow(imgUrl);
        setImageName(response?.[0]?.name);
      }
    } catch (error) {
      const errMessage = error as any;
      showToaster(
        'error',
        errMessage?.message || 'An error occurred while uploading the profile image.'
      );
    } finally {
      setImageLoader(false);
    }
  };

  const removeImage = () => {
    setImageShow('');
    setImageName('');
  };

  const convertPermissionsWithDefaults = (
    selectedPermissions: Record<string, string[]>,
    role: string
  ): Record<string, Record<string, boolean>> => {
    const modules = MODULES_BY_ROLE[role] || {};

    return modules.reduce(
      (acc, { key, actions }) => {
        acc[key] = actions.reduce(
          (actionAcc, action) => {
            actionAcc[action] = selectedPermissions[key]?.includes(action) || false;
            return actionAcc;
          },
          {} as Record<string, boolean>
        );
        return acc;
      },
      {} as Record<string, Record<string, boolean>>
    );
  };

  const handleSuccess = (message: string, emailTemplateHtmlFromAPI?: string) => {
    form.resetFields();
    queryClient.invalidateQueries({ queryKey: facilityQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: chillerQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: logQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: maintenanceQueryKey.all });
    queryClient.invalidateQueries({ queryKey: reportQueryKey.all });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKey.all });

    if (APP_ENV === ENVIRONMENT['LOCAL'] && emailTemplateHtmlFromAPI && !id) {
      setEmailTemplateHtml(emailTemplateHtmlFromAPI);
      setIsModalOpen(true);
    } else {
      setEmailTemplateHtml('');
      setIsModalOpen(false);
      navigate(-1);
      showToaster('success', message);
    }
  };

  const openAndCopyHtml = () => {
    // Create a hidden container to render the HTML
    const container = document.createElement('div');
    container.innerHTML = emailTemplateHtml;
    container.style.position = 'fixed';
    container.style.left = '-9999px'; // keep it off-screen
    document.body.appendChild(container);

    // Select the rendered content
    const range = document.createRange();
    range.selectNodeContents(container);

    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    try {
      const success = document.execCommand('copy');
      if (!success) throw new Error('Copy command failed');
    } catch (err) {
      console.error('❌ Copy failed:', err);
    }

    // Cleanup selection + hidden container
    selection?.removeAllRanges();
    document.body.removeChild(container);
    showToaster('success', 'Link copied to clipboard');
    setEmailTemplateHtml('');
    navigate(-1);
  };

  const handleError = (err: any) => {
    const errorMsg = err?.message || err?.message?.[0] || 'Something went wrong';
    showToaster('error', errorMsg);
  };

  const handleTabChange = (key: string) => {
    if (
      key === '2' &&
      !companySelect &&
      (selectRole === USER_ROLES.FACILITY_MANAGER || selectRole === USER_ROLES.OPERATOR)
    ) {
      form.validateFields(['companySelect']);
      return;
    }
    setActiveTab(key);
  };

  const isEmptyCondition = (condition?: AlertCondition): boolean => {
    if (!condition) return true;

    const { operator, threshold } = condition;
    const isOperatorEmpty = !operator?.trim();
    const isThresholdEmpty = threshold === undefined || threshold === null || threshold === '';

    return isOperatorEmpty || isThresholdEmpty;
  };

  const formatAlertsToGeneral = (data: AlertsData): FinalAlertFormat => {
    const result: MetricAlert[] = [];

    for (const [key, value] of Object.entries(data)) {
      const item: MetricAlert = { metric: key };

      if (!isEmptyCondition(value?.warning)) {
        const threshold = value?.warning?.threshold;
        item.warning = {
          ...value.warning,
          threshold:
            threshold !== undefined && threshold !== null && threshold !== ''
              ? Number(threshold)
              : undefined
        };
      }

      if (!isEmptyCondition(value?.alert)) {
        const threshold = value?.alert?.threshold;
        item.alert = {
          ...value.alert,
          threshold:
            threshold !== undefined && threshold !== null && threshold !== ''
              ? Number(threshold)
              : undefined
        };
      }

      if (item.warning || item.alert) {
        result.push(item);
      }
    }
    const conditionData = result?.length ? { conditions: result } : {};
    return { general: conditionData };
  };
  const transformLogs = (logs: RawLogEntry[]): CleanedLogEntry[] => {
    return logs
      .filter((entry) => entry.daysSince?.trim()) // Remove entries with no daysSince
      .map((entry) => {
        const selected = entry.notifyBy ?? [];
        let notifyBy: string | undefined;

        if (selected.includes('web') && selected.includes('email')) {
          notifyBy = 'both';
        } else if (selected.length === 1) {
          notifyBy = selected[0]; // 'web' or 'email'
        }

        return {
          type: entry?.type,
          facilityIds:
            entry?.type === 'program'
              ? [form.getFieldValue('programFacility')]?.filter(Boolean)
              : undefined,
          operatorIds:
            entry?.type === 'program'
              ? form.getFieldValue('programOperator')?.filter(Boolean)
              : undefined,
          daysSince: entry?.daysSince!.trim() ? Number(entry?.daysSince!.trim()) : undefined,
          ...(notifyBy !== undefined ? { notifyBy } : {})
        };
      });
  };

  const onSubmit = async (values: any) => {
    // if (selectRole === USER_ROLES.CORPORATE_MANAGER && !companyId) {
    //   showToaster('error', 'Please select company.');
    //   setActiveTab('2');
    //   return;
    // }
    // if (
    //   (selectRole === USER_ROLES.FACILITY_MANAGER || selectRole === USER_ROLES.OPERATOR) &&
    //   facilityIds?.length === 0
    // ) {
    //   showToaster('error', 'Please select facilities.');
    //   setActiveTab('2');
    //   return;
    // }
    // if (selectRole === USER_ROLES.OPERATOR && chillerIds?.length === 0) {
    //   showToaster('error', 'Please select chillers.');
    //   setActiveTab('2');
    //   return;
    // }

    const modules = MODULES_BY_ROLE[selectRole] || [];

    const selectedPermissions = values?.permissions || {};

    // Remove modules not available in current role
    const filteredPermissions = modules.reduce(
      (acc, { key }) => {
        if (selectedPermissions[key]) {
          acc[key] = selectedPermissions[key];
        }
        return acc;
      },
      {} as Record<string, string[]>
    );

    const finalPermissions = convertPermissionsWithDefaults(filteredPermissions, selectRole);
    let alertObj = {};
    if (selectRole && selectRole !== USER_ROLES.SUB_ADMIN && selectRole !== USER_ROLES.ADMIN) {
      const generalResult = formatAlertsToGeneral(values?.general);
      const notifyBy = values?.notifyBy;
      if (Array.isArray(notifyBy) && notifyBy.includes('web') && notifyBy.includes('email')) {
        values.notifyBy = 'both';
      } else {
        values.notifyBy = values.notifyBy ? values.notifyBy[0] : undefined;
      }
      const logsResult = transformLogs(values?.logs);

      alertObj = {
        general: {
          conditions: generalResult?.general?.conditions || [],
          notifyBy: values?.notifyBy || undefined
        },
        logs: logsResult || undefined
      };
    }

    const payload = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      profileImage: imageName || '',
      email: values?.email?.toLowerCase(),
      phoneNumber: `+1${values?.phoneNumber?.replace(/\s+/g, '')}`,
      role: values?.role,
      permissions: finalPermissions,
      companyId:
        selectRole === USER_ROLES.CORPORATE_MANAGER
          ? companyId || undefined
          : selectRole === USER_ROLES.FACILITY_MANAGER || selectRole === USER_ROLES.OPERATOR
            ? companySelect || undefined
            : undefined,
      facilityIds:
        (selectRole === USER_ROLES.FACILITY_MANAGER || selectRole === USER_ROLES.OPERATOR) &&
        companySelect &&
        facilityIds?.length
          ? facilityIds
          : undefined,
      chillerIds:
        selectRole === USER_ROLES.OPERATOR && facilityIds?.length && chillerIds?.length
          ? chillerIds
          : undefined,
      alerts: Object.keys(alertObj)?.length > 0 ? alertObj : undefined
    };
    if (id) {
      editUserAction(
        { ...payload, id: id },
        {
          onSuccess: (res) => handleSuccess(res?.data?.message || ''),
          onError: handleError
        }
      );
    } else {
      addUserAction(payload, {
        onSuccess: (res) => {
          handleSuccess(res?.message || '', res?.data?.htmlLocal || '');
          setIsModalOpen(true);
        },
        onError: handleError
      });
    }
  };

  const handleCompanyChange = () => {
    setCompanyId('');
    setFacilityIds([]);
    setChillerIds([]);
    setActiveTab('1');
    form.resetFields(['notifyBy', 'general', 'logs', 'permissions']);
    form.setFieldValue('logs', getDefaultLogs());
    form.setFieldValue('programFacility', null);
    form.setFieldValue('programOperator', null);
  };
  const handleRolesChange = () => {
    setCompanyId('');
    setFacilityIds([]);
    setChillerIds([]);
    form.setFieldValue('companySelect', userData?.companyId || null);
    setActiveTab('1');
    form.resetFields(['notifyBy', 'general', 'logs', 'permissions']);
    form.setFieldValue('logs', getDefaultLogs());
    form.setFieldValue('programFacility', null);
    form.setFieldValue('programOperator', null);
  };

  const onFinishFailed = ({ errorFields }: any) => {
    if (errorFields?.length) {
      const alertTabFields = ['general'];

      const hasAlertsTabError = errorFields.some((field: any) =>
        alertTabFields.includes(field.name?.[0])
      );

      if (hasAlertsTabError) {
        setActiveTab('3'); // Switch to Alerts tab
      }
    }
  };

  const handlePhoneChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneLoading(true);
    const value = e.target.value;
    form.setFieldValue('phoneNumber', value);

    try {
      await form.validateFields(['phoneNumber']);

      if (value === lastFailedPhone.current) {
        form.setFields([
          {
            name: 'phoneNumber',
            errors: ['Please enter a working phone number.']
          }
        ]);
      }
      if (value === lastValidatedPhone.current || value === lastFailedPhone.current) return;

      const response = await authApi.validatePhoneNumberAction({
        phone: `+1${value?.replace(/\s+/g, '')}`
      });

      if (!response?.data?.success) {
        form.setFields([
          {
            name: 'phoneNumber',
            errors: ['Please enter a working phone number.']
          }
        ]);
        lastFailedPhone.current = value; // track failed value
        lastValidatedPhone.current = null; // reset last valid
      } else {
        setPhoneLoading(false);
        lastValidatedPhone.current = value; // track valid value
        lastFailedPhone.current = null; // reset last failed
      }
    } catch (err) {
      setPhoneLoading(false);
      lastValidatedPhone.current = null;
      lastFailedPhone.current = null;
    }
  };

  return (
    <Wrapper className="viewCompanyShadow">
      {isLoading && <Loader />}
      <Form
        className="userInfoForm"
        disabled={isPending || isLoading || isEditPending}
        form={form}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
      >
        <HeaderToolbar
          title={id ? 'Edit User' : 'Add User'}
          backBtn={true}
          className="addEditHeader userAddEditHeader"
          button={
            <div className="editButtonWrap">
              <Button
                className="title-cancel-btn"
                onClick={() => navigate(-1)}
                disabled={isPending || isEditPending}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                className="title-btn"
                loading={isPending || isEditPending}
                icon={!id && <PlusOutlined />}
                disabled={isPending || isLoading || isEditPending || phoneLoading}
              >
                {id ? 'Save' : 'Add / Save'}
              </Button>
            </div>
          }
        />

        <div className="shadowWrap">
          <ShadowPaper>
            <div className="viewUserDetails">
              <h2 className="themeColor">User Details</h2>
            </div>
            <div className="userInfo">
              {/* <figure className="userImg">
            <img src="/icons/icon.png" alt="user" />
          </figure> */}
              <div className="addProfilePic">
                <div className="pictureLabel">
                  <label>Profile Pic</label>
                  {/* <Tooltip
                    color="#000ABC"
                    title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                  >
                    <InfoCircleOutlined style={{ color: '#000ABC' }} />
                  </Tooltip> */}
                </div>
                <div className="inputPicture">
                  {imageLoader && <Spin />}
                  <Image src={imageShow || toAbsoluteUrl('/icons/placeHolder.jpg')} alt="user" />
                  <span className="cameraIcon">
                    <label className="fileLabel">
                      <input type="file" onChange={handleFileChange} accept=".jpg, .jpeg, .png" />
                      <CameraIcon />
                    </label>
                  </span>
                </div>
                {imageName && (
                  <h4 className="removeImg" onClick={removeImage}>
                    Remove Image
                  </h4>
                )}
              </div>
              <div className="profileForm">
                <Row gutter={[20, 25]}>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <RenderTextInput
                      label="First Name"
                      // tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                      required
                      formItemProps={{
                        name: 'firstName',
                        rules: [
                          {
                            required: true,
                            message: 'Please enter first name.'
                          },
                          {
                            pattern: PATTERNS.BLANK_SPACE,
                            message: 'Please enter valid first name.'
                          }
                        ]
                      }}
                      inputProps={{
                        placeholder: 'Enter First Name',
                        onChange: (e) => {
                          const capitalized = capitalizeFirstLetterWhileTyping(e.target.value);
                          form.setFieldsValue({ firstName: capitalized });
                        }
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <RenderTextInput
                      label="Last Name"
                      // tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                      required
                      formItemProps={{
                        name: 'lastName',
                        rules: [
                          {
                            required: true,
                            message: 'Please enter last name.'
                          },
                          {
                            pattern: PATTERNS.BLANK_SPACE,
                            message: 'Please enter valid last name.'
                          }
                        ]
                      }}
                      inputProps={{
                        placeholder: 'Enter Last Name',
                        onChange: (e) => {
                          const capitalized = capitalizeFirstLetterWhileTyping(e.target.value);
                          form.setFieldsValue({ lastName: capitalized });
                        }
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <RenderTextInput
                      label="Email"
                      // tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                      required
                      formItemProps={{
                        name: 'email',
                        rules: [
                          {
                            required: true,
                            message: 'Please enter email.'
                          },
                          {
                            type: 'email',
                            message: 'Please enter valid email.'
                          }
                        ]
                      }}
                      inputProps={{
                        disabled: !!id || isEditPending || isPending || isLoading,
                        placeholder: 'Enter Email'
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <RenderPatternFormatInput
                      label="Phone Number"
                      required
                      colClassName="userMobileInput"
                      formItemProps={{
                        name: 'phoneNumber',
                        rules: [
                          {
                            validator: validatePhoneNumber
                          }
                        ]
                      }}
                      inputProps={{
                        onChange: APP_ENV !== ENVIRONMENT['LOCAL'] ? handlePhoneChange : undefined,
                        disabled: isEditPending || isPending || isLoading,
                        placeholder: 'Enter Phone Number',
                        addonBefore: '+1'
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <RenderSelect
                      label="User Role"
                      colClassName="custom-select-col"
                      formItemProps={{
                        name: 'role',
                        rules: [{ required: true, message: 'Please select role.' }]
                      }}
                      inputProps={{
                        placeholder: 'Select User Role',
                        options: getOptionsByRole(),
                        allowClear: false,
                        onChange: handleRolesChange,
                        disabled: isPending || isEditPending || isLoading
                      }}
                    />
                  </Col>
                  {selectRole &&
                    selectRole !== USER_ROLES.SUB_ADMIN &&
                    selectRole !== USER_ROLES.CORPORATE_MANAGER && (
                      <Col xs={24} sm={24} md={12} lg={8}>
                        <RenderSelect
                          label="Company Name"
                          colClassName="custom-select-col"
                          formItemProps={{
                            name: 'companySelect',
                            rules: [{ required: true, message: 'Please select company.' }]
                          }}
                          inputProps={{
                            placeholder: 'Select Company Name',
                            options: companyOptions || [],
                            onChange: handleCompanyChange,
                            disabled:
                              isPending ||
                              isEditPending ||
                              isLoading ||
                              isCompanyLoading ||
                              !!userData?.companyId
                          }}
                        />
                      </Col>
                    )}
                </Row>
              </div>
            </div>
          </ShadowPaper>
          <ShadowPaper>
            <Tabs
              activeKey={activeTab}
              onChange={handleTabChange}
              destroyInactiveTabPane={false}
              className="userTab"
            >
              <Tabs.TabPane tab="Permission" key="1" forceRender>
                <Form.Item name="permissions">
                  {selectRole && (
                    <PermissionTab
                      role={selectRole}
                      form={form}
                      id={id}
                      permission={userDetails?.permissions}
                      initialRef={initialRef}
                    />
                  )}
                </Form.Item>
              </Tabs.TabPane>

              {selectRole && selectRole !== USER_ROLES.SUB_ADMIN && (
                <>
                  <Tabs.TabPane tab="Responsibilities" key="2" forceRender>
                    {selectRole === USER_ROLES.CORPORATE_MANAGER ? (
                      <ResponsibilitiesTab
                        companyId={companyId}
                        setCompanyId={setCompanyId}
                        form={form}
                      />
                    ) : (
                      companySelect && (
                        <FacilityResponsibilitiesTab
                          companySelect={companySelect}
                          facilityIds={facilityIds}
                          setFacilityIds={setFacilityIds}
                          role={selectRole}
                          chillerIds={chillerIds}
                          setChillerIds={setChillerIds}
                          form={form}
                        />
                      )
                    )}
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="Alerts" key="3" forceRender>
                    <AlertsTab
                      form={form}
                      id={id}
                      response={userDetails?.alerts}
                      role={selectRole}
                      companyId={selectRole === USER_ROLES.CORPORATE_MANAGER ? companyId || '' : ''}
                      facilityIds={
                        selectRole === USER_ROLES.FACILITY_MANAGER
                          ? facilityIds || []
                          : selectRole === USER_ROLES.CORPORATE_MANAGER
                            ? userDetails?.alerts?.logs?.find((val: any) => val?.type === 'program')
                                ?.facilityIds || []
                            : []
                      }
                    />
                  </Tabs.TabPane>
                </>
              )}
            </Tabs>
          </ShadowPaper>
        </div>

        <div className="editButtonWrap extraActionButton">
          <Button
            className="title-cancel-btn"
            onClick={() => navigate(-1)}
            disabled={isPending || isEditPending}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            shape="round"
            htmlType="submit"
            className="title-btn"
            loading={isPending || isEditPending}
            icon={!id && <PlusOutlined />}
            disabled={isPending || isLoading || isEditPending || phoneLoading}
          >
            {id ? 'Save' : 'Add / Save'}
          </Button>
        </div>
      </Form>
      {isModalOpen && (
        <CommonModal
          open={isModalOpen}
          closeIcon={true}
          closable={true}
          centered={true}
          maskClosable={false}
          className="changePasswordModal"
          title={
            <div className="modalTitleWrapper">
              <span className="main-title">Password Setup Link</span>
            </div>
          }
          onCancel={() => {
            setIsModalOpen(false);
            navigate(-1);
          }}
        >
          <p>
            A password setup link has been generated. Please copy the link below and share it with
            the user so they can create their password.
          </p>
          <div className="modalFooter">
            <Button type="primary" className="footerBtn" onClick={() => openAndCopyHtml()}>
              Copy
            </Button>
          </div>
        </CommonModal>
      )}
    </Wrapper>
  );
};

export default UserAddEditForm;
