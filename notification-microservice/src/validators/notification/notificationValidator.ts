const Joi = require('joi');

let notificationValidator = Joi.object({
    userId: Joi.string().required(),
    description: Joi.string().required(),
});

export default notificationValidator;
