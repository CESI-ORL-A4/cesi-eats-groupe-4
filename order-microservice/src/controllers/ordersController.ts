import OrderModel from "../model/OrderModel";
import OrderState from "../model/OrderState";
import OrderAttributesPayload from "../types/payloads/OrderAttributesPayload";

export async function createOrder(payload: OrderAttributesPayload) {
    return await OrderModel.create({
        ...payload,
        state: OrderState.WAITING_VALIDATION,
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

export async function getAllInProcessOrdersByRestaurantId(restaurantId: string) {
    return await OrderModel.find({ restaurantId, state: { $ne: OrderState.DELIVERED } });
}

export async function getAllOrdersByUsersId(userId: string) {
    return await OrderModel.find({ userId });
}

export async function deleteOrderById(orderId: string) {
    return await OrderModel.findOneAndDelete({ _id: orderId });
}

export async function updateOrder(orderId: string, payload: OrderAttributesPayload) {
    return await OrderModel.findOneAndUpdate({ _id: orderId }, payload, {
        upsert: true,
        new: true
    });
}
