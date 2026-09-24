import jwt from 'jsonwebtoken';

class AuthMiddleware {
  static verifyToken = (req, res, next) => {
    try {
      const token = req.cookies.auth_token;

      if (!token) {
        return res.status(401).json({
          status: 'fail',
          message: 'Acceso no autorizado. Token no proporcionado en las cookies.'
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        status: 'fail',
        message: 'Token inválido o expirado.'
      });
    }
  };

  static restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!req.user || !roles.map((role) => String(role).toLowerCase()).includes(String(req.user.role).toLowerCase())) {
        return res.status(403).json({
          status: 'fail',
          message: 'No tienes permisos para realizar esta acción.'
        });
      }
      next();
    };
  };

  static authenticateToken = AuthMiddleware.verifyToken;
  static authorizeRoles = (...roles) => AuthMiddleware.restrictTo(...roles);
}

export const authenticateToken = AuthMiddleware.verifyToken;
export const authorizeRoles = (...roles) => AuthMiddleware.restrictTo(...roles);
export default AuthMiddleware;