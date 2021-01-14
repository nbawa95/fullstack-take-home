import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { Course } from './course';

@Entity()
export class CourseSection {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	nickname: string;

	@Column()
	startDate: string;

	@Column()
	courseId: number;

	@Column()
	courseName: string;

	@Column("text", { array: true, default: {} })
	participants: string[];

	@ManyToOne(() => Course)
	@JoinColumn()
	course: Course;
}
