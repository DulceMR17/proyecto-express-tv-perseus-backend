import { body, validationResult } from 'express-validator';

export const chapterValidationRules = [
  body('programId').notEmpty().withMessage('El programa es obligatorio.'),
  body('number').isNumeric().withMessage('El número del capítulo debe ser numérico.'),
  body('title').notEmpty().withMessage('El título es obligatorio.').isLength({ min: 2, max: 140 }).withMessage('El título debe tener entre 2 y 140 caracteres.'),
  body('synopsis').notEmpty().withMessage('La sinopsis es obligatoria.').isLength({ min: 10, max: 2000 }).withMessage('La sinopsis debe tener entre 10 y 2000 caracteres.'),
  body('duration').optional({ checkFalsy: true }).isString().withMessage('La duración debe ser texto.').isLength({ max: 50 }).withMessage('La duración no puede exceder 50 caracteres.'),
  body('season').optional({ checkFalsy: true }).isNumeric().withMessage('La temporada debe ser numérica.')
];

export const validateChapter = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: errors.array().map((err) => ({ field: err.path, message: err.msg }))
    });
  }
  next();
};
