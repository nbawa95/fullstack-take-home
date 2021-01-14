import { Course } from '../entity/course';
import { getRepository } from 'typeorm';

export class CourseService {
	private courseRepository = getRepository(Course);

	async all() {
		return this.courseRepository.find();
	}

  async one(id: number) {
		return this.courseRepository.findOne(id);
  }

	async remove(id: number) {
		let courseToRemove = await this.courseRepository.findOne(id);
		await this.courseRepository.remove(courseToRemove);
	}
}
