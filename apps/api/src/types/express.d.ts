import { initialize } from '@/api/data/redis';

declare global {
  namespace Express {
    interface Request {
      redis: Awaited<ReturnType<typeof initialize>>;
    }
  }
}
