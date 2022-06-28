const Joi = require('joi');

let userValidator = Joi.object({
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
    role: Joi.string()
        .valid(...["BASIC", "DELIVERER", "OWNER", "COMMERCIAL", "TECHNIC"])
        .required(),
    password: Joi.string()
        .required(),
    birthdate: Joi.string()
        .required(),
    phone: Joi.string()
        .alphanum()
        .min(1)
        .max(16)
        .required(),
    address: Joi.string()
        .min(1)
        .max(200)
        .required(),
    sponsorship: Joi.date(),
});

export default userValidator;
