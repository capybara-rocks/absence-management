import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { Navbar, Notification } from '@absence-management/ui';
import logo from '@/leave/assets/images/logo.png';
import {
  AuthMenu,
  ProtectedResource,
  useRefreshToken,
} from '@absence-management/auth';

export interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useRefreshToken();

  return (
    <>
      <Navbar>
        <Navbar.Navbrand image={logo} alt="Leave Management"></Navbar.Navbrand>
        <Navbar.NavItem to="/leaves">Leaves</Navbar.NavItem>
        <AuthMenu
          profilePath="/auth/profile"
          loginPath="/auth/sign-in"
          registerPath="/auth/sign-up"
        ></AuthMenu>
        <ProtectedResource>
          <Notification></Notification>
        </ProtectedResource>
      </Navbar>
      <main className="p-4">
        {children}
        <Toaster />
      </main>
    </>
  );
}

export default Layout;
