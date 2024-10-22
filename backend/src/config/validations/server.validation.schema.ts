import * as Joi from 'joi';

export const serverValidationSchema = Joi.object({
  SERVER_PORT: Joi.number().required().default(4000),
});
