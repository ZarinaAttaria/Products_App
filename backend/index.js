const express = require("express");
const app = express();
const data = require("./PRODUCTS_DATA.json");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi, World!");
});

app.get("/api/products", async (req, res) => {
  return res.json(data);
});

app.get("/api/search", async (req, res) => {
  try {
    const { q = "" } = req.query;
    const filteredProducts = data.products.filter((product) =>
      product.title.toLowerCase().includes(q.toLowerCase())
    );

    res.json({ products: filteredProducts, total: filteredProducts.length });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

app.get("/api/products/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const filteredProducts = data.products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
    res.json({ products: filteredProducts });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
