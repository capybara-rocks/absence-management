import { UserProfile } from 'libs/auth/src/lib/types';

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
  createdAt: string;
  updatedAt: string;
}
