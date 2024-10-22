import * as Joi from 'joi';

export const mqttValidationSchema = Joi.object({
  MQTT_URL: Joi.string().required(),
  MQTT_PORT: Joi.number().required().default(1883),
  MQTT_HOST: Joi.string().required(),
});
