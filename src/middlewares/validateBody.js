import { validationResult } from 'express-validator';

export const validateBody = (schema) => {
  return async (req, res, next) => {
    await schema.run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: 'Validation error',
        errors: errors.array(),
      });
    }

    next();
  };
};
