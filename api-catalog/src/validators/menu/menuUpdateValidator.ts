const Joi = require('joi');

let menuUpdateValidator = Joi.object({
    idRestaurant: Joi.string()
        .min(1)
        .max(255),
    name: Joi.string()
        .min(1)
        .max(100),
    price: Joi.string()
        .min(1)
        .max(100),
    currency: Joi.string()
        .min(1)
        .max(100),
    description: Joi.string()
        .min(1)
        .max(255),
    imageName: Joi.string()
        .min(1)
        .max(255),
    imageData: Joi.any(),

});

export default menuUpdateValidator;
