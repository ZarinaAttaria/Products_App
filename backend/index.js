const express = require("express");
const app = express();
// const data = require("./PRODUCTS_DATA.json");
const cors = require("cors");
const { default: axios } = require("axios");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi, World!");
});

app.get("/api/products/external", async (req, res) => {
  const {
    limit = 5,
    skip = 0,
    sortBy = "price",
    order = "asc",
    q = "",
  } = req.query;

  try {
    const response = await axios.get("https://dummyjson.com/products");
    let products = response.data.products;

    if (q) {
      products = products.filter((product) =>
        product.title.toLowerCase().includes(q.toLowerCase())
      );
    }
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

    res.json({
      products: paginatedProducts,
      total: products.length,
      limit: Number(limit),
      skip: Number(skip),
    });
  } catch (error) {
    console.error("Error fetching data from external API:", error);
    res.status(500).json({
      error: "Failed to fetch data from external API",
      details: error.message,
    });
  }
});

app.get("/api/products/external/search", async (req, res) => {
  try {
    const { q = "" } = req.query;
    const response = await axios.get(
      `https://dummyjson.com/products/search?q=${q}`
    );
    const products = response.data;

    res.json(products);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

app.get("/api/products/external/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const response = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    const products = response.data;

    res.json(products);
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
