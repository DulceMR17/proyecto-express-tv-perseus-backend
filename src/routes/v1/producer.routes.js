import { Router } from 'express';
import ProducerController from '../../controllers/producer.controller.js';
import { producerValidationRules, validateProducer } from '../../validators/producer.validator.js';
import AuthMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();
const { verifyToken, authorizeRoles } = AuthMiddleware;

router.get('/', ProducerController.getAll);
router.get('/:id', ProducerController.getById);

router.post(
  '/',
  verifyToken,
  authorizeRoles('admin'),
  producerValidationRules,
  validateProducer,
  ProducerController.create
);

router.put(
  '/:id',
  verifyToken,
  authorizeRoles('admin'),
  producerValidationRules,
  validateProducer,
  ProducerController.update
);

router.delete(
  '/:id',
  verifyToken,
  authorizeRoles('admin'),
  ProducerController.delete
);

export default router;
