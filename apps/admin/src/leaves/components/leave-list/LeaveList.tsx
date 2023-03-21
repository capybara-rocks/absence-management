import { DataGrid, DataGridColumn } from '@absence-management/ui';
import { useGetLeaves } from '../../api-hooks';
import { Leave } from '../../types';
import LeaveDetails from '../leave-details/LeaveDetails';
import { statusNumToString } from '@/api/helper/leaves';

export function LeaveList() {
  const { data, isLoading } = useGetLeaves();
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
    { field: 'user', headerName: 'User', value: (leave) => leave.user.name },
    {
      field: 'approvedBy',
      headerName: 'Approved By',
      value: (leave) => leave.approvedBy?.name || '',
    },
  ];

  if (isLoading) return <div>Loading...</div>;

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
