const { Joi, celebrate, errors } = require("celebrate");
const validator = require("validator");

// Custom URL validator using the 'validator' package
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Middleware to log validation errors globally
module.exports.logValidationErrors = (err, req, res, next) => {
  if (err.joi) {
    console.error("Validation error details:", err.joi.details);
  }
  next(err);
};

// Validate clothing item creation
module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid URL',
    }),
  }),
});

// Validate user creation
module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// Validate login credentials
module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// Validate IDs
module.exports.validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required().messages({
      "string.empty": 'The "id" field must be filled in',
      "string.length": 'The "id" field must be 24 characters long',
      "string.hex": 'The "id" field must be a hexadecimal value',
    }),
  }),
});