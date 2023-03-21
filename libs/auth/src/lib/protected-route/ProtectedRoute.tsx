import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth-provider/hook';
import Forbidden from '../forbidden/Forbidden';
import { roleNumToString } from '../helpers';

export interface ProtectedRouteProps {
  roles?: ('admin' | 'manager' | 'member')[];
  children?: ReactElement;
}

export function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const { auth } = useAuth();

  if (!auth.isLoaded) return <div>Loading...</div>;
  if (!auth.refreshToken) {
    return <Navigate to="/auth/sign-in" replace></Navigate>;
  }
  if (roles && !roles.includes(roleNumToString(auth.user?.role))) {
    return <Forbidden></Forbidden>;
  }

  return children ? children : <Outlet></Outlet>;
}

export default ProtectedRoute;
