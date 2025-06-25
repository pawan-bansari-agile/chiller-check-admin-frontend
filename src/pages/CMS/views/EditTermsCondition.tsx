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

const EditTermsCondition: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data, isLoading } = cmsHooks.useCmsList(CMS_TYPE.TERMS_CONDITION);
  const { mutate: updateCms, isPending } = cmsHooks.useUpdateCms();

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (data) {
      setValue(data?.description);
      form.setFieldValue('termsAndCond', data?.description);
    }
  }, [data, form]);

  const handleEditorChange = (_: any, editor: any) => {
    const content = editor.getData();

    if (content.trim() === '') {
      form.setFieldsValue({ ['termsAndCond']: null });
    } else {
      form.setFieldsValue({ ['termsAndCond']: content });
    }
  };

  const onSubmit = (values: { termsAndCond: string }) => {
    const payload = {
      title: CMS_TYPE.TERMS_CONDITION,
      value: values.termsAndCond
    };
    updateCms(payload, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: cmsQueryKey.all });
        showToaster('success', data?.message);
        navigate(ROUTES.TERMS_CONDITION);
      },
      onError: (error: IApiError) => {
        showToaster('error', error?.message);
      }
    });
  };

  return (
    <Wrapper>
      <Meta title="Terms & Conditions" />
      {isLoading && <Loader />}
      <HeaderToolbar title="Terms & Conditions" backBtn={true} />
      <ShadowPaper>
        <Form className="cmsCard" form={form} onFinish={onSubmit}>
          <Row>
            <Col className="buttonCol">
              <Button
                type="primary"
                htmlType="submit"
                loading={isPending}
                disabled={isPending}
                className="title-btn savBtn"
              >
                Save
              </Button>
            </Col>
            <Col xs={24}>
              <CKEditorFormItem
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name={'termsAndCond'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter terms and conditions.'
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

export default EditTermsCondition;
