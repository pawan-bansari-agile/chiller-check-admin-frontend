import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { authStore } from '@/store/auth';

import { ROUTES } from '@/shared/constants/routes';

import { PrimaryLoader } from '../components/common/Loader';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();

  const { isLoggedIn } = authStore((state) => state);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isLoggedIn, navigate]);
  if (isLoggedIn) return <>{children}</>;
  else return <PrimaryLoader />;
};

export default AuthGuard;
