import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvatarToUserTable1677913895843 implements MigrationInterface {
    name = 'AddAvatarToUserTable1677913895843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
    }

}
