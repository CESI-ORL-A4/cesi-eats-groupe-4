const Joi = require('joi');

let emailSchema = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','fr'] } }).required();

export default emailSchema;
