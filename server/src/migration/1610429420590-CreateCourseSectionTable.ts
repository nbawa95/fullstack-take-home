import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCourseSectionTable1610429420590 implements MigrationInterface {
    name = 'CreateCourseSectionTable1610429420590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_section" DROP COLUMN "participants"`);
        await queryRunner.query(`ALTER TABLE "course_section" ADD "participants" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_section" DROP COLUMN "participants"`);
        await queryRunner.query(`ALTER TABLE "course_section" ADD "participants" character varying NOT NULL`);
    }

}
