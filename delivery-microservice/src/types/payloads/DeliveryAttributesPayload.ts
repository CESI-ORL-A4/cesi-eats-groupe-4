import mongoose from "mongoose";

type DeliveryAttributesPayload = {
    delivererId: number;
    orderId: mongoose.Types.ObjectId;
    state: DeliveryState;
}

export default DeliveryAttributesPayload;