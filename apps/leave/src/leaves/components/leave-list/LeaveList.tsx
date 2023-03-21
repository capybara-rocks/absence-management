import { Leave } from '../../types';
import LeaveItem from '../leave-item/LeaveItem';

export function LeaveList() {
  const leaves: Leave[] = [];

  if (!leaves || leaves.length === 0) return <div>No leaves found.</div>;

  return (
    <div className="mx-auto mb-8 grid max-w-5xl rounded-lg border border-gray-200 shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
      {leaves?.map((leave) => (
        <LeaveItem key={leave.id} {...leave}></LeaveItem>
      ))}
    </div>
  );
}

export default LeaveList;
