import { useEffect, useMemo, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import {
  AimOutlined,
  BarChartOutlined,
  DashboardOutlined,
  ProfileOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Menu, Tooltip } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';

import { authStore } from '@/store/auth';

import { CONTACT_LINK, PRIVACY_LINK, TERMS_LINK, USER_ROLES } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { User } from '@/shared/svg';

import { StyledLayout } from '../../style';

interface ItemProps {
  link: string;
  label: string;
  key: string;
  icon?: React.ReactNode;
  children?: ItemProps[];
  type?: 'item' | 'submenu';
  roles?: string[]; // NEW: specify roles that can access this item
  permissionKey?: string;
}

function createMenuItem(
  link: string,
  label: any,
  key: string,
  icon?: React.ReactNode,
  children?: ItemProps[],
  type?: 'item' | 'submenu',
  roles?: string[],
  permissionKey?: string
) {
  return {
    link,
    key,
    icon,
    children,
    label:
      typeof label === 'string' ? (
        <Tooltip zIndex={99999} title={label} placement="left">
          <span>{label}</span>
        </Tooltip>
      ) : (
        label
      ),
    type,
    roles,
    permissionKey
  };
}

const items = [
  createMenuItem(ROUTES.DASHBOARD, 'Dashboard', '1', <BarChartOutlined />, undefined, 'item', [
    USER_ROLES.ADMIN,
    USER_ROLES.SUB_ADMIN,
    USER_ROLES.CORPORATE_MANAGER,
    USER_ROLES.FACILITY_MANAGER,
    USER_ROLES.OPERATOR
  ]),

  createMenuItem(
    '',
    'Data In',
    '2',
    <ProfileOutlined />,
    [
      createMenuItem(
        ROUTES.ADD_LOG_ENTRY,
        'Add Log Record',
        '2-1',
        undefined,
        undefined,
        'item',
        [
          USER_ROLES.ADMIN,
          USER_ROLES.SUB_ADMIN,
          USER_ROLES.CORPORATE_MANAGER,
          USER_ROLES.FACILITY_MANAGER,
          USER_ROLES.OPERATOR
        ],
        'log'
      ),
      createMenuItem(
        ROUTES.ADD_MAINTENANCE,
        'Add Maintenance Record',
        '2-2',
        undefined,
        undefined,
        'item',
        [
          USER_ROLES.ADMIN,
          USER_ROLES.SUB_ADMIN,
          USER_ROLES.CORPORATE_MANAGER,
          USER_ROLES.FACILITY_MANAGER,
          USER_ROLES.OPERATOR
        ],
        'maintenance'
      )
    ],
    'submenu',
    [
      USER_ROLES.ADMIN,
      USER_ROLES.SUB_ADMIN,
      USER_ROLES.CORPORATE_MANAGER,
      USER_ROLES.FACILITY_MANAGER,
      USER_ROLES.OPERATOR
    ]
  ),

  createMenuItem(
    '',
    'Info Out',
    '3',
    <DashboardOutlined />,
    [
      // createMenuItem(
      //   ROUTES.LOG_ENTRY,
      //   'Recent Readings',
      //   '3-3',
      //   undefined,
      //   undefined,
      //   'item',
      //   [
      //     USER_ROLES.ADMIN,
      //     USER_ROLES.SUB_ADMIN,
      //     USER_ROLES.CORPORATE_MANAGER,
      //     USER_ROLES.FACILITY_MANAGER,
      //     USER_ROLES.OPERATOR
      //   ],
      //   'log'
      // ),
      createMenuItem(
        ROUTES.CHILLER_MANAGEMENT,
        'Chillers',
        '3-2',
        undefined,
        undefined,
        'item',
        [
          USER_ROLES.ADMIN,
          USER_ROLES.SUB_ADMIN,
          USER_ROLES.CORPORATE_MANAGER,
          USER_ROLES.FACILITY_MANAGER,
          USER_ROLES.OPERATOR
        ],
        'chiller'
      ),
      createMenuItem(
        ROUTES.REPORT,
        'Reports',
        '3-1',
        undefined,
        undefined,
        'item',
        [
          USER_ROLES.ADMIN,
          USER_ROLES.SUB_ADMIN,
          USER_ROLES.CORPORATE_MANAGER,
          USER_ROLES.FACILITY_MANAGER,
          USER_ROLES.OPERATOR
        ],
        'report'
      )
    ],
    'submenu',
    [
      USER_ROLES.ADMIN,
      USER_ROLES.SUB_ADMIN,
      USER_ROLES.CORPORATE_MANAGER,
      USER_ROLES.FACILITY_MANAGER,
      USER_ROLES.OPERATOR
    ]
  ),

  createMenuItem(
    '',
    'Assets',
    '4',
    <AimOutlined />,
    [
      createMenuItem(
        ROUTES.USER_MANAGEMENT,
        'Users',
        '4-4',
        undefined,
        undefined,
        'item',
        [
          USER_ROLES.ADMIN,
          USER_ROLES.SUB_ADMIN,
          USER_ROLES.CORPORATE_MANAGER,
          USER_ROLES.FACILITY_MANAGER
        ],
        'users'
      ),
      createMenuItem(
        ROUTES.CHILLER_MANAGEMENT,
        'Chillers',
        '4-3',
        undefined,
        undefined,
        'item',
        [
          USER_ROLES.ADMIN,
          USER_ROLES.SUB_ADMIN,
          USER_ROLES.CORPORATE_MANAGER,
          USER_ROLES.FACILITY_MANAGER,
          USER_ROLES.OPERATOR
        ],
        'chiller'
      ),
      createMenuItem(
        ROUTES.FACILITY_MANAGEMENT,
        'Facilities',
        '4-2',
        undefined,
        undefined,
        'item',
        [USER_ROLES.ADMIN, USER_ROLES.SUB_ADMIN, USER_ROLES.CORPORATE_MANAGER],
        'facility'
      ),
      createMenuItem(
        ROUTES.COMPANY_MANAGEMENT,
        'Companies',
        '4-1',
        undefined,
        undefined,
        'item',
        [USER_ROLES.ADMIN, USER_ROLES.SUB_ADMIN],
        'company'
      )
    ],
    'submenu',
    [USER_ROLES.CORPORATE_MANAGER, USER_ROLES.FACILITY_MANAGER, USER_ROLES.OPERATOR]
  ),

  createMenuItem(
    '',
    'Admin',
    '5',
    <span className="anticon">
      <User />
    </span>,
    [
      createMenuItem(
        ROUTES.USER_MANAGEMENT,
        'User Management',
        '5-4',
        undefined,
        undefined,
        'item',
        [
          USER_ROLES.ADMIN,
          USER_ROLES.SUB_ADMIN,
          USER_ROLES.CORPORATE_MANAGER,
          USER_ROLES.FACILITY_MANAGER
        ],
        'users'
      ),
      createMenuItem(
        ROUTES.CHILLER_MANAGEMENT,
        'Chiller Management',
        '5-3',
        undefined,
        undefined,
        'item',
        [
          USER_ROLES.ADMIN,
          USER_ROLES.SUB_ADMIN,
          USER_ROLES.CORPORATE_MANAGER,
          USER_ROLES.FACILITY_MANAGER
        ],
        'chiller'
      ),
      createMenuItem(
        ROUTES.FACILITY_MANAGEMENT,
        'Facility Management',
        '5-2',
        undefined,
        undefined,
        'item',
        [USER_ROLES.ADMIN, USER_ROLES.SUB_ADMIN, USER_ROLES.CORPORATE_MANAGER],
        'facility'
      ),
      createMenuItem(
        ROUTES.COMPANY_MANAGEMENT,
        'Company Management',
        '5-1',
        undefined,
        undefined,
        'item',
        [USER_ROLES.ADMIN, USER_ROLES.SUB_ADMIN],
        'company'
      )
    ],
    'submenu',
    [USER_ROLES.ADMIN, USER_ROLES.SUB_ADMIN]
  ),

  createMenuItem(
    '',
    'Settings',
    '6',
    <SettingOutlined />,
    [
      createMenuItem(
        ROUTES.PROBLEM_SOLUTION,
        'Problems & Solutions',
        '6-3',
        undefined,
        undefined,
        'item',
        [USER_ROLES.ADMIN, USER_ROLES.SUB_ADMIN],
        'setting'
      ),
      createMenuItem(
        '',
        <a href={TERMS_LINK} target="_blank">
          Terms & Conditions
        </a>,
        '6-1',
        undefined,
        undefined,
        'item',
        [
          USER_ROLES.ADMIN,
          USER_ROLES.SUB_ADMIN,
          USER_ROLES.CORPORATE_MANAGER,
          USER_ROLES.FACILITY_MANAGER,
          USER_ROLES.OPERATOR
        ]
      ),
      createMenuItem(
        '',
        <a href={PRIVACY_LINK} target="_blank">
          Privacy Policy
        </a>,
        '6-2',
        undefined,
        undefined,
        'item',
        [
          USER_ROLES.ADMIN,
          USER_ROLES.SUB_ADMIN,
          USER_ROLES.CORPORATE_MANAGER,
          USER_ROLES.FACILITY_MANAGER,
          USER_ROLES.OPERATOR
        ]
      ),
      createMenuItem(
        '',
        <a href={CONTACT_LINK} target="_blank">
          Contact Us
        </a>,
        '6-4',
        undefined,
        undefined,
        'item',
        [
          USER_ROLES.ADMIN,
          USER_ROLES.SUB_ADMIN,
          USER_ROLES.CORPORATE_MANAGER,
          USER_ROLES.FACILITY_MANAGER,
          USER_ROLES.OPERATOR
        ]
      )
    ],
    'submenu',
    [
      USER_ROLES.ADMIN,
      USER_ROLES.SUB_ADMIN,
      USER_ROLES.CORPORATE_MANAGER,
      USER_ROLES.FACILITY_MANAGER,
      USER_ROLES.OPERATOR
    ]
  )
];

function filterItemsByRole(
  items: ItemProps[],
  role: string,
  permissions?: Record<string, { view: boolean }>
): ItemProps[] {
  return items
    .map((item) => {
      const hasRole = !item.roles || item.roles.includes(role);

      // If item has a permissionKey, check its `view` permission
      const isChillerForOperator = role === USER_ROLES.OPERATOR && item.permissionKey === 'chiller';
      const hasPermission =
        !item.permissionKey ||
        isChillerForOperator ||
        permissions?.[item.permissionKey]?.view === true;

      if (!hasRole || (permissions && !hasPermission)) return null;

      // If item has children, filter them recursively
      if (item.children) {
        const filteredChildren = filterItemsByRole(item.children, role, permissions);
        if (filteredChildren.length === 0) return null;
        return { ...item, children: filteredChildren };
      }

      return item;
    })
    .filter(Boolean) as ItemProps[];
}

// function findActiveKeys(
//   items: ItemProps[],
//   currentPath: string,
//   preferredKey?: string
// ): { selectedKey: string; openKey?: string } {
//   // Step 1: Look for preferredKey
//   for (const item of items) {
//     if (item.children?.length) {
//       for (const child of item.children) {
//         const isMatch = currentPath === child.link || currentPath.startsWith(child.link);
//         if (isMatch && child.key === preferredKey) {
//           return { selectedKey: child.key, openKey: item.key };
//         }
//       }
//     } else if (item.link === currentPath && item.key === preferredKey) {
//       return { selectedKey: item.key };
//     }
//   }

//   // Step 2: Fallback to first match
//   for (const item of items) {
//     if (item.children?.length) {
//       const childMatch = item.children.find(
//         (child) => currentPath === child.link || currentPath.startsWith(child.link)
//       );
//       if (childMatch) return { selectedKey: childMatch.key, openKey: item.key };
//     } else if (item.link === currentPath) {
//       return { selectedKey: item.key };
//     }
//   }

//   return { selectedKey: '1' }; // fallback
// }

function findActiveKeys(
  items: ItemProps[],
  currentPath: string,
  preferredKey?: string
): { selectedKey: string; openKey?: string } {
  // Step 1: Look for preferredKey (exact match only)
  for (const item of items) {
    if (item.children?.length) {
      for (const child of item.children) {
        if (child.link === currentPath && child.key === preferredKey) {
          return { selectedKey: child.key, openKey: item.key };
        }
      }
    } else if (item.link === currentPath && item.key === preferredKey) {
      return { selectedKey: item.key };
    }
  }

  // Step 2: Fallback to match (exact > startsWith, ignore external links)
  for (const item of items) {
    if (item.children?.length) {
      const childMatch = item.children.find(
        (child) =>
          child.link &&
          !child.link.startsWith('http') &&
          (currentPath === child.link || currentPath.startsWith(child.link))
      );
      if (childMatch) return { selectedKey: childMatch.key, openKey: item.key };
    } else if (
      item.link &&
      !item.link.startsWith('http') &&
      (currentPath === item.link || currentPath.startsWith(item.link))
    ) {
      return { selectedKey: item.key };
    }
  }

  return { selectedKey: localStorage.getItem('selectedSidebarKey') || '1' }; // fallback
}

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = authStore((state) => state);
  const { permissions } = userData;

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeyState, setSelectedKeyState] = useState<string>('1');

  const filteredItems = useMemo(
    () =>
      filterItemsByRole(
        items,
        userData?.role,
        permissions && Object.keys(permissions)?.length ? permissions : null
      ),
    [userData?.role, permissions]
  );

  // Set selected key based on current location
  useEffect(() => {
    const preferredKey = localStorage.getItem('selectedSidebarKey') || '';
    const { selectedKey } = findActiveKeys(filteredItems, location.pathname, preferredKey);
    setSelectedKeyState(selectedKey);
  }, [location.pathname, filteredItems]);

  // Open submenu on sidebar hover
  const handleSidebarMouseEnter = () => {
    // if (openKeys.length === 0) {
    const preferredKey = localStorage.getItem('selectedSidebarKey') || '';
    const { openKey } = findActiveKeys(filteredItems, location.pathname, preferredKey);
    if (openKey) setOpenKeys([openKey]);
    // }
  };

  const handleSidebarMouseLeave = () => {
    setOpenKeys([]);
  };

  // Add onTitleMouseEnter to submenu items so they open on hover
  const enhancedItems = filteredItems.map((item) =>
    item.children
      ? {
          ...item,
          onTitleMouseEnter: () => {
            const key = item.key.toString();
            setOpenKeys((prev) => (prev.includes(key) ? prev : [...prev, key]));
          }
        }
      : item
  );

  return (
    <StyledLayout.Sider
      onMouseEnter={handleSidebarMouseEnter}
      onMouseLeave={handleSidebarMouseLeave}
      width={238}
      collapsedWidth={60}
      className="hover-expand-sidebar"
    >
      <div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKeyState]}
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys as string[])}
          onClick={({ key, item }: any) => {
            const link = item.props.link;
            setSelectedKeyState(key);
            localStorage.setItem('selectedSidebarKey', key);
            if (link) navigate(link);
            setOpenKeys([]);
          }}
          items={enhancedItems as ItemType<MenuItemType>[]}
        />
      </div>
    </StyledLayout.Sider>
  );
};

export default Sidebar;
