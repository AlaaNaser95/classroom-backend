import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTimeToDateTimeFormat1701275481884
  implements MigrationInterface
{
  name = 'UpdateTimeToDateTimeFormat1701275481884';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reservation\` DROP COLUMN \`fromTime\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` DROP COLUMN \`toTime\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD \`from\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD \`to\` datetime NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`to\``);
    await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`from\``);
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD \`toTime\` time NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD \`fromTime\` time NOT NULL`,
    );
  }
}
