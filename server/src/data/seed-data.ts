import { Course } from '../entity/course';
import { CourseSection } from '../entity/course-section';
import { CourseSectionSeed } from './course-sections';
import { CourseSeed } from './courses';
import { CourseSession } from '../entity/course-session';
import { CourseSessionSeed } from './course-sessions';
import { createConnection } from 'typeorm';

const seedData = () => {
	createConnection()
		.then(async (connection) => {
			// await connection.manager.save(Course, CourseSeed);
			// await connection.manager.save(CourseSection, CourseSectionSeed);
			await connection.manager.save(CourseSession, CourseSessionSeed);

			await connection.close();
		})
		.finally(() => {
			console.log('Successfully Seeded DB');
			process.exit(0);
		});
};

seedData();
