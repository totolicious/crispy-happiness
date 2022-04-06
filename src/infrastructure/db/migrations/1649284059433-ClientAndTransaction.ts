import { MigrationInterface, QueryRunner } from "typeorm";

export class ClientAndTransaction1649284059433 implements MigrationInterface {
    name = 'ClientAndTransaction1649284059433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "preferentialComissionEur" double precision, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "date" character varying NOT NULL, "amount" double precision NOT NULL, "currency" character varying NOT NULL, "clientIdId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_7e8c08e1c43090ed36cca6223f0" FOREIGN KEY ("clientIdId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_7e8c08e1c43090ed36cca6223f0"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "client"`);
    }

}
