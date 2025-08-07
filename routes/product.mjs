import express from "express";
const router=express.Router()
import Products from "../models/product.mjs";
import e from "express";
router.get("/",async(req,res)=>{
    const allproducts=await Products.find()
    res.send({message:'done yup',Data:allproducts})
})
router.get('/',async(req,res)=>{
    try {
       
     const singleProduct=await Products.findById(req.params.id)
     res.send({message:'done yup',Data:singleProduct})
    } catch (error) {
        res.send({message:e.message})
    }
})
export default router