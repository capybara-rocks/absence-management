import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Status {
  Pending,
  Approved,
  Rejected,
}

@Entity()
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    default: Status.Pending,
  })
  status: Status;

  @Column()
  reason: string;

  @Column()
  leaveDate: Date;
}
