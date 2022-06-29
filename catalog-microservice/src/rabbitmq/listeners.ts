import { ConsumeMessage } from "amqplib";
import RabbitMQ from "./RabbitMQ";
import QueueName from "./Queues";
import CreateOrderNotificationPayload from "./CreateOrderNotificationPayload";
import ChangeOrderNotificationPayload from "./ChangeOrderNotificationPayload";
import {getRestaurant} from "../controllers/restaurantController";

type Acknowledge = () => void;

export default function registerRabbitMQListeners() {
    RabbitMQ.getInstance().then(rabbit => {
        subscribeMessage(rabbit, QueueName.CREATE_ORDER_NOTIFICATION, handleCreateOrderNotification);
        subscribeMessage(rabbit, QueueName.MODIFY_ORDER_NOTIFICATION, handleModifyOrderNotification);
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

async function handleCreateOrderNotification(payload: CreateOrderNotificationPayload, ack: Acknowledge) {
    if (payload.restaurantId) {
        const restaurant = await getRestaurant(payload.restaurantId);
        RabbitMQ.getInstance().then(rabbit => rabbit.send(QueueName.NEW_NOTIFICATION, JSON.stringify({userId: restaurant.ownerId,description: "Nouvelle commande"})));
        console.log("FROM RABBITMQ: Create order new NOTIFICATION");
    } else {
        console.log("ERROR: CREATION NOTIFICATION Failed ORDER");
        console.log(payload);
    }
    ack();
}

async function handleModifyOrderNotification(payload: ChangeOrderNotificationPayload, ack: Acknowledge) {
    if (payload.userId) {
        const restaurant = await getRestaurant(payload.restaurantId);
        RabbitMQ.getInstance().then(rabbit => rabbit.send(QueueName.NEW_NOTIFICATION, JSON.stringify({userId: restaurant.ownerId,description: "Changement d'état de la commande : " +payload.state})));
        RabbitMQ.getInstance().then(rabbit => rabbit.send(QueueName.NEW_NOTIFICATION, JSON.stringify({userId: restaurant.userId,description: "Changement d'état de votre commande : " +payload.state})));
    } else {
        console.log("ERROR: NOTIFICATION MODIFY_ORDER_NOTIFICATION ");
        console.log(payload);
    }
    ack();
}

