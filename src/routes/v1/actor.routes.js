import { Router } from 'express';
import ActorController from '../../controllers/actor.controller.js';
import { actorValidationRules, validateActor } from '../../validators/actor.validator.js';
import AuthMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();
const { verifyToken, authorizeRoles } = AuthMiddleware;

router.get('/', ActorController.getAll);
router.get('/:id', ActorController.getById);

router.post(
  '/',
  verifyToken,
  authorizeRoles('admin'),
  actorValidationRules,
  validateActor,
  ActorController.create
);

router.put(
  '/:id',
  verifyToken,
  authorizeRoles('admin'),
  actorValidationRules,
  validateActor,
  ActorController.update
);

router.delete(
  '/:id',
  verifyToken,
  authorizeRoles('admin'),
  ActorController.delete
);

export default router;
