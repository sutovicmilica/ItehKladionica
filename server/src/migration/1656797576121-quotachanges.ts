import { MigrationInterface, QueryRunner } from "typeorm";

export class quotachanges1656797576121 implements MigrationInterface {
    name = 'quotachanges1656797576121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quota\` CHANGE \`status\` \`status\` enum ('PENDING', 'WON', 'LOST', 'CANCELED') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quota\` CHANGE \`status\` \`status\` enum ('PENDING', 'WON', 'LOST') NOT NULL`);
    }

}
