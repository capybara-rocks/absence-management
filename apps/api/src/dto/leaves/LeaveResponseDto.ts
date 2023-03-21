import { Leave, Status } from '@/api/entity/Leave';
import { Expose } from 'class-transformer';

export class LeaveResponseDto {
  @Expose()
  id: number;

  @Expose()
  status: Status;

  @Expose()
  reason: string;

  @Expose()
  leaveDate: string;

  constructor(leave: Leave) {
    Object.assign(this, leave);
  }
}
