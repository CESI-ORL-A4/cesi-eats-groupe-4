const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: false,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: false,
    }
});

export default articleSchema;
