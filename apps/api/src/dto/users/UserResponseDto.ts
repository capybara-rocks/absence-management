import { Role, User } from '@/api/entity/User';
import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  avatar!: string;

  @Expose()
  role!: Role;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
