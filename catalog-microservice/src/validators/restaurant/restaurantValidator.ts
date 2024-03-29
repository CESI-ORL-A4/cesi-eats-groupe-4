const Joi = require('joi');

let restaurantValidator = Joi.object({
    ownerId: Joi.string().required(),
    address: Joi.string()
        .min(1)
        .max(255)
        .required(),
    name: Joi.string()
        .min(1)
        .max(100)
        .required(),
    description: Joi.string()
        .min(1)
        .max(255),
    imageName: Joi.string()
        .min(1)
        .max(255),
    imageData: Joi.any(),

});

export default restaurantValidator;
