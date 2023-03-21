import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class RefreshTokenFormDto {
  @Expose()
  @IsString()
  refreshToken: string;
}
