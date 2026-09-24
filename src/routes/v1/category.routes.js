import { Router } from 'express';
import { CategoryController } from '../../controllers/category.controller.js';
import { categoryValidationRules, validateCategory } from '../../validators/category.validator.js';
import AuthMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();
const { verifyToken, authorizeRoles } = AuthMiddleware;

// Rutas Públicas
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);

// Rutas con Validación y Autenticación
router.post(
    '/',
    verifyToken,
    authorizeRoles('admin'),
    categoryValidationRules,
    validateCategory,
    CategoryController.create
);

router.put(
    '/:id',
    verifyToken,
    authorizeRoles('admin'),
    categoryValidationRules,
    validateCategory,
    CategoryController.update
);

router.delete(
    '/:id',
    verifyToken,
    authorizeRoles('admin'),
    CategoryController.delete
);

export default router;