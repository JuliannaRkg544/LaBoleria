import { Router } from "express";
import { createCake, getCakes } from "../controllers/cakeController.js";
import cakeValidation from "../middlewares/cakeMiddleware.js";

const cakeRouter = Router()

cakeRouter.post("/cakes", cakeValidation ,createCake )
cakeRouter.get("/cakes", getCakes)

export default cakeRouter
