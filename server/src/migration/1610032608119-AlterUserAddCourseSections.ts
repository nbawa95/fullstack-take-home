import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterUserAddCourseSections1610032608119 implements MigrationInterface {
    name = 'AlterUserAddCourseSections1610032608119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_course_sections_course_section" ("userId" integer NOT NULL, "courseSectionId" integer NOT NULL, CONSTRAINT "PK_8e4e473a2d4090537ff6bcfaaea" PRIMARY KEY ("userId", "courseSectionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cdf63183968360e8700983d4a6" ON "user_course_sections_course_section" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b2505e16614405d4da9941db9b" ON "user_course_sections_course_section" ("courseSectionId") `);
        await queryRunner.query(`ALTER TABLE "user_course_sections_course_section" ADD CONSTRAINT "FK_cdf63183968360e8700983d4a6d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_course_sections_course_section" ADD CONSTRAINT "FK_b2505e16614405d4da9941db9b2" FOREIGN KEY ("courseSectionId") REFERENCES "course_section"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_course_sections_course_section" DROP CONSTRAINT "FK_b2505e16614405d4da9941db9b2"`);
        await queryRunner.query(`ALTER TABLE "user_course_sections_course_section" DROP CONSTRAINT "FK_cdf63183968360e8700983d4a6d"`);
        await queryRunner.query(`DROP INDEX "IDX_b2505e16614405d4da9941db9b"`);
        await queryRunner.query(`DROP INDEX "IDX_cdf63183968360e8700983d4a6"`);
        await queryRunner.query(`DROP TABLE "user_course_sections_course_section"`);
    }

}
