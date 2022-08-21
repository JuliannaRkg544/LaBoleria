import cakeSchema from "../schemas/cakeSchema.js";

export default function cakeValidation(req,res,next){
    const cake = req.body
    const validateCake = cakeSchema.validate(cake)
    if(validateCake.error){
         res.sendStatus(400)
         console.log(validateCake.error.details)
         return
    }
    next()
}
