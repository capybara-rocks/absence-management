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
  createdAt: string;
  updatedAt: string;
}
