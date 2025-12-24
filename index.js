import express from "express"
import mongoose from "mongoose"
import userRouter from "./router/userRoter.js"
import productRouter from "./router/productRouter.js"
import authorizeUser from "./lib/jwtMiddleware.js";

const mongoURI = "mongodb+srv://admin:1234@cluster0.y06jljj.mongodb.net/?appName=Cluster0"
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

app.use(express.json())

app.use(authorizeUser)


app.use("/users", userRouter)
app.use("/products" , productRouter)

app.listen(3000 ,
    ()=>{
        console.log("server is running on port 3000")
    }
)

