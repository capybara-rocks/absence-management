import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { useRefreshToken } from '@absence-management/auth';
import Sidebar from '../sidebar/Sidebar';

export interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useRefreshToken();

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
