import { Role, User as UserEntity } from '@/api/entity/User';

declare global {
  namespace Express {
    interface Request {
      userFromToken: {
        id?: number;
        role?: Role;
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends UserEntity {}
  }
}
