import { Router } from 'express';
import ChapterController from '../../controllers/chapter.controller.js';
import { chapterValidationRules, validateChapter } from '../../validators/chapter.validator.js';
import AuthMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();
const { verifyToken, authorizeRoles } = AuthMiddleware;

router.get('/', ChapterController.getAll);
router.get('/:id', ChapterController.getById);

router.post('/', verifyToken, authorizeRoles('admin'), chapterValidationRules, validateChapter, ChapterController.create);
router.put('/:id', verifyToken, authorizeRoles('admin'), chapterValidationRules, validateChapter, ChapterController.update);
router.delete('/:id', verifyToken, authorizeRoles('admin'), ChapterController.delete);

export default router;
