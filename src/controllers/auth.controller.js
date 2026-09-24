import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

class AuthController {
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          status: 'fail',
          message: 'Credenciales incorrectas.'
        });
      }

      const isValidPassword = await UserModel.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          status: 'fail',
          message: 'Credenciales incorrectas.'
        });
      }

      // Firma JWT
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // Opciones de Cookie
      const cookieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 día
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      };

      res.cookie('auth_token', token, cookieOptions);

      return res.status(200).json({
        status: 'success',
        message: 'Sesión iniciada correctamente.',
        data: {
          user: {
            id: user._id,
            email: user.email,
            role: user.role
          }
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error en el servidor al intentar iniciar sesión.',
        error: error.message
      });
    }
  };

  static logout = (req, res) => {
    res.clearCookie('auth_token');
    return res.status(200).json({
      status: 'success',
      message: 'Sesión cerrada correctamente.'
    });
  };

  static getProfile = async (req, res) => {
    return res.status(200).json({
      status: 'success',
      data: {
        user: req.user
      }
    });
  };
}

export default AuthController;