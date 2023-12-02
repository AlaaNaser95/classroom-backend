import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditFromTo1701281454526 implements MigrationInterface {
  name = 'EditFromTo1701281454526';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`classroom\` CHANGE \`floorN\` \`floorNo\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`from\``);
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD \`from\` decimal(4,2) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`to\``);
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD \`to\` decimal(4,2) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`to\``);
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD \`to\` datetime(0) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`from\``);
    await queryRunner.query(
      `ALTER TABLE \`reservation\` ADD \`from\` datetime(0) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`classroom\` CHANGE \`floorNo\` \`floorN\` varchar(255) NOT NULL`,
    );
  }
}
