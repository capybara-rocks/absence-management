import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

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

  @Column({ nullable: true })
  rejectionReason?: string;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'int', nullable: true })
  approvedById?: number;

  @ManyToOne(() => User, (user) => user.leaves, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => User, (user) => user.managedLeaves, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'approvedById' })
  approvedBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
