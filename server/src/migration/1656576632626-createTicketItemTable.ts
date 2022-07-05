import { MigrationInterface, QueryRunner } from "typeorm";

export class createTicketItemTable1656576632626 implements MigrationInterface {
    name = 'createTicketItemTable1656576632626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ticket_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ticketId\` int NOT NULL, \`quotaId\` int NULL, \`quotaValue\` int NOT NULL, \`status\` enum ('PENDING', 'WON', 'LOST') NOT NULL, PRIMARY KEY (\`id\`, \`ticketId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ticket_item\` ADD CONSTRAINT \`FK_5ec69cdb2d87cb6eeee2b6cecf8\` FOREIGN KEY (\`ticketId\`) REFERENCES \`ticket\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_item\` ADD CONSTRAINT \`FK_c9992e8925c3256ab039e37c3ff\` FOREIGN KEY (\`quotaId\`) REFERENCES \`quota\`(\`id\`) ON DELETE SET NULL ON UPDATE SET NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket_item\` DROP FOREIGN KEY \`FK_c9992e8925c3256ab039e37c3ff\``);
        await queryRunner.query(`ALTER TABLE \`ticket_item\` DROP FOREIGN KEY \`FK_5ec69cdb2d87cb6eeee2b6cecf8\``);
        await queryRunner.query(`DROP TABLE \`ticket_item\``);
    }

}
