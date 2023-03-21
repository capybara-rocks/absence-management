import { Role, User as UserEntity } from '@/api/entity/User';
import { initialize } from '@/api/data/redis';

declare global {
  namespace Express {
    interface Request {
      userFromToken: {
        id?: number;
        role?: Role;
      };
      redis: Awaited<ReturnType<typeof initialize>>;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends UserEntity {}
  }
}
