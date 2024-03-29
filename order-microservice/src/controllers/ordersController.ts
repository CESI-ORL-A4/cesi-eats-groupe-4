import OrderModel from "../model/OrderModel";
import OrderState from "../model/OrderState";
import OrderAttributesPayload from "../types/payloads/OrderAttributesPayload";
import RabbitMQ from "../rabbitmq/RabbitMQ";
import QueueName from "../rabbitmq/Queues";

export async function createOrder(payload: OrderAttributesPayload) {
    RabbitMQ.getInstance().then(rabbit => rabbit.send(QueueName.CREATE_ORDER_NOTIFICATION, JSON.stringify({
        restaurantId: payload.restaurantId,
        userId: payload.userId,
    })));
    return await OrderModel.create({
        ...payload,
        state: OrderState.WAITING_VALIDATION,
        createdAt: new Date()
    });
}

export async function getAllOrders() {
    return await OrderModel.find().exec();
}

export async function getAllReadyToShipOrders() {
    return await OrderModel.find({ state: OrderState.READY_TO_SHIP }).exec();
}

export async function orderExists(orderId: string) {
    const count = await OrderModel.count({_id: orderId});
    return count > 0;
}

export async function getOrderById(orderId: string) {
    return await OrderModel.findById(orderId).exec();
}

export async function getAllOrdersByRestaurantId(restaurantId: string) {
    return await OrderModel.find({ restaurantId });
}

export async function getAllInProcessOrdersByRestaurantId(restaurantId: string) {
    return await OrderModel.find({ restaurantId, state: { $ne: OrderState.DELIVERED } });
}

export async function getRestaurantOrderHistory(restaurantId: string) {
    return await OrderModel.find({ restaurantId, state: OrderState.DELIVERED });
}

export async function getAllOrdersByUsersId(userId: string) {
    return await OrderModel.find({ userId });
}

export async function deleteOrderById(orderId: string) {
    return await OrderModel.findOneAndDelete({ _id: orderId });
}

export async function updateOrder(orderId: string, payload: any) {
    if (payload.state){
        let order = await getOrderById(orderId);
        RabbitMQ.getInstance().then(rabbit => rabbit.send(QueueName.MODIFY_ORDER_NOTIFICATION, JSON.stringify({
            restaurantId: order?.restaurantId,
            userId: order?.userId,
            state: getOrderStateFrench(payload?.state),
        })));
    }

    return await OrderModel.findOneAndUpdate({ _id: orderId }, payload);
}

function getOrderStateFrench(orderState:string){
    if (!orderState)
        return "";
    switch (orderState) {
        case "WAITING_VALIDATION":
            return OrderStateFrench.WAITING_VALIDATION;
            break;
        case "IN_PRODUCTION":
            return OrderStateFrench.IN_PRODUCTION;
            break;
        case "READY_TO_SHIP":
            return OrderStateFrench.READY_TO_SHIP;
            break;
        case "WAITING_PICKUP":
            return OrderStateFrench.WAITING_PICKUP;
            break;
        case "UNDER_SHIPMENT":
            return OrderStateFrench.UNDER_SHIPMENT;
            break;
        case "DELIVERED":
            return OrderStateFrench.DELIVERED;
            break;
        default:
            return ""
            break;
    }
}

enum OrderStateFrench {
    WAITING_VALIDATION = "en attente de validation",
    IN_PRODUCTION = "en production",
    READY_TO_SHIP = "prête à être envoyé",
    WAITING_PICKUP = "en attente du livreur",
    UNDER_SHIPMENT = "en cours de livraison",
    DELIVERED = "livrée"
}
