import * as types from '../../types';
import LeaveForm from '../leave-form/LeaveForm';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function EditLeave() {
  const navigate = useNavigate();
  const leave = {} as types.Leave;

  const editLeave = async (leave: types.EditLeave) => {
    toast.success('You request has already been updated.');
    navigate('/leaves');
  };

  if (!leave) return <div>Loading...</div>;

  return <LeaveForm kind="edit" leave={leave} onSubmit={editLeave}></LeaveForm>;
}

export default EditLeave;
