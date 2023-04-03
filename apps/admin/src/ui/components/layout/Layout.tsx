import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { useAuth, useRefreshToken } from '@absence-management/auth';
import Sidebar from '../sidebar/Sidebar';
import { useAuthHandler } from '@absence-management/fetcher';

export interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const handleRefreshToken = useRefreshToken();
  const { logout } = useAuth();

  useAuthHandler({
    onUnAuthorized() {
      handleRefreshToken();
    },
    onRefreshTokenExpired() {
      logout();
    },
  });

  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <main className="w-full p-4">
        {children}
        <Toaster />
      </main>
    </div>
  );
}

export default Layout;
