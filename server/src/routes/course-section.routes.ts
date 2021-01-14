import { Router } from 'express';
import { CourseSectionService } from '../services/course-sections.service';

export const CourseSectionRoutes = () => {
	const router = Router();
	const courseSectionService = new CourseSectionService();

	router.get('/getAllSections', async (req, res, next) => {
		try {
			const courseSections = await courseSectionService.all();
			res.status(200).json({
				courseSections,
			});
			next();
		} catch (err) {
			res.status(400).json({ message: 'BAD_REQUEST' + err });
			next();
		}
	});

  router.post('/getCourseSections', async (req, res, next) => {
    try {
      console.log(req.body);
      const courseSections = await courseSectionService.findCourseSections(req.body);
      res.status(200).json({
        courseSections,
      });
      next();
    } catch (err) {
      res.status(400).json({ message: 'BAD_REQUEST' + err });
      next();
    }
  });


  router.post('/getCourseSectionsWithUser', async (req, res, next) => {
    try {
      const courseSections = await courseSectionService.findCourseSectionsWithUser(req.body);
      res.status(200).json({
        courseSections,
      });
      next();
    } catch (err) {
      res.status(400).json({ message: 'BAD_REQUEST' + err });
      next();
    }
  });

  router.post('/getCourseSectionWithoutUser', async (req, res, next) => {
    try {
      const courseSections = await courseSectionService.findCourseSectionsWithoutUser(req.body);
      res.status(200).json({
        courseSections,
      });
      next();
    } catch (err) {
      res.status(400).json({ message: 'BAD_REQUEST' + err });
      next();
    }
  });

  router.post('/removeCourseSection', async (req, res, next) => {
    try {
      const courseSections = await courseSectionService.remove(12);
      res.status(200).json({
        courseSections,
      });
      next();
    } catch (err) {
      res.status(400).json({ message: 'BAD_REQUEST' + err });
      next();
    }
  });


  router.post('/updateSectionParticipants', async (req, res, next) => {
    try {
      const courseSections = await courseSectionService.updateSectionParticipantsList(req.body);
      res.status(200).json({
        courseSections,
      });
      next();
    } catch (err) {
      res.status(400).json({ message: 'BAD_REQUEST' + err });
      next();
    }
  });


	return router;
};
