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
  return { link, key, icon, children, label, type };
}

const items = [
  createMenuItem(ROUTES.DASHBOARD, 'Dashboard', '1', <BarChartOutlined />),

  createMenuItem(
    '',
    'Where',
    '2',
    <AimOutlined />,
    [
      createMenuItem(ROUTES.COMPANY_MANAGEMENT, 'Company', '2-1'),
      createMenuItem(ROUTES.FACILITY_MANAGEMENT, 'Facility', '2-2'),
      createMenuItem(ROUTES.CHILLER_MANAGEMENT, 'Chillers', '2-3')
    ],
    'submenu'
  ),

  createMenuItem(
    '',
    'Info In',
    '3',
    <ProfileOutlined />,
    [
      createMenuItem(ROUTES.LOG_ENTRY, 'Log Entries', '3-1'),
      createMenuItem(ROUTES.MAINTENANCE, 'Maintainance Entries', '3-2')
    ],
    'submenu'
  ),

  createMenuItem(
    '',
    'Info Out',
    '4',
    <DashboardOutlined />,
    [
      createMenuItem(ROUTES.REPORT, 'Saved Reports', '4-1'),
      createMenuItem(ROUTES.CHILLER_MANAGEMENT, 'Chillers', '4-2'),
      createMenuItem(ROUTES.LOG_ENTRY, 'Recent Readings', '4-3')
    ],
    'submenu'
  ),

  createMenuItem(
    '',
    'Admin',
    '5',
    <span className="anticon">
      <User />
    </span>,
    [
      createMenuItem(ROUTES.COMPANY_MANAGEMENT, 'Company Management', '5-1'),
      createMenuItem(ROUTES.FACILITY_MANAGEMENT, 'Facility Management', '5-2'),
      createMenuItem(ROUTES.CHILLER_MANAGEMENT, 'Chillers Management', '5-3'),
      createMenuItem(ROUTES.USER_MANAGEMENT, 'User Management', '5-4')
    ],
    'submenu'
  ),

  createMenuItem(
    '',
    'Settings',
    '6',
    <SettingOutlined />,
    [
      createMenuItem(ROUTES.TERMS_CONDITION, 'Terms & Conditions', '6-1'),
      createMenuItem(ROUTES.PRIVACY_POLICY, 'Privacy Policy', '6-2'),
      createMenuItem(ROUTES.PROBLEM_SOLUTION, 'Problems & Solutions', '6-3')
    ],
    'submenu'
  )
];

function findActiveKeys(
  items: any,
  currentPath: string
): { selectedKey: string; openKey?: string } {
  for (const item of items) {
    if (item.children?.length) {
      const childMatch = item.children.find(
        (child: any) => currentPath === child.link || currentPath.startsWith(child.link)
      );
      if (childMatch) return { selectedKey: childMatch.key, openKey: item.key };
    } else if (item.link === currentPath) {
      return { selectedKey: item.key };
    }
  }
  return { selectedKey: '1' };
}

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const { selectedKey, openKey } = useMemo(() => {
    return findActiveKeys(items, location.pathname);
  }, [location.pathname]);

  const handleSidebarMouseEnter = () => {
    setIsCollapsed(false);
    if (openKey) setOpenKeys([openKey]);
  };

  const handleSidebarMouseLeave = () => {
    setIsCollapsed(true);
    setOpenKeys([]);
  };

  const handleSubMenuHover = (key: string) => {
    if (!isCollapsed) setOpenKeys([key]);
  };

  const enhancedItems = items.map((item) =>
    item.children
      ? {
          ...item,
          onTitleMouseEnter: () => handleSubMenuHover(item.key.toString())
        }
      : item
  );

  const isParentActive = isCollapsed && openKey;

  return (
    <StyledLayout.Sider width={238} collapsedWidth={60} className="hover-expand-sidebar">
      <div onMouseEnter={handleSidebarMouseEnter} onMouseLeave={handleSidebarMouseLeave}>
        <Menu
          className={isParentActive ? `collapsed-parent-active-${openKey}` : ''}
          mode="inline"
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys as string[])}
          onClick={({ item }: any) => {
            navigate(item.props.link);
            setOpenKeys([]);
          }}
          items={enhancedItems as ItemType<MenuItemType>[]}
        />
      </div>
    </StyledLayout.Sider>
  );
};

export default Sidebar;
