import mongoose from "mongoose";
import OrderState from "../../model/OrderState";

type OrderAttributesPayload = {
    restaurantId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    menuIds: mongoose.Types.ObjectId[];
    state: OrderState;
}

export default OrderAttributesPayload;
