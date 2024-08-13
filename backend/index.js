const express = require("express");
const cors = require("cors");
const connectDb = require("./db");
const Product = require("./Models/ProductModel");
const { message } = require("antd");

const app = express();

connectDb();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi, World!");
});

app.post("/api/products", async (req, res) => {
  try {
    const { title, description, price, category, imageUrl, rating } = req.body;
    if (!title || !price) {
      return res.status(400).json({ error: "Title and Price are required" });
    }

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      imageUrl,
      rating,
    });

    console.log(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error in creating product", error);
    res.status(500).json({
      error: "Failed to create product",
      details: error.message,
    });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const { limit = 4, skip = 0, sortBy = "price", order = "asc" } = req.query;

    let products = await Product.find();

    const Reviews = [
      {
        reviewerName: "Zarina Attaria",
        rating: 5,
        comment: "Great product!",
        date: "2024-08-13T07:25:17.627Z",
      },
      {
        reviewerName: "Ayesha",
        rating: 4,
        comment: "Good quality, but a bit expensive.",
        date: "2024-08-14T07:25:17.627Z",
      },
    ];
    products = products.map((product) => ({
      ...product.toObject(),
      reviews: Reviews,
    }));

    products = products.sort((a, b) => {
      if (order === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });

    const paginatedProducts = products.slice(
      Number(skip),
      Number(skip) + Number(limit)
    );

    res.status(200).json({
      products: paginatedProducts,
      total: products.length,
      limit: Number(limit),
      skip: Number(skip),
    });
  } catch (error) {
    console.error("Error in fetching all products", error);
    res.status(500).json({
      error: "Failed to fetch products",
      details: error.message,
    });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in fetching product", error);
    res.status(500).json({
      error: "Failed to fetch product",
      details: error.message,
    });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleting product", error);
    res.status(500).json({
      error: "Failed to delete product",
      details: error.message,
    });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log("Error in updating product", error);
    res.status(500).json({
      error: "Failed to update product",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/api/products/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    console.log("Category received:", category);
    const products = await Product.find({
      category: new RegExp(`^${category}$`, "i"),
    });
    console.log("Products found:", products);

    if (!products.length) {
      return res
        .status(404)
        .json({ error: "No products found in this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error in fetching products by category", error);
    res.status(500).json({
      error: "Failed to fetch products by category",
      details: error.message,
    });
  }
});

app.get("/api/products/search/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const trimmedQuery = query.trim();
    console.log("Search query received:", trimmedQuery);
    const regex = new RegExp(trimmedQuery, "i");
    console.log("Generated regex pattern:", regex);

    const products = await Product.find({
      $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
    });

    console.log("Products found:", products);

    if (!products.length) {
      return res
        .status(404)
        .json({ error: "No products found matching the search criteria" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error in searching products", error);
    res.status(500).json({
      error: "Failed to search products",
      details: error.message,
    });
  }
});
