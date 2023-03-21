import { Button } from '@absence-management/ui';
import { Leave, Status } from '../../types';

export interface LeaveDetailsProps {
  id: number | string;
}

export function LeaveDetails({ id }: LeaveDetailsProps) {
  const leave = {} as Leave;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const approve = async () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const reject = async () => {};

  if (!leave) return <div>No content</div>;

  const { leaveDate, reason, status } = leave;

  return (
    <div>
      <figure
        key={id}
        className="flex flex-col items-center bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800"
      >
        {/* <img
          className="h-12 w-12 rounded-full"
          src={avatarImage}
          alt="profile"
        ></img> */}
        <span className="my-2 text-gray-900">Lorem</span>
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
        <figcaption className="mb-2 flex items-center justify-center space-x-3">
          {/* <img
            className="h-9 w-9 rounded-full"
            src={avatarImage}
            alt="profile"
          ></img> */}
          <div className="space-y-0.5 text-left font-medium dark:text-white">
            <div>Ipsum</div>
            <div className="text-sm font-light text-gray-500 dark:text-gray-400">
              {status === Status.Approved ? 'Approved' : 'Rejected'} By
            </div>
          </div>
        </figcaption>
        {status === Status.Pending && (
          <div className="flex space-x-2">
            <Button color="success" onClick={approve}>
              Accept
            </Button>
            <Button color="danger" onClick={reject}>
              Reject
            </Button>
          </div>
        )}
      </figure>
    </div>
  );
}

export default LeaveDetails;
