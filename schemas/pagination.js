const Joi = require("joi");
const paginationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().required(),
});

module.exports = paginationSchema;
