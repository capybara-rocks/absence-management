import { UserProfile } from 'libs/auth/src/lib/types';
import * as z from 'zod';
import { createLeave, editLeave } from './schemas';

export type CreateLeave = z.infer<typeof createLeave>;

export type EditLeave = z.infer<typeof editLeave>;

export enum Status {
  Pending,
  Approved,
  Rejected,
}

export interface Leave {
  id: number;
  status: number;
  reason: string;
  leaveDate: string;
  rejectionReason?: string;
  user: UserProfile;
  approvedBy?: UserProfile;
}
