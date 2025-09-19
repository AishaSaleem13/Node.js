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


router.post("/post", verifyToken, upload.single("image"), async (req, res) => {
  try {
    console.log("📩 Body:", req.body);
    console.log("📷 File:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Image not uploaded" });
    }

    const { title, description, price, brand, availability } = req.body;

    if (!title || !description || !price || !brand || !availability) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Products({
      title,
      description,
      price: Number(price),
      brand,
      availability,
      image: req.file.path, // ✅ Cloudinary URL hota hai
    });

    await newProduct.save();

    res.status(201).json({ message: "✅ Product added", newProduct });
  } 
   catch(err){
     console.error(err);  // log actual error
     res.status(500).json({message: "Server error", error: err.message})
  }
});

// router.post("/test-upload", upload.single("image"), async (req, res) => {
//   try {
//     console.log("📷 File:", req.file);

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     return res.status(200).json({
//       message: "✅ Upload successful",
//       file: req.file,
//       url: req.file.path, // ✅ Cloudinary ka hosted URL hoga
//     });
//   } catch (e) {
//     console.error("🔥 Upload error:", e);  // 👈 full error console me aayega
//     return res.status(500).json({
//       message: "Server error",
//       error: e,              // 👈 full object bhej
//       errorString: e.message // 👈 readable message bhej
//     });
//   }
// });



// without image schema image removed but still same error 
// router.post("/post", async (req, res) => {

//   try {
//     console.log("📩 Body:", req.body);
   

   

//     // const imageUrl = req.file.path; // ✅ Cloudinary URL hota hai

//     // const { title, description, price, brand, availability } = req.body;

//     if (!title || !description || !price || !brand || !availability) {
//       return res.status(400).send({ message: "All fields are required" });
//     }

//     const newProduct = new Products({
//       title,
//       description,
//       price,
//       brand,
//       availability,
      
//     });

//     await newProduct.save();

//     res.status(201).send({
//       message: "Product posted successfully",
//       Data: newProduct,
//     });
//   } catch (e) {
//     console.error("🔥 Error saving product:", e);
//     res.status(500).send({ message: "Server error", error: e.message });
//   }
// });


// custom api 
// router.post("/post", upload.single("image"), async (req, res) => {
//   try {
//     const { title, description, price, brand, availability } = req.body;

//     if ([title, description, price, brand, availability].some((f) => f?.trim() === "")) {
//       return res.status(400).send({ message: "All fields are required" });
//     }

//     const image = req.file?.path;
//     if (!image) {
//       return res.status(400).send({ message: "Image not uploaded" });
//     }

//     const imageUrl = await uploadOnCloudinary(image);

//     const newProduct = await Products.create({
//       title,
//       description,
//       price,
//       brand,
//       availability,
//       image: imageUrl.url,
//     });

//     res.status(201).send({
//       message: "Product posted successfully",
//       Data: newProduct,
//     });
//   } catch (e) {
//     console.error("🔥 Error saving product:", e);
//     res.status(500).send({ message: "Server error", error: e.message });
//   }
// });



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
