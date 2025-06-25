import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row } from 'antd';

import { cmsHooks, cmsQueryKey } from '@/services/cms';

import { CKEditorFormItem } from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CMS_TYPE } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { IApiError } from '@/shared/types';
import { showToaster } from '@/shared/utils/functions';

import { Wrapper } from '../style';

const EditPrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data, isLoading } = cmsHooks.useCmsList(CMS_TYPE.PRIVACY_POLICY);
  const { mutate: updateCms, isPending } = cmsHooks.useUpdateCms();

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (data) {
      setValue(data?.description);
      form.setFieldValue('privacyPolicy', data?.description);
    }
  }, [data, form]);

  const handleEditorChange = (_: any, editor: any) => {
    const content = editor.getData();

    if (content.trim() === '') {
      form.setFieldsValue({ ['privacyPolicy']: null });
    } else {
      form.setFieldsValue({ ['privacyPolicy']: content });
    }
  };

  const onSubmit = (values: { privacyPolicy: string }) => {
    const payload = {
      title: CMS_TYPE.PRIVACY_POLICY,
      value: values.privacyPolicy
    };
    updateCms(payload, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: cmsQueryKey.all });
        showToaster('success', data?.message);
        navigate(ROUTES.PRIVACY_POLICY);
      },
      onError: (error: IApiError) => {
        showToaster('error', error?.message);
      }
    });
  };
  return (
    <Wrapper>
      <Meta title="Privacy Policy" />
      {isLoading && <Loader />}
      <HeaderToolbar title="Privacy Policy" backBtn={true} />
      <ShadowPaper>
        <Form className="cmsCard" onFinish={onSubmit} form={form}>
          <Row>
            <Col className="buttonCol">
              <Button
                type="primary"
                htmlType="submit"
                className="title-btn savBtn"
                loading={isPending}
                disabled={isPending}
              >
                Save
              </Button>
            </Col>
            <Col xs={24}>
              <CKEditorFormItem
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name={'privacyPolicy'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter privacy policy.'
                  }
                ]}
                required={true}
                data={value || ''}
                onChange={(e: any, editor: any) => handleEditorChange(e, editor)}
              />
            </Col>
          </Row>
        </Form>
      </ShadowPaper>
    </Wrapper>
  );
};

export default EditPrivacyPolicy;
