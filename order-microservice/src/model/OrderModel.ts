import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    menuIds: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    state: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date
    }
});

export default mongoose.model("orders", OrderSchema);
