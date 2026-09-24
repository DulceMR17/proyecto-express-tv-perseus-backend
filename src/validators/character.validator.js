import { body, validationResult } from 'express-validator';

export const characterValidationRules = [
  body('programId').notEmpty().withMessage('El programa es obligatorio.'),
  body('name').notEmpty().withMessage('El nombre del personaje es obligatorio.').isLength({ min: 2, max: 120 }).withMessage('El nombre debe tener entre 2 y 120 caracteres.'),
  body('role').notEmpty().withMessage('El rol es obligatorio.').isIn(['principal', 'secundario']).withMessage('El rol debe ser principal o secundario.'),
  body('description').notEmpty().withMessage('La descripción es obligatoria.').isLength({ min: 10, max: 2000 }).withMessage('La descripción debe tener entre 10 y 2000 caracteres.'),
  body('actorId').notEmpty().withMessage('El actor es obligatorio.')
];

export const validateCharacter = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: errors.array().map((err) => ({ field: err.path, message: err.msg }))
    });
  }
  next();
};
