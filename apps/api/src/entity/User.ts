import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Leave } from './Leave';

export enum Role {
  Admin,
  Manager,
  Member,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: 'int',
    default: Role.Member,
  })
  role!: Role;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true, unique: true })
  refreshToken?: string;

  @OneToMany(() => Leave, (leave) => leave.user)
  leaves?: Leave[];

  @OneToMany(() => Leave, (leave) => leave.approvedBy)
  managedLeaves?: Leave[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  async hashPassword() {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
  }

  isValidPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
