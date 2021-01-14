import { CourseSection } from '../entity/course-section';
import { getRepository } from 'typeorm';

export class CourseSectionService {
	private courseSectionRepository = getRepository(CourseSection);

	async all() {
		return this.courseSectionRepository.find();
	}

  async one(id: number) {
		return this.courseSectionRepository.findOne(id);
  }

  async findCourseSections(courseId: any) {
    return this.courseSectionRepository.find({
        where: { courseId: courseId.courseId },
    });
  }

  //This query checks whether the user is included in the section's participants list. I chose not to
  //restrict by date (only show upcoming sections) because I thought there would be value in allowing
  //users to refer back to previous courses they had signed up for - especially because the session
  //content is available for sections that the user is signed up for.
  async findCourseSectionsWithUser(body: any) {
    return this.courseSectionRepository.createQueryBuilder("course-section")
    .where('course-section.participants @> ARRAY[:participants]', { participants:  body.user})
    .execute();
  }

  //This query only returns sections that the user is not already signed up for.
  async findCourseSectionsWithoutUser(body: any) {
    return this.courseSectionRepository.createQueryBuilder("course-section")
    .where('NOT course-section.participants @> ARRAY[:participants] AND course-section.courseId = :courseId', { participants: body.user, courseId: body.courseId})
    .execute();
  }

  //This query updates the participants list to include the user that just signed up for the course.
  async updateSectionParticipantsList(body: any) {
    return this.courseSectionRepository.createQueryBuilder()
    .update(CourseSection)
    .set({ participants: body.participants })
    .where( { id: body.id })
    .execute()
  }

	async remove(id: number) {
		let sectionToRemove = await this.courseSectionRepository.findOne(id);
		await this.courseSectionRepository.remove(sectionToRemove);
	}
}
