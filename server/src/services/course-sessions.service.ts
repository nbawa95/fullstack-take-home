import { CourseSession } from '../entity/course-session';
import { getRepository } from 'typeorm';

export class CourseSessionService {
	private courseSessionRepository = getRepository(CourseSession);

	async all() {
		return this.courseSessionRepository.find();
	}

  async one(id: number) {
		return this.courseSessionRepository.findOne(id);
  }

  async findSessionsForCourse(body: any) {
    return this.courseSessionRepository.find({
        where: { courseId: body.courseId }
    });
  }

	async remove(id: number) {
		let sessionToRemove = await this.courseSessionRepository.findOne(id);
		await this.courseSessionRepository.remove(sessionToRemove);
	}
}
