import { Router } from "express";
import { getOrder, registerOrder } from "../controllers/orderController.js";
import { orderValidation } from "../middlewares/orderMiddleware.js";

const orderRouter = Router()

orderRouter.post("/order", orderValidation ,registerOrder)
orderRouter.get("/order", getOrder )

export default orderRouter;