import { Link, useNavigate } from 'react-router-dom';

import {
  BellOutlined,
  ExclamationCircleOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, MenuProps } from 'antd';

import { authApi } from '@/services/auth';

import { authStore } from '@/store/auth';

import ConfirmModal from '@/shared/components/common/Modal/components/ConfirmModal';
import { ROUTES } from '@/shared/constants/routes';
import { showToaster, toAbsoluteUrl } from '@/shared/utils/functions';

import { StyledLayout } from '../../style';

const Header = () => {
  const navigate = useNavigate();
  const { logout } = authApi;
  const { actions } = authStore((state) => state);

  const logoutAction = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      logout()
        .then((res) => {
          showToaster('success', res?.message);
          actions.authFail();
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
          onClick={() => navigate(ROUTES.MY_ACCOUNT)}
        >
          My Profile
        </Button>
      ),
      icon: <UserOutlined />
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
      icon: <LockOutlined />
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
            children: 'Sign Out'
          }}
        />
      ),
      icon: <LogoutOutlined />
    }
  ];

  return (
    <StyledLayout.Header>
      <div className="header-controller-wrap">
        <div className="header-logo">
          <img src={toAbsoluteUrl('/src/assets/images/header-logo.svg')} alt="header-logo" />
        </div>
        <div className="header-right-nav">
          <Link to={ROUTES.COMING_SOON} className="notificationBellWithCount">
            <BellOutlined style={{ fontSize: '18px', color: '#040C2B' }} />
            <span className="notificationCount">1</span>
          </Link>
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            className="layout-header-dropdown"
            overlayClassName="layout-header-dropdown"
          >
            <Avatar
              size={30}
              src={'/src/assets/images/header-logo.svg'}
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
