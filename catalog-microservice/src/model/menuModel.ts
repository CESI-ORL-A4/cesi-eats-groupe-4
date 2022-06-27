import { string } from "joi";
import articleModel from "./articleModel";

const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
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
        type: [],
        required: false,
    }
});

export default menuSchema;
