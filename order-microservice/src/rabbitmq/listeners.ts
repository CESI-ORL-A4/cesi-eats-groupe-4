import { ConsumeMessage } from "amqplib";
import RabbitMQ from "./RabbitMQ";
import QueueName from "./Queues";
import DeliveryEventsPayload from "./DeliveryEventsPayload";
import { updateOrder } from "../controllers/ordersController";
import OrderState from "../model/OrderState";

type Acknowledge = () => void;

export default function registerRabbitMQListeners() {
    RabbitMQ.getInstance().then(rabbit => {
        subscribeMessage(rabbit, QueueName.NEW_DELIVERY, handleNewDelivery);
        subscribeMessage(rabbit, QueueName.DELIVERY_CARRIED_OUT, handleDeliveryCarriedOut);
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

async function handleNewDelivery(payload: DeliveryEventsPayload, ack: Acknowledge) {
    console.log("RABBITMQ: NewDelivery event received, updating order state...");
    await updateOrder(payload.orderId, { state: OrderState.WAITING_PICKUP });
    ack();
}

async function handleDeliveryCarriedOut(payload: DeliveryEventsPayload, ack: Acknowledge) {
    console.log("RABBITMQ: DeliveryCarriedOut event received, updating order state...");
    await updateOrder(payload.orderId, { state: OrderState.DELIVERED });
    ack();
}
