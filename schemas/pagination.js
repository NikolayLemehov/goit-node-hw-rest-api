const Joi = require("joi");
const paginationSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1),
  limit: Joi.number()
    .integer()
    .min(1),
});

module.exports = paginationSchema;
