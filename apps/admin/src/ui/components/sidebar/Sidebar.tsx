import logo from '@/leave/assets/images/logo.png';
import { ProtectedResource, useAuth } from '@absence-management/auth';
import {
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon,
  RectangleGroupIcon,
  UsersIcon,
  QueueListIcon,
} from '@heroicons/react/24/outline';
import { Link, NavLink, NavLinkProps } from 'react-router-dom';

const getClassName: Exclude<NavLinkProps['className'], string> = ({
  isActive,
}) => {
  const baseClass = 't group relative flex justify-center rounded px-2 py-1.5';

  return isActive ? `${baseClass} bg-blue-50 text-blue-700` : baseClass;
};

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen w-16 flex-col justify-between border-r bg-white">
      <div>
        <div className="inline-flex h-16 w-16 items-center justify-center">
          <span className="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
            <img src={logo} alt="Admin Panel" />
          </span>
        </div>

        <div className="border-t border-gray-100">
          <nav aria-label="Main Nav" className="flex flex-col p-2">
            <ProtectedResource roles={['admin', 'manager']}>
              <div className="border-b border-gray-100 py-4">
                <NavLink to="/dashboard" className={getClassName}>
                  <RectangleGroupIcon className="w-5"></RectangleGroupIcon>
                  <span className="absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                    Dashboard
                  </span>
                </NavLink>
              </div>
            </ProtectedResource>

            <ul className="space-y-1 pt-4">
              <ProtectedResource roles={['admin']}>
                <li>
                  <NavLink to="/users" className={getClassName}>
                    <UsersIcon className="w-5"></UsersIcon>
                    <span className="absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Users
                    </span>
                  </NavLink>
                </li>
              </ProtectedResource>

              <ProtectedResource roles={['admin', 'manager']}>
                <li>
                  <NavLink to="/leaves" className={getClassName}>
                    <QueueListIcon className="w-5"></QueueListIcon>
                    <span className="absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Leaves
                    </span>
                  </NavLink>
                </li>
              </ProtectedResource>
            </ul>
          </nav>
        </div>
      </div>
      <ProtectedResource>
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
          <NavLink to="/auth/profile" className={getClassName}>
            <Cog8ToothIcon className="w-5"></Cog8ToothIcon>
            <span className="absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
              Profile
            </span>
          </NavLink>
          <button
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            onClick={logout}
          >
            <ArrowRightOnRectangleIcon className="w-5"></ArrowRightOnRectangleIcon>
            <span className="absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
              Sign Out
            </span>
          </button>
        </div>
      </ProtectedResource>
    </div>
  );
}

export default Sidebar;
