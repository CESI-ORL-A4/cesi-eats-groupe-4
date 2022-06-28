const Joi = require('joi');

let articleValidator = Joi.object({
    idRestaurant: Joi.string()
        .min(1)
        .max(255),
    name: Joi.string()
        .min(1)
        .max(100)
        .required(),
    price: Joi.string()
        .min(1)
        .max(100),
    description: Joi.string()
        .min(1)
        .max(255),
    currency: Joi.string()
        .min(1)
        .max(255),
    type: Joi.string()
        .min(1)
        .max(255),

});
export default articleValidator;
