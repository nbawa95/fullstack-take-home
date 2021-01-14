import { Router } from 'express';
import { CourseSessionService } from '../services/course-sessions.service';

export const CourseSessionRoutes = () => {
	const router = Router();
	const courseSessionService = new CourseSessionService();

	router.get('/getAllCourseSessions', async (req, res, next) => {
		try {
			const courseSessions = await courseSessionService.all();
			res.status(200).json({
				courseSessions,
			});
			next();
		} catch (err) {
			res.status(400).json({ message: 'BAD_REQUEST' + err });
			next();
		}
	});

  router.post('/removeCourseSession', async (req, res, next) => {
    try {
      const courseSessions = await courseSessionService.remove(10);
      res.status(200).json({
        courseSessions,
      });
      next();
    } catch (err) {
      res.status(400).json({ message: 'BAD_REQUEST' + err });
      next();
    }
  });

  router.post('/getSessionsForCourse', async (req, res, next) => {
    try {
      const courseSessions = await courseSessionService.findSessionsForCourse(req.body);
      res.status(200).json({
        courseSessions,
      });
      next();
    } catch (err) {
      res.status(400).json({ message: 'BAD_REQUEST' + err });
      next();
    }
  });

	return router;
};
