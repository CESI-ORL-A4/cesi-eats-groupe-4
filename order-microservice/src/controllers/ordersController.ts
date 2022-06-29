import OrderModel from "../model/OrderModel";
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
        createdAt: new Date()
    });
}

export async function getAllOrders() {
    return await OrderModel.find().exec();
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
            state: payload?.state,
        })));
    }

    return await OrderModel.findOneAndUpdate({ _id: orderId }, payload);
}
