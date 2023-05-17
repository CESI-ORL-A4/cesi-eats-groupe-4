import DeliveryModel from "../model/DeliveryModel";
import DeliveryState from "../model/DeliveryState";
import QueueName from "../rabbitmq/Queues";
import RabbitMQ from "../rabbitmq/RabbitMQ";
import { MongoID } from "../types/mongoose";
import DeliveryAttributesPayload from "../types/payloads/DeliveryAttributesPayload";

export async function createDelivery(payload: DeliveryAttributesPayload) {
    const created = await DeliveryModel.create({...payload, state: DeliveryState.PICKING_UP});
    RabbitMQ.getInstance().then(rabbit => rabbit.send(QueueName.NEW_DELIVERY, JSON.stringify({
        orderId: payload.orderId
    })));
    return created;
}

export async function getAllDeliveries() {
    return await DeliveryModel.find().exec();
}

export async function deliveryExists(_id: MongoID) {
    const count = await DeliveryModel.count({ _id });
    return count > 0;
}

export async function getDeliveryById(id: MongoID) {
    return await DeliveryModel.findById(id).exec();
}

export async function getInProcessDeliveriesForDeliverer(delivererId: number) {
    return await DeliveryModel.find({ delivererId, state: { $ne: DeliveryState.DELIVERED } });
}

export async function getUnderShipmentDeliveriesForDeliverer(delivererId: number) {
    return await DeliveryModel.find({ delivererId, state: DeliveryState.UNDER_SHIPMENT });
}

export async function getDeliveredDeliveriesForDeliverer(delivererId: number) {
    return await DeliveryModel.find({ delivererId, state: DeliveryState.DELIVERED });
}

export async function getAllDeliveriesForDeliverer(delivererId: number) {
    return await DeliveryModel.find({ delivererId });
}

export async function deleteDeliveryById(_id: MongoID) {
    return await DeliveryModel.findOneAndDelete({ _id });
}

export async function updateDelivery(_id: MongoID, payload: { state: DeliveryState }) {
    const updatedDelivery = await DeliveryModel.findOneAndUpdate({ _id }, payload, {
        new: true
    });
    if (updatedDelivery && payload.state === DeliveryState.DELIVERED) {
        RabbitMQ.getInstance().then(rabbit => rabbit.send(QueueName.DELIVERY_CARRIED_OUT, JSON.stringify({
            orderId: updatedDelivery.orderId
        })));
    }
    return updatedDelivery;
}
