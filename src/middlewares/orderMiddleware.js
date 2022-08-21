import orderSchema from "../schemas/orderSchema.js";

export function orderValidation(req, res,next){
    const order = req.body
    const validateOrder = orderSchema.validate(order, {abortEarly: false})
    
    if(validateOrder.error){
        console.log(validateOrder.error.details)
        return res.sendStatus(400)
    }

    next()
}
