import product from "../models/product.js";
import { isAdmin } from "./usercontroller.js";

export async function createProduct(req,res){

    if(!isAdmin(req)){
      res.status(403).json({message : "Access denied.Admins only."});
      return;
    }
    try{
      const existingproduct =await product.findOne({
        productId : req.body.productId
      })

      if(existingproduct){
        res.status(400).json({message : "product with given productId already exists"});
        return;
      }

      const data = {}
      data.productId = req.body.productId;

      if(req.body.name == null){
        res.status(400).json({message: "product name is required"});
        return;
      }

    data.name = req.body.name;
    data.description = req.body.description || ""
    data.altNames = req.body.altNames || [] 
  
    if(req.body.price == null){
      res.status(400).json({message: "product price is required"});
      return;
    }
    data.price = req.body.price;
    data.labeledPrice = req.body.labeledPrice || req.body.price
    data.category = req.body.category || "Others"
    data.images = req.body.images || ["/images/default-product-1.png","/images/default-product-2.png"]
    data.isVisible = req.body.isVisible
    data.brand = req.body.brand || "Generic"
    data.model = req.body.model || "standard"

    const newProduct = new product(data);

    await newProduct.save();

    res.status(201).json({message : "product created successfully", product : newProduct});

    }catch(error){
      res.status(500).json({message:"Error creating product",error:error});
    }
  }

    export async function getProducts(req, res){
     try{
         
        if(isAdmin(req)){
             const products = await product.find();
             res.status(200).json(products)
        }else{
          const products = await product.find ({ isVisible: true});
          res.status(200).json(products);
        }

        
     }catch(error){
      res.status(500).json({message : "Error fetching products", error:error })
     }
  
    }

export async function deleteproduct(req, res) {
    if(!isAdmin(req)){
      res.status(403).json({message: "Access denied.Admins Only."});
      return;
    }
    try{
      const productId = req.params.productId;
      await product.deleteOne({productId : productId});
      res.status(200).json({message:"product deleted successfully"});
    }catch (error){
       res.status(500).json({message : "Error deleting product", error:error})
    }
}

export async function updateProduct(req,res){
   if(!isAdmin(req)){
      res.status(403).json({message : "Access denied.Admins only."});
      return;
    }
    try{
       const productId = req.params.productId;

      const data = {};


      if(req.body.name == null){
        res.status(400).json({message: "product name is required"});
        return;
      }

    data.name = req.body.name;
    data.description = req.body.description || ""
    data.altNames = req.body.altNames || [] 
  
    if(req.body.price == null){
      res.status(400).json({message: "product price is required"});
      return;
    }
    data.price = req.body.price;
    data.labeledPrice = req.body.labeledPrice || req.body.price
    data.category = req.body.category || "Others"
    data.images = req.body.images || ["/images/default-product-1.png","/images/default-product-2.png"]
    data.isVisible = req.body.isVisible
    data.brand = req.body.brand || "Generic"
    data.model = req.body.model || "standard"

    await product.updateOne({productId:productId}, data);
    res.status(201).json({message : "product updated successfully"});

    }catch(error){
      res.status(500).json({message:"Error creating product",error:error});
    }
  }


  export async function getproductById(req, res){
    try{
      const productId = req.params.productId;
      const product = await product.findOne({productId:productId});

      if (product == null){
        res.status(404).json({message : "product not found"});
        return;
      }

      if(!product.isVisible){
        if(!isAdmin(req)){
          res.status(404).json({message : "product not found."});
          return;
        }
      }
      res.status(200).json(product);

    }catch(error){
      res.status(500).json({message : "Error fetching product", error:error});
    }
  }

