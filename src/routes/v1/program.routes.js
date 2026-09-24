import { Router } from 'express';
import ProgramController from '../../controllers/program.controller.js';
import { programValidationRules, validateProgram } from '../../validators/program.validator.js';
import AuthMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();
const { verifyToken, authorizeRoles } = AuthMiddleware;

router.get('/', ProgramController.getAll);
router.get('/:id', ProgramController.getById);

router.post(
  '/',
  verifyToken,
  authorizeRoles('admin'),
  programValidationRules,
  validateProgram,
  ProgramController.create
);

router.put(
  '/:id',
  verifyToken,
  authorizeRoles('admin'),
  programValidationRules,
  validateProgram,
  ProgramController.update
);

router.delete(
  '/:id',
  verifyToken,
  authorizeRoles('admin'),
  ProgramController.delete
);

export default router;
