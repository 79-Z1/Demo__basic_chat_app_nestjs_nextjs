import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSocketUserIdType1702485803371 implements MigrationInterface {
    name = 'UpdateSocketUserIdType1702485803371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sockets" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "sockets" ADD CONSTRAINT "UQ_159be90f1ea8f612e3c3e46d243" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "sockets" ADD CONSTRAINT "FK_159be90f1ea8f612e3c3e46d243" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sockets" DROP CONSTRAINT "FK_159be90f1ea8f612e3c3e46d243"`);
        await queryRunner.query(`ALTER TABLE "sockets" DROP CONSTRAINT "UQ_159be90f1ea8f612e3c3e46d243"`);
        await queryRunner.query(`ALTER TABLE "sockets" DROP COLUMN "userId"`);
    }

}
