import mongoose from "mongoose";
import DeliveryState from "../../model/DeliveryState";

type DeliveryAttributesPayload = {
    delivererId: number;
    orderId: mongoose.Types.ObjectId;
    state: DeliveryState;
}

export default DeliveryAttributesPayload;
