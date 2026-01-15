import express from "express"
import mongoose from "mongoose"
import userRouter from "./router/userRoter.js"
import productRouter from "./router/productRouter.js"
import authorizeUser from "./lib/jwtMiddleware.js";
import cors from 'cors'
import dotenv from "dotenv"

dotenv.config()

const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI).then(
  ()=>{
    console.log("connected to MongoDB")
  }
).catch(
    ()=>{
        console.log("Error connecting to MongoDB")
    }
)



const app = express()

app.use( cors() )

app.use(express.json())

app.use(authorizeUser)


app.use("/api/users", userRouter)
app.use("/api/products" , productRouter)

app.listen(3000 ,
    ()=>{
        console.log("server is running on port 3000")
    }
)

