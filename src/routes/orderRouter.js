import { Router } from "express";
import { registerOrder } from "../controllers/orderController.js";
import { orderValidation } from "../middlewares/orderMiddleware.js";

const orderRouter = Router()

orderRouter.post("/order", orderValidation ,registerOrder)

export default orderRouter;