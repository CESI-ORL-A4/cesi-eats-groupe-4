const Joi = require('joi');

let sponsorValidator =
    Joi.object({
        sponsorship: Joi.date(),
        email:  Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','fr'] } }).required(),});





export default sponsorValidator;
