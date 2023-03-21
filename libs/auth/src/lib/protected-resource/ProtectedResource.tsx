import { ReactElement } from 'react';
import { useAuth } from '../auth-provider/hook';
import { roleNumToString } from '../helpers';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';

export interface ProtectedResourceProps {
  roles?: ('admin' | 'manager' | 'member')[];
  children: ReactElement;
}

export function ProtectedResource({ roles, children }: ProtectedResourceProps) {
  const { auth } = useAuth();

  if (!auth.isLoaded)
    return (
      <MagnifyingGlassCircleIcon className="h-5 w-5 animate-ping text-gray-400"></MagnifyingGlassCircleIcon>
    );
  if (!auth.refreshToken) {
    return null;
  }
  if (roles && !roles.includes(roleNumToString(auth.user?.role))) {
    return null;
  }

  return children;
}

export default ProtectedResource;
