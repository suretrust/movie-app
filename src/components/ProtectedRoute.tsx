import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import type { ReactNode } from 'react';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loginAndRedirectLink } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={loginAndRedirectLink} replace />;
  }

  return children;
};
