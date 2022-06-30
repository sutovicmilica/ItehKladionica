import { MigrationInterface, QueryRunner } from "typeorm";

export class createTeamTable1656575434312 implements MigrationInterface {
    name = 'createTeamTable1656575434312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`team\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`team\``);
    }

}
