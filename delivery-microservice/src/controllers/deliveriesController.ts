import DeliveryModel from "../model/DeliveryModel";
import DeliveryState from "../model/DeliveryState";
import { MongoID } from "../types/mongoose";
import DeliveryAttributesPayload from "../types/payloads/DeliveryAttributesPayload";

export async function createDelivery(payload: DeliveryAttributesPayload) {
    return await DeliveryModel.create(payload);
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

export async function getUnderShipmentDeliveriesForDeliverer(deliverId: number) {
    return await DeliveryModel.findOne({ deliverId, state: DeliveryState.UNDER_SHIPMENT });
}

export async function getDeliveredDeliveriesForDeliverer(deliverId: number) {
    return await DeliveryModel.findOne({ deliverId, state: DeliveryState.DELIVERED });
}

export async function getAllDeliveriesForDeliverer(deliverId: number) {
    return await DeliveryModel.findOne({ deliverId });
}

export async function deleteDeliveryById(_id: MongoID) {
    return await DeliveryModel.findOneAndDelete({ _id });
}

export async function updateDelivery(_id: MongoID, payload: { state: DeliveryState }) {
    return await DeliveryModel.findOneAndUpdate({ _id }, payload);
}
