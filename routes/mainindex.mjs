import express from "express";
import products from './product.mjs'
const router=express.Router()

router.use('/products',products)
// router.use('/payment',payment)
export default router