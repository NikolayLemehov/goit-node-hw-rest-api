const Joi = require("joi");
const paginationSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1),
  limit: Joi.number()
    .integer()
    .min(1),
  favorite: Joi.string(),
});

module.exports = paginationSchema;
