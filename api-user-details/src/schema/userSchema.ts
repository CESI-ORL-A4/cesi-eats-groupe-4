const Joi = require('joi');

let userSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(1)
        .max(30)
        .required(),
    lastName: Joi.string()
        .alphanum()
        .min(1)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','fr'] } }).required(),
    birthdate: Joi.date()
        .required(),
    phone: Joi.string()
        .alphanum()
        .min(1)
        .max(16)
        .required(),
    address: Joi.string()
        .alphanum()
        .min(1)
        .max(200)
        .required(),
});

export default userSchema;
