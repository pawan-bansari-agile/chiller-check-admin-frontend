import { Suspense, lazy } from 'react';

import { Outlet } from 'react-router-dom';

import { Loader } from '../common/Loader';
import { StyledLayout } from './style';

const Header = lazy(() => import('./components/header'));
const Sidebar = lazy(() => import('./components/sidebar'));

const Layout = () => {
  return (
    <StyledLayout className="main-parent-layout">
      <Header />
      <StyledLayout className="site-layout">
        <Sidebar />
        <StyledLayout.Content>
          <div className="content-body">
            <div className="content-wrap">
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </StyledLayout.Content>
      </StyledLayout>
    </StyledLayout>
  );
};

export default Layout;
