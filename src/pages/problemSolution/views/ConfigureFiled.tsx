import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { AuditOutlined, ClockCircleOutlined, FileOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row } from 'antd';
import dayjs from 'dayjs';

import { problemSolutionHooks, problemSolutionQueryKeys } from '@/services/problemSolution';

import CardWithTitle from '@/shared/components/common/CardWithTitle';
import Details from '@/shared/components/common/Details';
import { CKEditorFormItem } from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { ROUTES } from '@/shared/constants/routes';
import { User } from '@/shared/svg';
import { IApiError } from '@/shared/types';
import { showToaster } from '@/shared/utils/functions';

import { Wrapper } from '../style';

const ConfigureFiled: React.FC = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = problemSolutionHooks.GetProblemSolutionDetail(id ?? '');
  const { mutate: editProblemSolutionMutate, isPending } =
    problemSolutionHooks.useEditProblemSolution();

  const [editorValues, setEditorValues] = useState({
    problem: '',
    solution: ''
  });

  useEffect(() => {
    if (data) {
      setEditorValues({
        problem: data?.problem || '',
        solution: data?.solution || ''
      });
      form.setFieldsValue({
        WriteProblem: data?.problem ?? '',
        WriteSolution: data?.solution ?? ''
      });
    }
  }, [data, form]);

  const handleEditorChange = (_: any, editor: any, field: string) => {
    const content = editor.getData();

    if (content.trim() === '') {
      form.setFieldsValue({ [field]: null });
    } else {
      setEditorValues((prev) => ({
        ...prev,
        [field]: content
      }));
      form.setFieldsValue({ [field]: content });
    }
  };

  const handleSubmit = (value: any) => {
    if (!id) {
      return;
    }
    const payload = {
      id,
      WriteProblem: value?.WriteProblem,
      WriteSolution: value?.WriteSolution
    };
    editProblemSolutionMutate(payload, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: problemSolutionQueryKeys.all });
        showToaster('success', res?.message);
        navigate(ROUTES.PROBLEM_SOLUTION);
      },
      onError: (err: IApiError) => {
        const errorMsg = err?.message || err?.message?.[0] || 'Something went wrong';
        showToaster('error', errorMsg);
      }
    });
  };

  return (
    <Wrapper>
      <Form form={form} onFinish={handleSubmit}>
        <div className="cardWrap">
          <Meta title="Configure Field" />
          {isLoading && <Loader />}
          <HeaderToolbar
            title="Configure Field"
            className="configuredHeader"
            backBtn={true}
            button={
              <div className="viewButtonWrap">
                <Button
                  onClick={() => navigate(-1)}
                  className="title-cancel-btn"
                  disabled={isPending || isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="title-btn"
                  shape="round"
                  loading={isPending}
                  disabled={isPending || isLoading}
                >
                  Save
                </Button>
              </div>
            }
          />
          <div className="shadowWrap">
            <ShadowPaper>
              <ul className="configureLists">
                <Details
                  detailsIcon={<AuditOutlined />}
                  detailsTitle="Field Module"
                  detailsDescription={data?.section}
                />
                <Details
                  detailsIcon={<FileOutlined />}
                  detailsTitle="Field Name"
                  detailsDescription={data?.field}
                />
                <Details
                  detailsIcon={<User />}
                  detailsTitle="Updated By"
                  detailsDescription={data?.updated_by ? data?.updated_by : '-'}
                />
                <Details
                  detailsIcon={<ClockCircleOutlined />}
                  detailsTitle="Updated At"
                  detailsDescription={dayjs(data?.updatedAt).format('MM/DD/YY HH:mm')}
                />
              </ul>
            </ShadowPaper>
            <Row gutter={[20, 20]}>
              <Col xs={24} sm={24} md={12} lg={12}>
                <CardWithTitle title="Problem" className="psCard">
                  <CKEditorFormItem
                    label="Write Problem"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name={'WriteProblem'}
                    rules={[
                      {
                        required: true,
                        message: 'Please write the problem.'
                      }
                    ]}
                    data={editorValues?.problem}
                    required={true}
                    onChange={(e: any, editor: any) =>
                      handleEditorChange(e, editor, 'WriteProblem')
                    }
                  />
                </CardWithTitle>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <CardWithTitle title="Solution" className="psCard">
                  <CKEditorFormItem
                    label="Write Solution"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name={'WriteSolution'}
                    rules={[
                      {
                        required: true,
                        message: 'Please write a solution to the problem.'
                      }
                    ]}
                    data={editorValues?.solution}
                    required={true}
                    onChange={(e: any, editor: any) =>
                      handleEditorChange(e, editor, 'WriteSolution')
                    }
                  />
                </CardWithTitle>
              </Col>
            </Row>

            <div className="viewButtonWrap extraActionButton">
              <Button
                onClick={() => navigate(-1)}
                className="title-cancel-btn"
                disabled={isPending || isLoading}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="title-btn"
                shape="round"
                loading={isPending}
                disabled={isPending || isLoading}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </Wrapper>
  );
};

export default ConfigureFiled;
