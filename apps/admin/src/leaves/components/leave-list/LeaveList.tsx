import { DataGrid, DataGridColumn } from '@absence-management/ui';
import { Leave } from '../../types';
import LeaveDetails from '../leave-details/LeaveDetails';
import { statusNumToString } from '@/api/helper/leaves';

export function LeaveList() {
  const data = [] as Leave[];
  const columns: DataGridColumn<Leave>[] = [
    {
      field: 'leaveDate',
      headerName: 'Leave Date',
      value: (leave) => {
        return new Date(leave.leaveDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      value: (leave) => statusNumToString(leave.status),
    },
  ];

  return (
    <DataGrid
      title="All Leave Requests"
      columns={columns}
      rows={data}
      detailsComponent={LeaveDetails}
    ></DataGrid>
  );
}

export default LeaveList;
