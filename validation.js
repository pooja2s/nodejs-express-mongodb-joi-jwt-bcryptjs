//Validation
const Joi = require('@hapi/joi');

//Register Validation
const registrationValidation = (data) =>{

    const schema = Joi.object({
        email:Joi.string().min(3).max(50).required().email(),
        username:Joi.string().min(3).max(50).required(),
        password:Joi.string().min(6).max(1024).required(),
        phone:Joi.string().min(10).max(12).required(),
        firstName:Joi.string().min(3).max(20).required(),
        lastName:Joi.string().min(3).max(20).required(),
        address:Joi.string().required(),
        city:Joi.string().required(),
        state:Joi.string().required(),
        country:Joi.string().required(),
        zipcode:Joi.string().min(6).max(10).required()
    });

    return schema.validate(data);
}


//Register Validation
const loginValidation = (data) =>{

    const schema = Joi.object({
        email:Joi.string().min(3).max(50).required().email(),
        password:Joi.string().min(6).max(1024).required()
    });

    return schema.validate(data);
}

//Register Validation
const addPostValidation = (data) =>{

    const schema = Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required()
    });

    return schema.validate(data);
}

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
module.exports.addPostValidation = addPostValidation;
    