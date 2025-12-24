import express from "express";
import { createProduct, deleteproduct, getproductById, getProducts, updateProduct } from "../controllers/productController.js";


const productRouter = express.Router();
productRouter.post("/",createProduct);
productRouter.get("/",getProducts);
productRouter.get("/trending",(req,res)=>{
    res.status(200).json({message:"This is trending products endpoint"})
})

productRouter.delete("/:productId",deleteproduct);
productRouter.put("/:productId", updateProduct);
productRouter.get("/:productId", getproductById)


export default productRouter;