import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { Navbar, Notification } from '@absence-management/ui';
import logo from '@/leave/assets/images/logo.png';

export interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar>
        <Navbar.Navbrand image={logo} alt="Leave Management"></Navbar.Navbrand>
        <Navbar.NavItem to="/leaves">Leaves</Navbar.NavItem>
        <Notification></Notification>
      </Navbar>
      <main className="p-4">
        {children}
        <Toaster />
      </main>
    </>
  );
}

export default Layout;
