import { MigrationInterface, QueryRunner } from "typeorm";

export class createQuotaTable1656575787286 implements MigrationInterface {
    name = 'createQuotaTable1656575787286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`game\` DROP FOREIGN KEY \`FK_4084468356497d7dcedd09502ff\``);
        await queryRunner.query(`ALTER TABLE \`game\` DROP FOREIGN KEY \`FK_a423af0e17cb4905e5afa644be8\``);
        await queryRunner.query(`CREATE TABLE \`quota\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` int NOT NULL, \`gameId\` int NULL, \`playId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`team\` ADD \`fieldName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`game\` CHANGE \`hostId\` \`hostId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`game\` CHANGE \`guestId\` \`guestId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`game\` ADD CONSTRAINT \`FK_4084468356497d7dcedd09502ff\` FOREIGN KEY (\`hostId\`) REFERENCES \`team\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`game\` ADD CONSTRAINT \`FK_a423af0e17cb4905e5afa644be8\` FOREIGN KEY (\`guestId\`) REFERENCES \`team\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quota\` ADD CONSTRAINT \`FK_bb397097a1b450f5b39c1d72e4c\` FOREIGN KEY (\`gameId\`) REFERENCES \`game\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quota\` ADD CONSTRAINT \`FK_c5316f44be54b99ff8efc13fa54\` FOREIGN KEY (\`playId\`) REFERENCES \`play\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quota\` DROP FOREIGN KEY \`FK_c5316f44be54b99ff8efc13fa54\``);
        await queryRunner.query(`ALTER TABLE \`quota\` DROP FOREIGN KEY \`FK_bb397097a1b450f5b39c1d72e4c\``);
        await queryRunner.query(`ALTER TABLE \`game\` DROP FOREIGN KEY \`FK_a423af0e17cb4905e5afa644be8\``);
        await queryRunner.query(`ALTER TABLE \`game\` DROP FOREIGN KEY \`FK_4084468356497d7dcedd09502ff\``);
        await queryRunner.query(`ALTER TABLE \`game\` CHANGE \`guestId\` \`guestId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`game\` CHANGE \`hostId\` \`hostId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`team\` DROP COLUMN \`fieldName\``);
        await queryRunner.query(`DROP TABLE \`quota\``);
        await queryRunner.query(`ALTER TABLE \`game\` ADD CONSTRAINT \`FK_a423af0e17cb4905e5afa644be8\` FOREIGN KEY (\`guestId\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`game\` ADD CONSTRAINT \`FK_4084468356497d7dcedd09502ff\` FOREIGN KEY (\`hostId\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
