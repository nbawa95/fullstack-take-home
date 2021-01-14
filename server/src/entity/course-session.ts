import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Course } from './course';

@Entity()
export class CourseSession {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	sessionNumber: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	content: string;

	@Column()
	courseId: number;

	@ManyToOne(() => Course)
	@JoinColumn()
	course: Course;
}
