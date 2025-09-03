import express from "express";
const router = express.Router();
import Products from "../models/product.mjs";
import upload from "../middleware/upload.mjs";

// Get all products
router.get("/", async (req, res) => {
  try {
    const allProducts = await Products.find();
    res.send({ message: "done yup", Data: allProducts });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
    try {
        const ad = await Products.findOne({ _id: req.params.id });
        res.send({ message: 'Data Fetched Successfully', singleProduct: ad });
    } catch (e) {
        res.send({ message: e.message });
    }
});

router.post('/post',upload.single('image'),async(req,res)=>{
    console.log("REQ BODY:", req.body);
console.log("REQ FILE:", req.file);

        try{
            const imageUrl = req.file?.path; // Get the image URL from the uploaded file
            const productData = {
                ...req.body,
                image: imageUrl // Add the image URL to the product data
            };

            const postProduct=new Products(productData);
            await 
            postProduct.save() 
            res.send({ message: 'data posted successfully' })
            console.log("data:", req.body);
            
        }
        catch(e){
            res.status(500).send({message:e.message})
        }
    })
router.put('/:id', async (req, res) => {
    try {
        const updatedAd = await Products.findOneAndUpdate(
            { _id: req.params.id },req.body, 
            { new: true } // To return the updated document
        );
        res.send({ message: 'Ad updated successfully', updatedAd });
    } catch (e) {
        res.send({ message: 'Error updating ad', error: e.message });
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const deletedAd=await Products.deleteOne(
            { _id: req.params.id },req.body, 
            { new: true })
            res.send({message:'Ad Deleted Successfully',deletedAd})
    }
    catch(e){
        res.send({ message: 'Error deleting ad', error: e.message });
    }
})

export default router


