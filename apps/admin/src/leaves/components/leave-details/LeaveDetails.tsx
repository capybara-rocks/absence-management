import { Button } from '@absence-management/ui';
import avatarImage from '../../../../../../libs/auth/src/assets/images/avatar.jpg';
import { useGetLeave } from '../../api-hooks';
import { Status } from '../../types';
import * as api from '../../api';
import { mutate as globalMutate } from 'swr';
import {
  avatarUrl,
  ProtectedResource,
  useAuth,
} from '@absence-management/auth';

export interface LeaveDetailsProps {
  id: number | string;
}

export function LeaveDetails({ id }: LeaveDetailsProps) {
  const { auth } = useAuth();
  const { data: leave, isLoading, mutate } = useGetLeave(id);

  const approve = async () => {
    const leave = await api.approveLeave(id);
    globalMutate(['/leaves', auth.accessToken]);
    mutate(() => leave, { revalidate: false });
  };

  const reject = async () => {
    const leave = await api.rejectLeave(id);
    globalMutate(['/leaves', auth.accessToken]);
    mutate(() => leave, { revalidate: false });
  };

  if (isLoading) return <div>Loading...</div>;
  if (!leave) return <div>No content</div>;

  const { leaveDate, reason, status, approvedBy, user } = leave;

  return (
    <div>
      <figure
        key={id}
        className="flex flex-col items-center bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800"
      >
        <img
          className="h-12 w-12 rounded-full"
          src={user.avatar ? avatarUrl(user.avatar) : avatarImage}
          alt="profile"
        ></img>
        <span className="my-2 text-gray-900">{user.name}</span>
        <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400 lg:mb-4">
          <h3 className="text-primary-500 text-lg  font-semibold dark:text-white">
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
          <figcaption className="mb-2 flex items-center justify-center space-x-3">
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
        {status === Status.Pending && (
          <ProtectedResource roles={['admin']}>
            <div className="flex space-x-2">
              <Button color="success" onClick={approve}>
                Accept
              </Button>
              <Button color="danger" onClick={reject}>
                Reject
              </Button>
            </div>
          </ProtectedResource>
        )}
      </figure>
    </div>
  );
}

export default LeaveDetails;
