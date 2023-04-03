import * as types from '../../types';
import * as api from '../../api';
import LeaveForm from '../leave-form/LeaveForm';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGetLeave, useGetLeaves } from '../../api-hooks';

export function EditLeave() {
  const params = useParams<{ id: string }>();
  const id = params.id as string;
  const navigate = useNavigate();
  const { data: leave, mutate: mutateGetLeave } = useGetLeave(id);
  const { mutate: mutateGetLeaves } = useGetLeaves();

  const editLeave = async (leave: types.EditLeave) => {
    const updatedLeave = await api.editLeave(id, leave);

    toast.success('You request has already been updated.');
    mutateGetLeave(() => updatedLeave, { revalidate: false });
    mutateGetLeaves();
    navigate('/leaves');
  };

  if (!leave) return <div>Loading...</div>;

  return <LeaveForm kind="edit" leave={leave} onSubmit={editLeave}></LeaveForm>;
}

export default EditLeave;
