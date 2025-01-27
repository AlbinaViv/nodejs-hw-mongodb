import { param } from 'express-validator';
import { validationResult } from 'express-validator';

export const isValidId = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid ID',
      errors: errors.array(),
    });
  }

  next();
};
