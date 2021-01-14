import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCourseSectionTable1609805312966 implements MigrationInterface {
    name = 'CreateCourseSectionTable1609805312966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course_section" ("id" SERIAL NOT NULL, "nickname" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "courseId" integer NOT NULL, CONSTRAINT "PK_0881e971db0ee457d3a988e92b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "course_section" ADD CONSTRAINT "FK_2aeb1581bec51db816264a27d97" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_section" DROP CONSTRAINT "FK_2aeb1581bec51db816264a27d97"`);
        await queryRunner.query(`DROP TABLE "course_section"`);
    }

}
