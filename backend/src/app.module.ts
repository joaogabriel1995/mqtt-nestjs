import { Module } from '@nestjs/common';

import { ConfigAppModule } from './config/config.module';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [
    ConfigAppModule,
    MqttModule
  ],
  controllers: [],
})
export class AppModule {}
