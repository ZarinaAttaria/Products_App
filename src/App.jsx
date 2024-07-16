import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar.jsx";
import Dropdown from "./Dropdown.jsx";
import ProductCard from "./ProductCard.jsx";
import ProductDetail from "./ProductDetail.jsx";
import Pagination from "./Pagination.jsx";
import Footer from "./Footer.jsx";
import Cart from "./Cart.jsx";
import { useCart } from "./cartContext.jsx";

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
  const [cart, setCart] = useCart([]);
  const [isCartIcon, setIsCartIcon] = useState(false);


    
  

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
    await fetch(
      `https://dummyjson.com/products/search?q=${query}&limit=${productsPerPage}&skip=${
        (page - 1) * productsPerPage
      }${sortType}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setTotalProducts(data.total);
      });
  };

  const categoryFilter = async (category) => {
    const skip = (page - 1) * productsPerPage;
    const sortType = sort ? `&sortBy=${sort}&order=${sortOrder}` : "";
    await fetch(
      `https://dummyjson.com/products/category/${category}?limit=${productsPerPage}&skip=${skip}${sortType}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setTotalProducts(data.total);
      });
  };

  useEffect(() => {
    if (isSearch) {
      searchProduct(searchQuery);
    } else if (isCategoryFilter) {
      categoryFilter(filtercategory);
    } else {
      getData(page, sort, sortOrder);
    }
  }, [page, sort, sortOrder, productsPerPage, isSearch, isCategoryFilter]);

  const handleCategoryFilter = (category) => {
    setIsCategoryFilter(true);
    categoryFilter(category);
    setFilterCategory(category);
    setPage(1);
  };

  const handleSearch = (query) => {
    setIsSearch(true);
    searchProduct(query);
    setSearchQuery(query);
    setPage(1);
  };

  const handleMoreDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem('cart', JSON.stringify([...cart, product]));

  };
  
  
  const handleCart = () => {
    setIsCartIcon(true);
  };

  return (
    <>
      <Navbar
        setProducts={setProducts}
        productsPerPage={productsPerPage}
        page={page}
        sort={sort}
        handleSearch={handleSearch}
        handleCategoryFilter={handleCategoryFilter}
        handleCart={handleCart}
      />
      <div className="dropdowns">
        <Dropdown type="sort" setSort={setSort} setSortOrder={setSortOrder} />
        <Dropdown type="category" handleAction={handleCategoryFilter} />
      </div>

      <ProductCard
        products={products}
        handleMoreDetails={handleMoreDetails}
        handleAddToCart={handleAddToCart}
      />

      <Pagination
        totalProducts={totalProducts}
        productsPerPage={productsPerPage}
        setProductsPerPage={setProductsPerPage}
        page={page}
        setPage={setPage}
      />

      <ProductDetail selectedProduct={selectedProduct} />
      <Cart cart={cart} isCartIcon={isCartIcon} />

      <Footer />
    </>
  );
}

export default App;
