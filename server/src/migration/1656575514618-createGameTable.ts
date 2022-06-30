import { MigrationInterface, QueryRunner } from "typeorm";

export class createGameTable1656575514618 implements MigrationInterface {
    name = 'createGameTable1656575514618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`game\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` datetime NOT NULL, \`hostId\` int NULL, \`guestId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`game\` ADD CONSTRAINT \`FK_4084468356497d7dcedd09502ff\` FOREIGN KEY (\`hostId\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`game\` ADD CONSTRAINT \`FK_a423af0e17cb4905e5afa644be8\` FOREIGN KEY (\`guestId\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`game\` DROP FOREIGN KEY \`FK_a423af0e17cb4905e5afa644be8\``);
        await queryRunner.query(`ALTER TABLE \`game\` DROP FOREIGN KEY \`FK_4084468356497d7dcedd09502ff\``);
        await queryRunner.query(`DROP TABLE \`game\``);
    }

}
