const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true
    },
});

export default mongoose.model('notification', notificationSchema);
