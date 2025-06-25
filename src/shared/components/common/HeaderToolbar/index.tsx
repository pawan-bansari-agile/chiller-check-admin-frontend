import React from 'react';

import { useNavigate } from 'react-router-dom';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';

import { Wrapper } from './style';

interface IHeaderToolbarProps {
  title?: string;
  button?: React.ReactNode;
  backBtn?: boolean;
  backTo?: string;
}

const HeaderToolbar: React.FC<IHeaderToolbarProps> = (props) => {
  const { title, button, backBtn, backTo } = props;
  const navigate = useNavigate();

  return (
    <Wrapper className="header-toolbar-wrap">
      <Row align="middle" justify="space-between" gutter={[10, 6]} className="main-row">
        {(title || button) && (
          <Col xs={24}>
            <Row justify={'space-between'} align={'middle'} className="sub-row">
              {title && (
                <Col className={`title-wrap ${backBtn ? 'title-with-cta' : ''}`}>
                  {backBtn && (
                    <Button
                      className="headerBackBtn"
                      type="text"
                      icon={<ArrowLeftOutlined />}
                      onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
                    />
                  )}
                  <Typography.Title level={4} className="page-title" title={title}>
                    {title}
                  </Typography.Title>
                </Col>
              )}
              {button && <Col className="cta-wrap">{button}</Col>}
            </Row>
          </Col>
        )}
      </Row>
    </Wrapper>
  );
};

export default HeaderToolbar;
