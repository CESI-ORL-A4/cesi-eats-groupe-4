import { ConsumeMessage } from "amqplib";
import RabbitMQ from "./RabbitMQ";
import QueueName from "./Queues";
type Acknowledge = () => void;

function subscribeMessage(
    rabbit: RabbitMQ, queueName: QueueName, handler: (payload: any, ack: Acknowledge) => void
) {
    rabbit.subscribe(queueName, (message: ConsumeMessage, ack: () => void) => {
        handler(JSON.parse(message.content.toString()), ack);
    });
    console.log("RABBITMQ: subscribed to queue " + queueName);
}

