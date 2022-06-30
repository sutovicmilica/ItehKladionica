import { MigrationInterface, QueryRunner } from "typeorm";

export class createPlayTable1656575297382 implements MigrationInterface {
    name = 'createPlayTable1656575297382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`play\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`play\``);
    }

}
