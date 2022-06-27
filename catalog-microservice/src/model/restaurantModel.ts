import { string } from "joi";
import articleSchema from "./articleModel";
import menuSchema from "./menuModel";

const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    articles: [],
    menus: []
});

export default mongoose.model('restaurant', restaurantSchema);
