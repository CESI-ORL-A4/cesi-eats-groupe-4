import { createUser, deleteUser, updateUser, userExistsById } from "../controllers/userController";
import { ConsumeMessage } from "amqplib";
import UserAttributesPayload from "../types/user/UserAttributesPayload";
import { DeleteUserPayload } from "./payloadTypes";
import RabbitMQ from "./RabbitMQ";
import QueueName from "./Queues";

type Acknowledge = () => void;

export default function registerRabbitMQListeners() {
    RabbitMQ.getInstance().then(rabbit => {
        subscribeMessage(rabbit, QueueName.NEW_USER, handleNewUser);
        subscribeMessage(rabbit, QueueName.UPDATE_USER, handleUpdateUser);
        subscribeMessage(rabbit, QueueName.DELETE_USER, handleDeleteUser);
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

async function handleNewUser(payload: UserAttributesPayload, ack: Acknowledge) {
    if (!await userExistsById(payload.userId)) {
        await createUser(payload);
        console.log("FROM RABBITMQ: Created new user with id " + payload.userId);
    } else {
        console.log("FROM RABBITMQ: User with id " + payload.userId + " already exists");
    }
    ack();
}

async function handleUpdateUser(payload: UserAttributesPayload, ack: Acknowledge) {
    await updateUser(payload);
    console.log("FROM RABBITMQ: Updated user with id " + payload.userId);
    ack();
}

async function handleDeleteUser(payload: DeleteUserPayload, ack: Acknowledge) {
    await deleteUser(payload.userId);
    console.log("FROM RABBITMQ: Deleted user with id " + payload.userId);
    ack();
}

