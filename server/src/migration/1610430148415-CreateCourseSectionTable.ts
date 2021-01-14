import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCourseSectionTable1610430148415 implements MigrationInterface {
    name = 'CreateCourseSectionTable1610430148415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "course_section"."participants" IS NULL`);
        await queryRunner.query(`ALTER TABLE "course_section" ALTER COLUMN "participants" SET DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_section" ALTER COLUMN "participants" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "course_section"."participants" IS NULL`);
    }

}
