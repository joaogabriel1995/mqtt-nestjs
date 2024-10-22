import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { generalValidationSchema } from './validations/general.validation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: generalValidationSchema,
    }),
  ],
})
export class ConfigAppModule {}
