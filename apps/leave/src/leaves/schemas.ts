import * as z from 'zod';
export const createLeave = z.object({
  reason: z.string().min(1).max(255),
  leaveDate: z.string().datetime(),
});

export const editLeave = createLeave.partial();
