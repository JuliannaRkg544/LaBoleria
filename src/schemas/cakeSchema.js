import joi from "joi"

const cakeSchema = joi.object({
    name: joi.string().min(2).required() ,
    image: joi.required(),
    price:joi.number().min(1).required(),
    description: joi.string()
})

export default cakeSchema;
