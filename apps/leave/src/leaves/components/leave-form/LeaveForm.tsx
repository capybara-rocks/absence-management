import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Datepicker from 'react-tailwindcss-datepicker';
import { capitalize } from 'lodash';
import { createLeave, editLeave } from '../../schemas';
import { Button, TextAreaFormField } from '@absence-management/ui';
import { CreateLeave, EditLeave, Leave } from '../../types';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';

export type LeaveFormProps =
  | {
      kind: 'create';
      onSubmit: SubmitHandler<CreateLeave>;
    }
  | {
      kind: 'edit';
      leave: Leave;
      onSubmit: SubmitHandler<EditLeave>;
    };

export function LeaveForm(props: LeaveFormProps) {
  const { kind, onSubmit } = props;
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<
    typeof onSubmit extends SubmitHandler<CreateLeave> ? CreateLeave : EditLeave
  >({
    mode: 'onBlur',
    resolver: zodResolver(kind === 'create' ? createLeave : editLeave),
    defaultValues: props.kind === 'edit' ? props.leave : undefined,
  });
  const currentLeaveDate = getValues('leaveDate');
  const currentLeaveDateRange = {
    startDate: currentLeaveDate,
    endDate: currentLeaveDate,
  };

  const handleLeaveDateChange = (value: DateValueType) => {
    if (value?.startDate)
      setValue('leaveDate', new Date(value?.startDate).toISOString(), {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      });
  };

  return (
    <form className="mx-auto max-w-lg" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-4 border-b-2 border-blue-100 pb-4 text-center text-2xl">
        {capitalize(kind)}
      </h1>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Leave Date
        </label>
        <Datepicker
          value={currentLeaveDateRange}
          asSingle={true}
          useRange={false}
          onChange={handleLeaveDateChange}
        />
        {errors.leaveDate && (
          <div className="mt-2 text-sm text-red-500">
            {errors.leaveDate.message}
          </div>
        )}
      </div>
      <TextAreaFormField
        id="reason"
        label="Reason"
        placeholder="Why do you want to take a leave?"
        rows={10}
        error={errors.reason?.message}
        {...register('reason')}
      ></TextAreaFormField>
      <Button type="submit" align="center">
        {kind}
      </Button>
    </form>
  );
}

export default LeaveForm;
