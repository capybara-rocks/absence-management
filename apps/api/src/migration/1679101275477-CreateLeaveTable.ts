import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLeaveTable1679101275477 implements MigrationInterface {
    name = 'CreateLeaveTable1679101275477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "leave" ("id" int NOT NULL IDENTITY(1,1), "status" int NOT NULL CONSTRAINT "DF_7ae3587b7352ad551976183e963" DEFAULT 0, "reason" nvarchar(255) NOT NULL, "leaveDate" datetime NOT NULL, "rejectionReason" nvarchar(255), "userId" int NOT NULL, "approvedById" int, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_6da17d29345ed38aa77b15f9ba7" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_9e3851984044cdbdefd0a5cb16b" DEFAULT getdate(), CONSTRAINT "PK_501f6ea368365d2a40b1660e16b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "leave" ADD CONSTRAINT "FK_9fb20081bf48840a16e0d33d14e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leave" ADD CONSTRAINT "FK_fb9407a17d10a081caef3d826ca" FOREIGN KEY ("approvedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave" DROP CONSTRAINT "FK_fb9407a17d10a081caef3d826ca"`);
        await queryRunner.query(`ALTER TABLE "leave" DROP CONSTRAINT "FK_9fb20081bf48840a16e0d33d14e"`);
        await queryRunner.query(`DROP TABLE "leave"`);
    }

}
