import { useMemo, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import {
  AimOutlined,
  BarChartOutlined,
  DashboardOutlined,
  ProfileOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';

import { ROUTES } from '@/shared/constants/routes';
import { User } from '@/shared/svg';

import { StyledLayout } from '../../style';

interface ItemProps {
  link: string;
  label: string;
  key: React.Key;
  icon?: React.ReactNode;
  children?: ItemProps[];
  type?: 'item' | 'submenu';
}

function createMenuItem(
  link: string,
  label: string,
  key: React.Key,
  icon?: React.ReactNode,
  children?: ItemProps[],
  type?: 'item' | 'submenu'
) {
  return {
    link,
    key,
    icon,
    children,
    label,
    type
  };
}

const items = [
  createMenuItem(ROUTES.COMING_SOON, 'Dashboard', '1', <BarChartOutlined />),

  createMenuItem(
    '',
    'Where',
    '2',
    <AimOutlined />,
    [
      createMenuItem(ROUTES.COMING_SOON, 'Company', '2-1', undefined, undefined, 'item'),
      createMenuItem(ROUTES.COMING_SOON, 'Facility', '2-2', undefined, undefined, 'item'),
      createMenuItem(ROUTES.COMING_SOON, 'Chillers', '2-3', undefined, undefined, 'item')
    ],
    'submenu'
  ),

  createMenuItem(
    '',
    'Info In',
    '3',
    <ProfileOutlined />,
    [
      createMenuItem(ROUTES.COMING_SOON, 'Log Entries', '3-1', undefined, undefined, 'item'),
      createMenuItem(
        ROUTES.COMING_SOON,
        'Maintainance Entries',
        '3-2',
        undefined,
        undefined,
        'item'
      )
    ],
    'submenu'
  ),

  createMenuItem(
    '',
    'Info Out',
    '4',
    <DashboardOutlined />,
    [
      createMenuItem(ROUTES.COMING_SOON, 'Saved Reports', '4-1', undefined, undefined, 'item'),
      createMenuItem(ROUTES.COMING_SOON, 'Chillers', '4-2', undefined, undefined, 'item'),
      createMenuItem(ROUTES.COMING_SOON, 'Recent Readings', '4-3', undefined, undefined, 'item')
    ],
    'submenu'
  ),

  createMenuItem(
    '',
    'Admin',
    '5',
    <User />,
    [
      createMenuItem(ROUTES.COMING_SOON, 'Company Management', '5-1', undefined, undefined, 'item'),
      createMenuItem(
        ROUTES.COMING_SOON,
        'Facility Management',
        '5-2',
        undefined,
        undefined,
        'item'
      ),
      createMenuItem(
        ROUTES.COMING_SOON,
        'Chillers Management',
        '5-3',
        undefined,
        undefined,
        'item'
      ),
      createMenuItem(ROUTES.COMING_SOON, 'User Management', '5-4', undefined, undefined, 'item')
    ],
    'submenu'
  ),

  createMenuItem(
    '',
    'Settings',
    '6',
    <SettingOutlined />,
    [
      createMenuItem(ROUTES.COMING_SOON, 'Terms & Conditions', '6-1', undefined, undefined, 'item'),
      createMenuItem(ROUTES.COMING_SOON, 'Privacy Policy', '6-2', undefined, undefined, 'item'),
      createMenuItem(
        ROUTES.COMING_SOON,
        'Problems & Solutions',
        '6-3',
        undefined,
        undefined,
        'item'
      )
    ],
    'submenu'
  )
];

function compareLinkAndReturnKey(items: any, currentPath: any): any {
  let activeLinkKey;
  for (const item of items) {
    if (item?.children && Array.isArray(item?.children) && item.children.length > 0) {
      activeLinkKey = compareLinkAndReturnKey(item.children, currentPath);
    } else if (
      item.link === currentPath ||
      item.link === currentPath.split('/').splice(0, 3).join('/')
    ) {
      activeLinkKey = item.key;
      break;
    } else {
      continue;
    }
  }
  return activeLinkKey;
}
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const activeTab = useMemo(() => {
    const activeLinkKey = compareLinkAndReturnKey(items, location?.pathname);
    if (activeLinkKey) {
      return [activeLinkKey];
    } else {
      return [
        items?.find((item) => item?.link?.split('/')[1] === location?.pathname?.split('/')[1])
          ?.key ?? '1'
      ];
    }
  }, [location.pathname]);

  return (
    <StyledLayout.Sider
      width={238}
      breakpoint="xl"
      collapsedWidth={60}
      collapsible={true}
      collapsed={isCollapsed}
      onCollapse={(c) => setIsCollapsed(c)}
    >
      <Menu
        className="sidebar-menu"
        defaultSelectedKeys={activeTab}
        mode="inline"
        onClick={({ item }: any) => navigate(item.props.link)}
        items={items as ItemType<MenuItemType>[]}
      />
    </StyledLayout.Sider>
  );
};

export default Sidebar;
