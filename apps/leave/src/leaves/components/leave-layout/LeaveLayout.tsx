import { FloatingActionButton } from '@absence-management/ui';
import { PlusSmallIcon } from '@heroicons/react/24/outline';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export function LeaveLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const goToNewLeavePage = () => {
    navigate('/leaves/new', { replace: pathname === '/leaves/new' });
  };

  return (
    <>
      <Outlet></Outlet>
      <FloatingActionButton onClick={goToNewLeavePage}>
        <PlusSmallIcon></PlusSmallIcon>
      </FloatingActionButton>
    </>
  );
}

export default LeaveLayout;
