const Joi = require('joi')

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(32).required()
    })

    const {error} = schema.validate(data)
    return error
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(32).required()
    })

    const {error} = schema.validate(data)
    return error 
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation