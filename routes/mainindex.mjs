import express from "express";
import products from './product.mjs'
import user from "./login.mjs"
import payment from "./payment.mjs"
const router=express.Router()

router.use('/products',products)
router.use('/payment',payment)
router.use ('/user',user)
export default router