import { body, validationResult } from 'express-validator';

const isValidMediaUrl = (value) => {
  if (!value || value.trim() === '') return true;

  const normalized = value.trim();
  const urlCandidate = /^https?:\/\//i.test(normalized) || /^www\./i.test(normalized)
    ? normalized
    : `https://${normalized}`;

  try {
    const parsed = new URL(urlCandidate);
    return ['http:', 'https:'].includes(parsed.protocol) && parsed.hostname.length > 0;
  } catch {
    return false;
  }
};

export const producerValidationRules = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio.')
    .isString().withMessage('El nombre debe ser texto.')
    .isLength({ min: 2, max: 120 }).withMessage('El nombre debe tener entre 2 y 120 caracteres.'),

  body('country')
    .optional({ checkFalsy: true })
    .isString().withMessage('El país debe ser texto.')
    .isLength({ max: 120 }).withMessage('El país no puede exceder 120 caracteres.'),

  body('foundationYear')
    .optional({ checkFalsy: true })
    .isNumeric().withMessage('El año de fundación debe ser numérico.'),

  body('description')
    .optional({ checkFalsy: true })
    .isString().withMessage('La descripción debe ser texto.')
    .isLength({ max: 1500 }).withMessage('La descripción no puede exceder 1500 caracteres.'),

  body('logo')
    .optional({ checkFalsy: true })
    .custom((value) => isValidMediaUrl(value)).withMessage('La URL del logo no es válida.')
];

export const validateProducer = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: errors.array().map((err) => ({ field: err.path, message: err.msg }))
    });
  }
  next();
};
