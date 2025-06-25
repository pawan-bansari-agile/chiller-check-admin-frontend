import React, { ChangeEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { InfoCircleOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Image, Row, Spin, Tooltip } from 'antd';

import { commonApi } from '@/services/common';
import { profileHooks, profileQueryKey } from '@/services/profile';

import { authStore } from '@/store/auth';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { IMAGE_MODULE_NAME, IMAGE_URL, PATTERNS } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { CameraIcon } from '@/shared/svg';
import {
  capitalizeFirstLetter,
  capitalizeFirstLetterWhileTyping,
  formatPhoneNumber,
  showToaster,
  toAbsoluteUrl
} from '@/shared/utils/functions';

import { Wrapper } from '../style';

// const items: TabsProps['items'] = [
//   {
//     key: '1',
//     label: 'Permission',
//     children: <PermissionTab />
//   }
// ];

interface IFormReq {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userRole: string;
}

const EditAccount: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { userData, actions } = authStore((state) => state);
  const [form] = Form.useForm();
  const { data, isLoading } = profileHooks.useProfile(userData?._id ?? '');
  const { mutate: updateProfileAction, isPending } = profileHooks.useUpdateProfile();

  const [imageShow, setImageShow] = useState<string>('');
  const [imageName, setImageName] = useState<string>('');

  const [imageLoader, setImageLoader] = useState<boolean>(false);

  useEffect(() => {
    if (!form || !data) return;

    const {
      firstName = '',
      lastName = '',
      email = '',
      phoneNumber = '',
      role = '',
      profileImage
    } = data;
    setImageName(profileImage || '');
    const imgUrl = profileImage
      ? `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${profileImage || ''}`
      : '';
    setImageShow(imgUrl);

    form.setFieldsValue({
      firstName,
      lastName,
      email,
      phoneNumber: formatPhoneNumber(phoneNumber),
      userRole: capitalizeFirstLetter(role)
    });
  }, [data, form]);

  const onSubmit = (values: IFormReq) => {
    const updateProfilePayload = {
      firstName: values?.firstName?.trim(),
      lastName: values?.lastName?.trim(),
      phoneNumber: data?.phoneNumber || '',
      role: data?.role || '',
      profileImage: imageName || ''
    };
    const payload = {
      id: data?._id || '',
      updatePayload: updateProfilePayload
    };
    updateProfileAction(payload, {
      onSuccess: (res) => {
        const { message } = res || {};
        showToaster('success', message || '');
        queryClient.invalidateQueries({ queryKey: profileQueryKey.all });
        navigate(ROUTES.MY_PROFILE);
        actions.authSuccess({ data: { ...userData, profileImage: imageName } });
      },
      onError: (err) => {
        const errorMsg = err?.message || err?.message?.[0] || 'Something went wrong';
        showToaster('error', errorMsg);
      }
    });
  };

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

  return (
    <Wrapper>
      <Meta title="My Profile" />
      {isLoading && <Loader />}
      <HeaderToolbar
        title="Edit User"
        backBtn={true}
        button={
          <div className="editButtonWrap">
            <Button
              type="primary"
              onClick={() => form.submit()}
              className="title-btn"
              shape="round"
              loading={isPending}
              disabled={isPending}
            >
              Save
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
            <div className="addProfilePic">
              <div className="pictureLabel">
                <label>Profile Pic</label>
                <Tooltip
                  color="#000ABC"
                  title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                >
                  <InfoCircleOutlined style={{ color: '#000ABC' }} />
                </Tooltip>
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
              <h4 className="removeImg" onClick={removeImage}>
                Remove Image
              </h4>
            </div>
            <div className="profileForm">
              <Form form={form} onFinish={onSubmit} autoComplete="off" disabled={isPending}>
                <Row gutter={[20, 25]}>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <RenderTextInput
                      label="First Name"
                      tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
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
                        maxLength: 50,
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
                      tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
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
                        maxLength: 50,
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
                      tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                      required
                      formItemProps={{
                        name: 'email'
                      }}
                      inputProps={{
                        placeholder: 'Enter Email',
                        disabled: true
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <RenderTextInput
                      label="Phone number"
                      tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                      required
                      colClassName="userMobileInput"
                      formItemProps={{
                        name: 'phoneNumber'
                      }}
                      inputProps={{
                        placeholder: 'Enter Phone Number',
                        disabled: true
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8}>
                    <RenderSelect
                      label="User Roles"
                      colClassName="custom-select-col"
                      formItemProps={{
                        name: 'userRole'
                      }}
                      inputProps={{
                        placeholder: 'Select User Role',
                        disabled: true
                      }}
                    />
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </ShadowPaper>
        {/* <ShadowPaper>
          <Tabs defaultActiveKey="1" items={items} className="userTab" />
        </ShadowPaper> */}
      </div>
    </Wrapper>
  );
};

export default EditAccount;
