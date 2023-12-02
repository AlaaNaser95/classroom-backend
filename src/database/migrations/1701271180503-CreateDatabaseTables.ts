import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabaseTables1701271180503 implements MigrationInterface {
  name = 'CreateDatabaseTables1701271180503';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`reservation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`date\` date NOT NULL, \`fromTime\` int NOT NULL, \`toTime\` int NOT NULL, \`classroomId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`classroom\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`capacity\` int NOT NULL, \`hasProjector\` tinyint NOT NULL DEFAULT 1, \`building\` varchar(255) NOT NULL, \`floor\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_2a551ee5e1d28e89efbc0c3b91a\` FOREIGN KEY (\`classroomId\`) REFERENCES \`classroom\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_2a551ee5e1d28e89efbc0c3b91a\``,
    );
    await queryRunner.query(`DROP TABLE \`classroom\``);
    await queryRunner.query(`DROP TABLE \`reservation\``);
  }
}
