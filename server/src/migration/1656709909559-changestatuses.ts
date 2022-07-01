import { MigrationInterface, QueryRunner } from "typeorm";

export class changestatuses1656709909559 implements MigrationInterface {
    name = 'changestatuses1656709909559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket_item\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`quota\` ADD \`status\` enum ('PENDING', 'WON', 'LOST') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD \`amount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD \`posibleWin\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP COLUMN \`posibleWin\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`quota\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`ticket_item\` ADD \`status\` enum ('PENDING', 'WON', 'LOST') NOT NULL`);
    }

}
