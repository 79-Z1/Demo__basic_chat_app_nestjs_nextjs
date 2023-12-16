import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableMessageSocket1702436257860 implements MigrationInterface {
    name = 'AddTableMessageSocket1702436257860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "senderId" integer, "receiverId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sockets" ("id" SERIAL NOT NULL, "socketId" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_159be90f1ea8f612e3c3e46d24" UNIQUE ("userId"), CONSTRAINT "PK_dd9ffd18e836c4ad4b890b5f6a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_acf951a58e3b9611dd96ce89042" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sockets" ADD CONSTRAINT "FK_159be90f1ea8f612e3c3e46d243" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sockets" DROP CONSTRAINT "FK_159be90f1ea8f612e3c3e46d243"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_acf951a58e3b9611dd96ce89042"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`DROP TABLE "sockets"`);
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
