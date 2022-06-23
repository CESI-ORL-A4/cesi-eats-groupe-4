const Joi = require('joi');

let emailValidator = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','fr'] } }).required();

export default emailValidator;
