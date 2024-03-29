const Joi = require('joi');

let restaurantUpdateValidator = Joi.object({
    ownerId: Joi.string(),
    address: Joi.string()
        .min(1)
        .max(255),
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
    imageData: Joi.object(),
    imageLink: Joi.string()
        .min(1)
        .max(255),

});

export default restaurantUpdateValidator;
