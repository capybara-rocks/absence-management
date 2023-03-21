import { Expose } from 'class-transformer';
import { IsDateString, Length } from 'class-validator';

export class CreateLeaveFormDto {
  @Expose()
  @IsDateString()
  leaveDate: Date;

  @Expose()
  @Length(1, 255)
  reason: string;
}
