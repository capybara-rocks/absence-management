import { Badge, Dialog } from '@absence-management/ui';
import { avatarUrl } from '@absence-management/auth';
import avatarImage from '../../../../../../libs/auth/src/assets/images/avatar.jpg';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { Leave, Status } from '../../types';
import { useState } from 'react';
import * as api from '../../api';
import toast from 'react-hot-toast';
import { useGetLeaves } from '../../api-hooks';
import { statusNumToString } from '@/api/helper/leaves';

const statusColor = (status: Leave['status']) => {
  switch (status) {
    case Status.Pending:
      return 'info';
    case Status.Approved:
      return 'success';
    case Status.Rejected:
      return 'danger';
  }
};

export function LeaveItem({
  id,
  status,
  leaveDate,
  reason,
  approvedBy,
}: Leave) {
  const { mutate } = useGetLeaves();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);

  const deleteLeave = async () => {
    await api.deleteLeave(id);
    mutate(
      (leaves) => {
        if (!leaves) return leaves;

        return leaves.filter((l) => l.id !== id);
      },
      { revalidate: false }
    );
    toast.success('You leave has already been deleted.');
    closeDeleteDialog();
  };

  return (
    <>
      <figure
        key={id}
        className="flex flex-col items-center rounded-t-lg border-b border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800 md:rounded-t-none md:rounded-tl-lg md:border-r"
      >
        <div className="mb-4 flex w-full justify-between border-b-[1px] pb-4">
          <Badge color={statusColor(status)}>{statusNumToString(status)}</Badge>
          {status === Status.Pending && (
            <>
              <Link to={`/leaves/${id}/edit`} className="ml-auto">
                <PencilSquareIcon className="text-default-500 mr-2  h-5 w-5"></PencilSquareIcon>
              </Link>
              <TrashIcon
                className="text-default-500 mr-2 h-5 w-5 cursor-pointer"
                onClick={openDeleteDialog}
              ></TrashIcon>
            </>
          )}
        </div>
        <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400 lg:mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {new Date(leaveDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </h3>
          <p className="my-4 font-light">{reason}</p>
        </blockquote>
        {approvedBy && (
          <figcaption className="flex items-center justify-center space-x-3">
            <img
              className="h-9 w-9 rounded-full"
              src={
                approvedBy.avatar ? avatarUrl(approvedBy.avatar) : avatarImage
              }
              alt="profile"
            ></img>
            <div className="space-y-0.5 text-left font-medium dark:text-white">
              <div>{approvedBy.name}</div>
              <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                {status === Status.Approved ? 'Approved' : 'Rejected'} By
              </div>
            </div>
          </figcaption>
        )}
      </figure>
      <Dialog
        isOpen={isDeleteDialogOpen}
        title="Are you sure?"
        content="There is no way to undo the removing process."
        acceptTitle="Delete"
        rejectTitle="Cancel"
        onAccept={deleteLeave}
        onReject={closeDeleteDialog}
        onClose={closeDeleteDialog}
      ></Dialog>
    </>
  );
}

export default LeaveItem;
