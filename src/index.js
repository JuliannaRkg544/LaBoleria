import express, {json} from "express"
import cors from "cors"
import cakeRouter from "./routes/cakeRouter.js"
import clientRouter from "./routes/clientRouter.js"
import orderRouter from "./routes/orderRouter.js"

const server = express()

server.use(cors())
server.use(json())
server.use(cakeRouter)
server.use(clientRouter)
server.use(orderRouter)

server.listen(process.env.PORT, ()=>{
    console.log("server on air on port: ", process.env.PORT)
})