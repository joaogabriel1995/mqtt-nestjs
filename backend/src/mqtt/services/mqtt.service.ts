import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ClientMqtt } from "@nestjs/microservices";
import { MqttClient } from "@nestjs/microservices/external/mqtt-client.interface";

@Injectable()
export class MQTTService implements OnModuleInit {

  private readonly logger = new Logger(MQTTService.name);
  protected myClient: MqttClient;

  constructor(
    @Inject("MQTT_SERVICE") private readonly client: ClientMqtt
  ) { }

  async onModuleInit() {
    await this.client.connect(); // Garantir a conexão antes de qualquer operação
    this.myClient = this.client["mqttClient"];
    // Delegar lógica de inscrição a outro método
    this.setupSubscriptions();
  }

  private setupSubscriptions() {
    this.subscribeToTopic("notifications1");
    // Outros tópicos podem ser adicionados aqui
  }

  subscribeToTopic(topic: string) {
    this.myClient.subscribe(topic, (err) => {
      if (err) {
        this.logger.error(`Falha ao subscrever ao tópico ${topic}:`, err);
      } else {
        this.logger.log(`Subscrito ao tópico ${topic} com sucesso.`);
      }
    });

    this.myClient.on('message', (receivedTopic: string, payload: Buffer) => {
      if (receivedTopic === topic) {
        this.handleMessage(topic, payload);
      }
    });
  }


  private handleMessage(topic: string, payload: Buffer) {
    const message = payload.toString();
    this.logger.log(`Mensagem recebida do tópico '${topic}': ${message}`);
    // Aqui você pode aplicar alguma lógica de negócio para processar a mensagem
  }


  publishMessage(topic: string, message: string) {
    this.client.emit(topic, message);
    this.logger.log(`Mensagem publicada no tópico '${topic}': ${message}`);
  }
}
