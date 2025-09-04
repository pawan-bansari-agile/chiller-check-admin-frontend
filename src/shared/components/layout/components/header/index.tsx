import { useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  BellOutlined,
  ExclamationCircleOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Button, Dropdown, MenuProps } from 'antd';

import { authApi } from '@/services/auth';
import { notificationApi } from '@/services/notification';

import { authStore } from '@/store/auth';
import { useNotificationStore } from '@/store/notification';

import ConfirmModal from '@/shared/components/common/Modal/components/ConfirmModal';
import { IMAGE_MODULE_NAME, IMAGE_URL } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { showToaster, toAbsoluteUrl } from '@/shared/utils/functions';

import { StyledLayout } from '../../style';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = authApi;
  const queryClient = useQueryClient();
  const { userData, actions } = authStore((state) => state);
  const count = useNotificationStore((state) => state.count);

  useEffect(() => {
    notificationApi
      .getCount()
      .then((res) => {
        useNotificationStore.getState().setCount(res?.totalUnReadNotification ?? 0);
      })
      .catch(() => {
        return;
      });
  }, [location.pathname]);

  const logoutAction = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      logout()
        .then((res) => {
          localStorage.removeItem('selectedSidebarKey');
          showToaster('success', res?.message);
          actions.authFail();
          queryClient.removeQueries();
          resolve();
        })
        .catch((err) => {
          showToaster('error', err?.message);
          reject();
        });
    });
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button
          className="cta-btn"
          type="link"
          size="small"
          block={true}
          onClick={() => navigate(ROUTES.MY_PROFILE)}
        >
          My Profile
        </Button>
      ),
      icon: <UserOutlined />,
      onClick: () => navigate(ROUTES.MY_PROFILE)
    },
    {
      key: '2',
      label: (
        <Button
          className="cta-btn"
          type="link"
          block={true}
          onClick={() => navigate(ROUTES.CHANGE_PASSWORD)}
        >
          Change Password
        </Button>
      ),
      icon: <LockOutlined />,
      onClick: () => navigate(ROUTES.CHANGE_PASSWORD)
    },
    {
      key: '3',
      label: (
        <ConfirmModal
          modalProps={{
            className: 'logoutModal',
            content: (
              <div className="logoutMessage">
                <div className="modalHeader">
                  <ExclamationCircleOutlined style={{ color: '#F04924' }} />
                  <h4>Log Out</h4>
                </div>
                <h2 className="logoutContentText">Are you sure you want to logout this account?</h2>
              </div>
            ),
            onOk: logoutAction,
            okText: 'Confirm',
            cancelText: 'Cancel'
          }}
          buttonProps={{
            className: 'cta-btn',
            type: 'link',
            block: true,
            children: 'Log Out'
          }}
          customTrigger={
            <span className="logout-icon-label">
              <i>
                <LogoutOutlined />
              </i>
              <span className="logout-label">Log Out</span>
            </span>
          }
        />
      ),
      icon: null
    }
  ];

  return (
    <StyledLayout.Header>
      <div className="header-controller-wrap">
        <div className="header-logo" onClick={() => navigate(ROUTES.DASHBOARD)}>
          <img src={toAbsoluteUrl('/icons/header-logo.svg')} alt="header-logo" />
        </div>
        <div className="header-right-nav">
          <Link to={ROUTES.NOTIFICATION} className="notificationBellWithCount">
            <BellOutlined style={{ fontSize: '18px', color: '#040C2B' }} />
            <span className="notificationCount">
              {count > 999 ? '999+' : count > 99 ? '99+' : count}
            </span>
          </Link>
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            className="layout-header-dropdown"
            overlayClassName="layout-header-dropdown"
          >
            <Avatar
              size={30}
              src={
                userData?.profileImage
                  ? `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${userData?.profileImage || ''}`
                  : '/icons/placeHolder.jpg'
              }
              className="profile-avatar"
              shape="circle"
            ></Avatar>
          </Dropdown>
        </div>
      </div>
    </StyledLayout.Header>
  );
};

export default Header;
