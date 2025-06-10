import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';

import { Wrapper } from './style';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Wrapper className="error-page">
      <picture className="error-img">
        <h1 className="animateNumber">
          <span className="number">4</span>
          <span className="number">0</span>
          <span className="number">4</span>
        </h1>
      </picture>
      <div className="error-content">
        <h3>Page not found</h3>
        <p>Sorry, the page you visited does not exist</p>
        <Button size="small" type="primary" onClick={() => navigate('/')}>
          Back Home
        </Button>
      </div>
    </Wrapper>
  );
};

export default PageNotFound;
