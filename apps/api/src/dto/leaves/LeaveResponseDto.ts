import { Leave, Status } from '@/api/entity/Leave';
import { User } from '@/api/entity/User';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../users/UserResponseDto';

export class LeaveResponseDto {
  @Expose()
  id: number;

  @Expose()
  status: Status;

  @Expose()
  reason: string;

  @Expose()
  leaveDate: string;

  @Expose()
  @Type(() => UserResponseDto)
  user: User;

  @Expose()
  @Type(() => UserResponseDto)
  approvedBy: User;

  constructor(leave: Leave) {
    Object.assign(this, leave);
  }
}
