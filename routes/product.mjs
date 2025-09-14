import express from "express";
const router = express.Router();
import Products from "../models/product.mjs";
import upload from "../middleware/upload.mjs";

import verifyToken from "../middleware/varifytoken.mjs";

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
/// CREATE product
router.post("/post", upload.single("image"), async (req, res) => {
  try {
    console.log("📩 Body:", req.body);
    console.log("📷 File:", req.file);

    if (!req.file) {
      return res.status(400).send({ message: "Image not uploaded", file: req.file });
    }

    const imageUrl = req.file.path; // ✅ Cloudinary URL hota hai

    const { title, description, price, brand, availability } = req.body;

    if (!title || !description || !price || !brand || !availability) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newProduct = new Products({
      title,
      description,
      price,
      brand,
      availability,
      image: imageUrl,
    });

    await newProduct.save();

    res.status(201).send({
      message: "Product posted successfully",
      Data: newProduct,
    });
  } catch (e) {
    console.error("🔥 Error saving product:", e);
    res.status(500).send({ message: "Server error", error: e.message });
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
