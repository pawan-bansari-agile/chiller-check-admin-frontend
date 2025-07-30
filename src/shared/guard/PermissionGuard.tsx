import { Navigate } from 'react-router-dom';

import { authStore } from '@/store/auth';

import { USER_ROLES } from '../constants';
import { ROUTES } from '../constants/routes';

interface PermissionGuardProps {
  permissionKey: string;
  action: 'view' | 'add' | 'edit' | 'toggleStatus';
  permissions: Record<
    string,
    { view?: boolean; add?: boolean; edit?: boolean; toggleStatus?: boolean }
  >;
  children?: any;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permissionKey,
  action,
  permissions,
  children
}) => {
  const { userData } = authStore((state) => state);
  const hasPermission =
    userData?.role === USER_ROLES.ADMIN || permissions?.[permissionKey]?.[action];

  return hasPermission ? children : <Navigate to={ROUTES.PAGE_NOT_FOUND} replace />;
};

export default PermissionGuard;
