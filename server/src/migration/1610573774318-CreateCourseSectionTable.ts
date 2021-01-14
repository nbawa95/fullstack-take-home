import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCourseSectionTable1610573774318 implements MigrationInterface {
    name = 'CreateCourseSectionTable1610573774318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_section" ADD "courseName" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_section" DROP COLUMN "courseName"`);
    }

}
