import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema({
    delivererId: {
        type: Number,
        required: true
    },
    orderId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    state: {
        type: String,
        required: true
    }
});

export default mongoose.model("deliveries", DeliverySchema);
