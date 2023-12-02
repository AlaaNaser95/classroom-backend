import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpldateClassroomFloorName1701272311840
  implements MigrationInterface
{
  name = 'UpldateClassroomFloorName1701272311840';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`classroom\` CHANGE \`floor\` \`floorN\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`classroom\` CHANGE \`floorN\` \`floor\` varchar(255) NOT NULL`,
    );
  }
}
