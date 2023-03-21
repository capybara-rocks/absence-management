import { User } from '@/api/entity/User';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../users/UserResponseDto';

export class LoginResponseDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  @Type(() => UserResponseDto)
  user: User;

  constructor(accessToken: string, refreshToken: string, user: User) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.user = user;
  }
}
