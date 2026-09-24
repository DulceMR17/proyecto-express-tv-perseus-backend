import { Router } from 'express';
import CharacterController from '../../controllers/character.controller.js';
import { characterValidationRules, validateCharacter } from '../../validators/character.validator.js';
import AuthMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();
const { verifyToken, authorizeRoles } = AuthMiddleware;

router.get('/', CharacterController.getAll);
router.get('/:id', CharacterController.getById);

router.post('/', verifyToken, authorizeRoles('admin'), characterValidationRules, validateCharacter, CharacterController.create);
router.put('/:id', verifyToken, authorizeRoles('admin'), characterValidationRules, validateCharacter, CharacterController.update);
router.delete('/:id', verifyToken, authorizeRoles('admin'), CharacterController.delete);

export default router;
