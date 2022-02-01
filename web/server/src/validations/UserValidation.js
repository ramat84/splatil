const Joi = require('joi')
const {validate} = require('./Validation')

module.exports = {
    login(req,res,next) {
        const schema = Joi.object({
            user: Joi.string().min(3).max(255),
            password: Joi.string().min(8).max(255)
        })

        validate(schema, req, res, next)
    },

    signup(req,res,next) {
        const schema = Joi.object({
            email: Joi.string().min(6).max(255).email(),
            nickname: Joi.string().min(3).max(255),
            password: Joi.string().min(8).max(255)
        })

        validate(schema, req, res, next)
    },

}
