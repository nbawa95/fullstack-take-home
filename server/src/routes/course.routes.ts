import { Router } from 'express';
import { CourseService } from '../services/course.service';

export const CourseRoutes = () => {
	const router = Router();
	const courseService = new CourseService();

	router.get('/getCourses', async (req, res, next) => {
		try {
			const courses = await courseService.all();
			res.status(200).json({
				courses,
			});
			next();
		} catch (err) {
			res.status(400).json({ message: 'BAD_REQUEST' });
			next();
		}
	});

  router.post('/removeCourse', async (req, res, next) => {
    try {
      const courses = await courseService.remove(4);
      res.status(200).json({
        courses,
      });
      next();
    } catch (err) {
      res.status(400).json({ message: 'BAD_REQUEST' });
      next();
    }
  });

  router.post('/getCourseById', async (req, res, next) => {
    try {
      const courses = await courseService.one(req.body.id);
      res.status(200).json({
        courses,
      });
      next();
    } catch (err) {
      res.status(400).json({ message: 'BAD_REQUEST' });
      next();
    }
  });

	return router;
};
