import express from "express";
const router = express.Router();
import Products from "../models/product.mjs";
import upload from "../middleware/upload.mjs";

// GET all products
router.get("/", async (req, res) => {
  try {
    const allProducts = await Products.find();
    res.send({ message: "done yup", Data: allProducts });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// CREATE product
router.post("/post", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file?.path || "";

    const productData = {
      title: req.body.title,
      brand: req.body.brand,
      description: req.body.description,
      price: Number(req.body.price),
      availability: req.body.availability,
      image: imageUrl,
    };

    console.log("PRODUCT DATA:", productData);

    const postProduct = new Products(productData);
    await postProduct.save();

    res.send({ message: "Data posted successfully", product: postProduct });
  } catch (e) {
    console.error("ERROR:", e);
    res.status(500).send({ message: e.message });
  }
});

// GET product by ID
router.get("/id/:id", async (req, res) => {
  try {
    const ad = await Products.findById(req.params.id);
    res.send({ message: "Data Fetched Successfully", singleProduct: ad });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// UPDATE product
router.put("/:id", async (req, res) => {
  try {
    const updatedAd = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send({ message: "Ad updated successfully", updatedAd });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const deletedAd = await Products.findByIdAndDelete(req.params.id);
    res.send({ message: "Ad Deleted Successfully", deletedAd });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

export default router;
