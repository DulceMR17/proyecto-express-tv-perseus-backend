import { body } from 'express-validator';

class AuthDTO {
  static loginValidation() {
    return [
      body('email')
        .trim()
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido.')
        .normalizeEmail(),
      body('password')
        .trim()
        .notEmpty().withMessage('La contraseña es requerida.')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
    ];
  }
}

export default AuthDTO;