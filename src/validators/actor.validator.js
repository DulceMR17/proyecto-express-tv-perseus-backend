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

export const actorValidationRules = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio.')
    .isString().withMessage('El nombre debe ser texto.')
    .isLength({ min: 2, max: 120 }).withMessage('El nombre debe tener entre 2 y 120 caracteres.'),

  body('biography')
    .notEmpty().withMessage('La biografía es obligatoria.')
    .isString().withMessage('La biografía debe ser texto.')
    .isLength({ min: 10, max: 2000 }).withMessage('La biografía debe tener entre 10 y 2000 caracteres.'),

  body('photo')
    .optional({ checkFalsy: true })
    .custom((value) => isValidMediaUrl(value)).withMessage('La URL de la foto no es válida.')
];

export const validateActor = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: errors.array().map((err) => ({ field: err.path, message: err.msg }))
    });
  }
  next();
};
