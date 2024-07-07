const { body, validationResult } = require('express-validator');

const registerValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ];
};

const loginValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('password').notEmpty().withMessage('Password is required')
  ];
};

const uploadValidationRules = () => {
  return [
    body('companyName').notEmpty().withMessage('Company name is required'),
    body('collegeName').notEmpty().withMessage('College name is required'),
    body('year').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Invalid year')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
  uploadValidationRules,
  validate
};