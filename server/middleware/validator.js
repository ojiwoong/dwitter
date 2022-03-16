import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  console.log(errors);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ message: errors.array() });
};
