import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MQTTService } from './services/mqtt.service';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {

          name: 'MQTT_SERVICE',
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            transport: Transport.MQTT,
            options: {
              url: configService.get<string>('MQTT_URL'), // Define a URL do broker MQTT
            },
          }),
          
        },
      ],
    }),
  ],
  providers: [MQTTService],
  controllers: [],
  exports: [MQTTService],
})
export class MqttModule {}
