import { body, validationResult } from 'express-validator';

// Reglas de validación
export const categoryValidationRules = [
    body('name')
        .notEmpty().withMessage('El nombre de la categoría es obligatorio')
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    body('description')
        .optional()
        .isString().withMessage('La descripción debe ser un texto')
        .isLength({ max: 250 }).withMessage('La descripción no puede exceder 250 caracteres')
];

// Middleware para verificar los errores resultantes de las reglas
export const validateCategory = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};