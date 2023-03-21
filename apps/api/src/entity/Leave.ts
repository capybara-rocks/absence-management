export enum Status {
  Pending,
  Approved,
  Rejected,
}

export class Leave {
  id: number;
  status: Status;
  reason: string;
  leaveDate: string;
  rejectionReason?: string;
}
