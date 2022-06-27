const Joi = require('joi');

let menuValidator = Joi.object({
    name: Joi.string()
        .min(1)
        .max(100)
        .required(),
    price: Joi.string()
        .min(1)
        .max(100)
        .required(),
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
    articles: Joi.array().required(),

});
export default menuValidator;
