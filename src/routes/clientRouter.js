import { Router } from "express";
import { signupClient } from "../controllers/clientController.js";
import { clientValidation } from "../middlewares/clientMiddleware.js";

const clientRouter = Router()

clientRouter.post("/clients", clientValidation, signupClient)
clientRouter.get("/clients/:id/orders")

export default clientRouter