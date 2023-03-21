import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLeaveTable1679360143276 implements MigrationInterface {
  name = 'CreateLeaveTable1679360143276';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "leave" ("id" int NOT NULL IDENTITY(1,1), "status" int NOT NULL CONSTRAINT "DF_7ae3587b7352ad551976183e963" DEFAULT 0, "reason" nvarchar(255) NOT NULL, "leaveDate" datetime NOT NULL, CONSTRAINT "PK_501f6ea368365d2a40b1660e16b" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "leave"`);
  }
}
