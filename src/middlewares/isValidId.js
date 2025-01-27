import { param } from 'express-validator';
import { validationResult } from 'express-validator';

export const isValidId = async (req, res, next) => {
  const idValidation = param('contactId')
    .isMongoId()
    .withMessage('Invalid contact ID');
  await idValidation.run(req);

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
