import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar.jsx";
import ProductCard from "./ProductCard.jsx";
import ProductDetail from "./ProductDetail.jsx";
import Pagination from "./Pagination.jsx";
import Footer from "./Footer.jsx";
import Cart from "./Cart.jsx";
import Sort from "./Sort.jsx";
import _ from "lodash";
import { toast, Toaster } from "react-hot-toast";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtercategory, setFilterCategory] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsPerPage, setProductsPerPage] = useState(5);

  const [isCategoryFilter, setIsCategoryFilter] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartIcon, setIsCartIcon] = useState(false);

  useEffect(() => {
    const existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  const getData = async (page, sort, sortOrder) => {
    const skip = (page - 1) * productsPerPage;
    const sortType = sort ? `&sortBy=${sort}&order=${sortOrder}` : "";

    await fetch(
      `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}${sortType}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setTotalProducts(data.total);
      });
  };

  const searchProduct = async (query) => {
    const sortType = sort ? `&sortBy=${sort}&order=${sortOrder}` : "";
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${query}&limit=${productsPerPage}&skip=${
        (page - 1) * productsPerPage
      }${sortType}`
    );
    const data = await response.json();
    setProducts(data.products);
    setTotalProducts(data.total);
  };

  const debouncedSearch = _.debounce(searchProduct, 300);

  const categoryFilter = async (category) => {
    const skip = (page - 1) * productsPerPage;
    const sortType = sort ? `&sortBy=${sort}&order=${sortOrder}` : "";
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}?limit=${productsPerPage}&skip=${skip}${sortType}`
    );
    const data = await response.json();
    setProducts(data.products);
    setTotalProducts(data.total);
  };

  useEffect(() => {
    if (isSearch && searchQuery.length >= 3) {
      debouncedSearch(searchQuery);
    } else if (isCategoryFilter) {
      categoryFilter(filtercategory);
    } else {
      getData(page, sort, sortOrder);
    }
  }, [
    page,
    sort,
    sortOrder,
    productsPerPage,
    isSearch,
    isCategoryFilter,
    searchQuery,
  ]);

  const handleCategoryFilter = (category) => {
    setIsCategoryFilter(true);
    setIsSearch(false);
    categoryFilter(category);
    setFilterCategory(category);
    setPage(1);
  };

  const handleSearch = (query) => {
    setIsSearch(true);
    setIsCategoryFilter(false);
    setSearchQuery(query);
    setPage(1);
  };

  const handleMoreDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item added to cart!");
  };

  const handleCart = () => {
    setIsCartIcon(true);
  };

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Navbar
        setProducts={setProducts}
        productsPerPage={productsPerPage}
        page={page}
        sort={sort}
        handleSearch={handleSearch}
        handleCategoryFilter={handleCategoryFilter}
        handleCart={handleCart}
      />
      <Pagination
        totalProducts={totalProducts}
        productsPerPage={productsPerPage}
        setProductsPerPage={setProductsPerPage}
        page={page}
        setPage={setPage}
      />
      <Sort setSort={setSort} setSortOrder={setSortOrder} />

      <ProductCard
        products={products}
        handleMoreDetails={handleMoreDetails}
        handleAddToCart={handleAddToCart}
      />

      <ProductDetail
        selectedProduct={selectedProduct}
        handleAddToCart={handleAddToCart}
      />

      <Cart cart={cart} isCartIcon={isCartIcon} setCart={setCart} />

      <Footer />
    </>
  );
}

export default App;
