const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
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
    },
    articles: {
        type: Array,
        required: false,
    }
});

export default menuSchema;
