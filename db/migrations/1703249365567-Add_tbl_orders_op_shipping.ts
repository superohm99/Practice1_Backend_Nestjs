import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTblOrdersOpShipping1703249365567 implements MigrationInterface {
    name = 'AddTblOrdersOpShipping1703249365567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shippings" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "name" character varying NOT NULL DEFAULT ' ', "address" character varying NOT NULL, "city" character varying NOT NULL, "postCode" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_665fb613135782a598a2b47e5b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ordres_status_enum" AS ENUM('processing', 'shipped', 'delivered', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "ordres" ("id" SERIAL NOT NULL, "orderAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."ordres_status_enum" NOT NULL DEFAULT 'processing', "shippedAt" TIMESTAMP, "deliveredAt" TIMESTAMP, "updatedById" integer, "shippingAddressId" integer, CONSTRAINT "REL_180d0bdccbd9c0c1a0215f4735" UNIQUE ("shippingAddressId"), CONSTRAINT "PK_f5e8c733acd1f78f026af1dc7c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_products" ("id" SERIAL NOT NULL, "product_unit_price" numeric(10,2) NOT NULL DEFAULT '0', "product_quantity" integer NOT NULL, "orderId" integer, "productId" integer, CONSTRAINT "PK_4945c6758fd65ffacda760b4ac9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ordres" ADD CONSTRAINT "FK_c61d727f6e503078f77e301f31c" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordres" ADD CONSTRAINT "FK_180d0bdccbd9c0c1a0215f4735b" FOREIGN KEY ("shippingAddressId") REFERENCES "shippings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD CONSTRAINT "FK_823bad3524a5d095453c43286bb" FOREIGN KEY ("orderId") REFERENCES "ordres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD CONSTRAINT "FK_4eff63e89274f79195e25c5c115" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_products" DROP CONSTRAINT "FK_4eff63e89274f79195e25c5c115"`);
        await queryRunner.query(`ALTER TABLE "orders_products" DROP CONSTRAINT "FK_823bad3524a5d095453c43286bb"`);
        await queryRunner.query(`ALTER TABLE "ordres" DROP CONSTRAINT "FK_180d0bdccbd9c0c1a0215f4735b"`);
        await queryRunner.query(`ALTER TABLE "ordres" DROP CONSTRAINT "FK_c61d727f6e503078f77e301f31c"`);
        await queryRunner.query(`DROP TABLE "orders_products"`);
        await queryRunner.query(`DROP TABLE "ordres"`);
        await queryRunner.query(`DROP TYPE "public"."ordres_status_enum"`);
        await queryRunner.query(`DROP TABLE "shippings"`);
    }

}
