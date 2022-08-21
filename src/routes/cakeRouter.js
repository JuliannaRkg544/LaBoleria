import { Router } from "express";
import { createCake } from "../controllers/cakeController.js";
import cakeValidation from "../middlewares/cakeMiddleware.js";

const cakeRouter = Router()

cakeRouter.post("/cakes", cakeValidation ,createCake )

export default cakeRouter
