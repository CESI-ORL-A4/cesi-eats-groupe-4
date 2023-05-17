import { ConsumeMessage } from "amqplib";
import RabbitMQ from "./RabbitMQ";
import QueueName from "./Queues";
import AddNotificationPayload from "../types/notification/AddNotificationPayload";
import {createNotification} from "../controllers/notificationController";

type Acknowledge = () => void;

export default function registerRabbitMQListeners() {
    RabbitMQ.getInstance().then(rabbit => {
        subscribeMessage(rabbit, QueueName.NEW_NOTIFICATION, handleNewNotification);
    });
}

function subscribeMessage(
    rabbit: RabbitMQ, queueName: QueueName, handler: (payload: any, ack: Acknowledge) => void
) {
    rabbit.subscribe(queueName, (message: ConsumeMessage, ack: () => void) => {
        handler(JSON.parse(message.content.toString()), ack);
    });
    console.log("RABBITMQ: subscribed to queue " + queueName);
}

async function handleNewNotification(payload: AddNotificationPayload, ack: Acknowledge) {
    if (payload.userId) {
        const notification = await createNotification(payload)
        console.log("FROM RABBITMQ: Created new NOTIFICATION with id " + notification._id);
    } else {
        console.log("ERROR: CREATION NOTIFICATION");
        console.log(payload);
    }
    ack();
}

