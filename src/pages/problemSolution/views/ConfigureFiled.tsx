import React, { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { AuditOutlined, ClockCircleOutlined, FileOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row } from 'antd';
import dayjs from 'dayjs';

import { problemSolutionHooks, problemSolutionQueryKeys } from '@/services/problemSolution';

import CardWithTitle from '@/shared/components/common/CardWithTitle';
import Details from '@/shared/components/common/Details';
import { RenderTextAreaInput } from '@/shared/components/common/FormField';
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

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        WriteProblem: data?.problem ?? '',
        WriteSolution: data?.solution ?? ''
      });
    }
  }, [data, form]);

  const handleSubmit = (value: any) => {
    console.log(value);
    if (!id) {
      return;
    }
    const payload = {
      id,
      WriteProblem: value?.WriteProblem?.trim(),
      WriteSolution: value?.WriteSolution?.trim()
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
                  <RenderTextAreaInput
                    label="Write problem"
                    formItemProps={{
                      name: 'WriteProblem',
                      label: 'Write problem',
                      rules: [
                        { required: true, message: 'Please write the problem.' },
                        {
                          validator: (_, value) => {
                            if (value && value.trim() === '') {
                              return Promise.reject(new Error('Please write the valid problem.'));
                            }
                            return Promise.resolve();
                          }
                        }
                      ]
                    }}
                    inputProps={{
                      placeholder: 'Enter Problem',
                      autoSize: { minRows: 9, maxRows: 6 }
                    }}
                  />
                </CardWithTitle>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <CardWithTitle title="Solution" className="psCard">
                  <RenderTextAreaInput
                    label="Write Solution"
                    formItemProps={{
                      name: 'WriteSolution',
                      label: 'Write Solution',
                      rules: [
                        { required: true, message: 'Please write a solution to the problem.' },
                        {
                          validator: (_, value) => {
                            if (value && value.trim() === '') {
                              return Promise.reject(
                                new Error('Please write a valid solution to the problem.')
                              );
                            }
                            return Promise.resolve();
                          }
                        }
                      ]
                    }}
                    inputProps={{
                      placeholder: 'Enter Solution',
                      autoSize: { minRows: 9, maxRows: 6 }
                    }}
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
