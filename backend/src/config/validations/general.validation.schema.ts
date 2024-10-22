import * as Joi from 'joi';
import { serverValidationSchema } from './server.validation.schema';
import { mqttValidationSchema } from './mqtt.validation.schema';

export const generalValidationSchema = Joi.object({
  SERVER_PORT: serverValidationSchema.extract('SERVER_PORT'),
  MQTT_URL: mqttValidationSchema.extract('MQTT_URL'),
  MQTT_PORT: mqttValidationSchema.extract('MQTT_PORT'),
  MQTT_HOST: mqttValidationSchema.extract('MQTT_HOST'),
});
