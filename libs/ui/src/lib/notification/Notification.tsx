import { BellIcon } from '@heroicons/react/24/solid';
import Navbar from '../navbar/Navbar';

export interface NotificationProps {
  items?: string[];
}

export function Notification(props: NotificationProps) {
  const toggleNotification = () => {
    alert('toggle!');
  };

  return (
    <Navbar.NavItem onClick={toggleNotification} className="relative">
      <BellIcon className="h-6 w-6"></BellIcon>
      <span className="absolute -top-1 rounded-full bg-red-700 py-0 px-1.5 text-xs text-white">
        1
      </span>
    </Navbar.NavItem>
  );
}

export default Notification;
