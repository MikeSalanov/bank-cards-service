import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1716247939647 implements MigrationInterface {
  name = 'Migrations1716247939647';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bank_cards_world" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "last_numbers" integer NOT NULL, "exp_month" character varying NOT NULL, "exp_year" character varying NOT NULL, "payment_method_id" character varying NOT NULL, "user_id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_559faeb10a325954c26ee37044d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bank_cards_RU" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "card_number" character varying NOT NULL, "expiry_date" character varying NOT NULL, "cvc_cvv" integer NOT NULL, "user_id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3d0987d3dbf98ea199f4c67ac7f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "bank_cards_RU"`);
    await queryRunner.query(`DROP TABLE "bank_cards_world"`);
  }
}
