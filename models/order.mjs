import mongoose from "mongoose";
import { Schema } from "mongoose";
 const orderSchema = new Schema({
    order_id:{
        type:String,
        require:true
    },
     user_id:{
        type:String,
        require:true
    },
     quantity:{
        type:String,
        require:true
    }
 })
 const Order =mongoose.model('orders',orderSchema)
 export default Order