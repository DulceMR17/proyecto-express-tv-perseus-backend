import { body, validationResult } from 'express-validator';

const isValidMediaUrl = (value) => {
  if (!value || value.trim() === '') return true;

  const normalized = value.trim();
  const urlCandidate = /^https?:\/\//i.test(normalized) || /^www\./i.test(normalized)
    ? normalized
    : `https://${normalized}`;

  try {
    const parsed = new URL(urlCandidate);
    const isHttp = ['http:', 'https:'].includes(parsed.protocol);
    const isYouTube = /(?:youtube\.com|youtu\.be|youtube-nocookie\.com)/i.test(parsed.hostname);
    return isHttp && (isYouTube || parsed.hostname.length > 0);
  } catch {
    return false;
  }
};

export const programValidationRules = [
  body('title')
    .notEmpty().withMessage('El título es obligatorio.')
    .isString().withMessage('El título debe ser texto.')
    .isLength({ min: 2, max: 120 }).withMessage('El título debe tener entre 2 y 120 caracteres.'),

  body('synopsis')
    .notEmpty().withMessage('La sinopsis es obligatoria.')
    .isString().withMessage('La sinopsis debe ser texto.')
    .isLength({ min: 10, max: 1500 }).withMessage('La sinopsis debe tener entre 10 y 1500 caracteres.'),

  body('categoryId')
    .notEmpty().withMessage('La categoría es obligatoria.')
    .isMongoId().withMessage('La categoría seleccionada no es válida.'),

  body('poster')
    .optional({ checkFalsy: true })
    .custom((value) => isValidMediaUrl(value)).withMessage('La URL del poster no es válida.'),

  body('trailer')
    .optional({ checkFalsy: true })
    .custom((value) => isValidMediaUrl(value)).withMessage('La URL del trailer no es válida.'),

  body('producer')
    .optional({ checkFalsy: true })
    .isString().withMessage('La productora debe ser texto.')
    .isLength({ max: 120 }).withMessage('La productora no puede exceder 120 caracteres.')
];

export const validateProgram = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};
