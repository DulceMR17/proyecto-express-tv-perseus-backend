import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import AuthDTO from '../dtos/auth.dto.js';
import ValidationMiddleware from '../middlewares/validation.middleware.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import RateLimiterMiddleware from '../middlewares/rateLimit.middleware.js';

const router = Router();

router.post(
  '/login',
  RateLimiterMiddleware.authLimiter,
  AuthDTO.loginValidation(),
  ValidationMiddleware.validate,
  AuthController.login
);

router.post('/logout', AuthController.logout);

router.get(
  '/me',
  AuthMiddleware.verifyToken,
  AuthController.getProfile
);

export default router;