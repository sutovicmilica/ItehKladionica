import { MigrationInterface, QueryRunner } from "typeorm";

export class quotachanges1656797576121 implements MigrationInterface {
    name = 'quotachanges1656797576121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quota\` DROP FOREIGN KEY \`FK_bb397097a1b450f5b39c1d72e4c\``);
        await queryRunner.query(`ALTER TABLE \`game\` DROP FOREIGN KEY \`FK_4084468356497d7dcedd09502ff\``);
        await queryRunner.query(`ALTER TABLE \`game\` DROP FOREIGN KEY \`FK_a423af0e17cb4905e5afa644be8\``);
        await queryRunner.query(`ALTER TABLE \`game\` CHANGE \`hostId\` \`hostId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`game\` CHANGE \`guestId\` \`guestId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`quota\` DROP FOREIGN KEY \`FK_c5316f44be54b99ff8efc13fa54\``);
        await queryRunner.query(`ALTER TABLE \`quota\` CHANGE \`status\` \`status\` enum ('PENDING', 'WON', 'LOST', 'CANCELED') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`quota\` CHANGE \`gameId\` \`gameId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`quota\` CHANGE \`playId\` \`playId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_item\` DROP FOREIGN KEY \`FK_c9992e8925c3256ab039e37c3ff\``);
        await queryRunner.query(`ALTER TABLE \`ticket_item\` CHANGE \`quotaId\` \`quotaId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_0e01a7c92f008418bad6bad5919\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`game\` ADD CONSTRAINT \`FK_4084468356497d7dcedd09502ff\` FOREIGN KEY (\`hostId\`) REFERENCES \`team\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`game\` ADD CONSTRAINT \`FK_a423af0e17cb4905e5afa644be8\` FOREIGN KEY (\`guestId\`) REFERENCES \`team\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quota\` ADD CONSTRAINT \`FK_bb397097a1b450f5b39c1d72e4c\` FOREIGN KEY (\`gameId\`) REFERENCES \`game\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quota\` ADD CONSTRAINT \`FK_c5316f44be54b99ff8efc13fa54\` FOREIGN KEY (\`playId\`) REFERENCES \`play\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_item\` ADD CONSTRAINT \`FK_c9992e8925c3256ab039e37c3ff\` FOREIGN KEY (\`quotaId\`) REFERENCES \`quota\`(\`id\`) ON DELETE SET NULL ON UPDATE SET NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_0e01a7c92f008418bad6bad5919\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE SET NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_0e01a7c92f008418bad6bad5919\``);
        await queryRunner.query(`ALTER TABLE \`ticket_item\` DROP FOREIGN KEY \`FK_c9992e8925c3256ab039e37c3ff\``);
        await queryRunner.query(`ALTER TABLE \`quota\` DROP FOREIGN KEY \`FK_c5316f44be54b99ff8efc13fa54\``);
        await queryRunner.query(`ALTER TABLE \`quota\` DROP FOREIGN KEY \`FK_bb397097a1b450f5b39c1d72e4c\``);
        await queryRunner.query(`ALTER TABLE \`game\` DROP FOREIGN KEY \`FK_a423af0e17cb4905e5afa644be8\``);
        await queryRunner.query(`ALTER TABLE \`game\` DROP FOREIGN KEY \`FK_4084468356497d7dcedd09502ff\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_0e01a7c92f008418bad6bad5919\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE SET NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_item\` CHANGE \`quotaId\` \`quotaId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`ticket_item\` ADD CONSTRAINT \`FK_c9992e8925c3256ab039e37c3ff\` FOREIGN KEY (\`quotaId\`) REFERENCES \`quota\`(\`id\`) ON DELETE SET NULL ON UPDATE SET NULL`);
        await queryRunner.query(`ALTER TABLE \`quota\` CHANGE \`playId\` \`playId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`quota\` CHANGE \`gameId\` \`gameId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`quota\` CHANGE \`status\` \`status\` enum ('PENDING', 'WON', 'LOST') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`quota\` ADD CONSTRAINT \`FK_c5316f44be54b99ff8efc13fa54\` FOREIGN KEY (\`playId\`) REFERENCES \`play\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`game\` CHANGE \`guestId\` \`guestId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`game\` CHANGE \`hostId\` \`hostId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`game\` ADD CONSTRAINT \`FK_a423af0e17cb4905e5afa644be8\` FOREIGN KEY (\`guestId\`) REFERENCES \`team\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`game\` ADD CONSTRAINT \`FK_4084468356497d7dcedd09502ff\` FOREIGN KEY (\`hostId\`) REFERENCES \`team\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quota\` ADD CONSTRAINT \`FK_bb397097a1b450f5b39c1d72e4c\` FOREIGN KEY (\`gameId\`) REFERENCES \`game\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
