import * as types from '../../types';
import LeaveForm from '../leave-form/LeaveForm';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function CreateLeave() {
  const navigate = useNavigate();

  const createLeave = async (leave: types.CreateLeave) => {
    toast.success('You request is still being processed, please wait.');
    navigate('/leaves');
  };

  return <LeaveForm kind="create" onSubmit={createLeave}></LeaveForm>;
}

export default CreateLeave;
