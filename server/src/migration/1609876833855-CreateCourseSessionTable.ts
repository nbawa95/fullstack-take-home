import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCourseSessionTable1609876833855 implements MigrationInterface {
    name = 'CreateCourseSessionTable1609876833855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course_session" ("id" SERIAL NOT NULL, "sessionNumber" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "content" character varying NOT NULL, "courseId" integer NOT NULL, CONSTRAINT "PK_12288a725cc3c3fba4e600a0ef6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "course_session" ADD CONSTRAINT "FK_e9bb31da957336a4d604ead2656" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_session" DROP CONSTRAINT "FK_e9bb31da957336a4d604ead2656"`);
        await queryRunner.query(`DROP TABLE "course_session"`);
    }

}
