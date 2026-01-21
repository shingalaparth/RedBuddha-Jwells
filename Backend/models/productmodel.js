import mongoose from "mongoose";

const productschema= new mongoose.Schema({
  name:{type:String , required : true},
  description :{type:String , required: true},
  price :{type:Number , required: true},
  images :{type:Array , required: true},
  category :{type:String , required: true},
  subCategory :{type:String , required: true},
  sizes :{type:Array , required: true},
  quant:{
    S:{type:Number,default:0},
    M:{type:Number,default:0},
    L:{type:Number,default:0},
    XL:{type:Number,default:0}
  },
  bestseller :{type:Boolean},
  date :{type:Number , required: true},

})

const productmodel= mongoose.models.product || mongoose.model("product",productschema);

export default productmodel 