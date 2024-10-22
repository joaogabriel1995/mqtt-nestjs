import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const configService = new ConfigService();
  const logger = new Logger(AppModule.name);

  const port = configService.get<number>('SERVER_PORT');

  const app = await NestFactory.create(AppModule);
  await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.MQTT,
    options: {
      url: configService.get<string>('MQTT_URL'),
    },
  });

  await app.startAllMicroservices(); // Inicia todos os microservices

  await app.listen(port);
  logger.log(`Listening on port ${port}`);
}
bootstrap();
