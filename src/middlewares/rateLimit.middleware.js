import rateLimit from 'express-rate-limit';

class RateLimiterMiddleware {
  static authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // Máximo 10 intentos de login por ventana
    message: {
      status: 'fail',
      message: 'Demasiados intentos de inicio de sesión. Intente nuevamente en 15 minutos.'
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  static apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      status: 'fail',
      message: 'Límite de peticiones alcanzado. Intente más tarde.'
    }
  });
}

export default RateLimiterMiddleware;