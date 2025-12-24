import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productId :{
            type : String,
            required : true,
            unique : true
        },

        name :{
            type : String,
            required : true
        },

        description : {
            type : String,
            required : true
        },

        altNames : {
            type :[String],
            defualt : []
        },
        
        price :{
            type : Number,
            required : true
        },

        labeledPrice : {
            type : Number,
        },

        category : {
            type : String ,
            default : "others"
        },

        images : {
            type : [String],
            default : ["/images/default-product-1.png","/images/default-product-2.png"]
        },

        isVisible :{
            type : Boolean,
            default : true,
            required : true
        },

        brand : {
            type : String,
            default : "standard"
        },
        

    }
)

const product = mongoose.model("product",productSchema)
export default product;

