// App.jsx

import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar.jsx";
import Dropdown from "./Dropdown.jsx";
import ProductCard from "./ProductCard.jsx";

import ProductDetail from "./ProductDetail.jsx";
import Pagination from "./Pagination.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtercategory, setFilterCategory] = useState("");
  const [showSortingButtons, setShowSortingSortingButtons] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsPerPage, setProductsPerPage] = useState(5);
 
  const [isCategoryFilter, setIsCategoryFilter] = useState(false);

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

  const handleSort = (value, order) => {
    setSort(value);
    setSortOrder(order);
  };



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

  const toggleSortingButtons = () => {
    setShowSortingSortingButtons(
      (prevShowSortingButton) => !prevShowSortingButton
    );
  };

  const handleMoreDetails = (product) => {
    setSelectedProduct(product);
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
      />

      <div className="sortContainer">
        <button
          className="btn btn-primary sort-toggle-btn"
          onClick={toggleSortingButtons}
        >
          Sort
        </button>
        {showSortingButtons && (
          <div className="sort-buttons">
            <button
              className="btn btn-primary sort-btn"
              onClick={() => handleSort("price", "asc")}
            >
              Price(Low to High)
            </button>
            <button
              className="btn btn-primary sort-btn"
              onClick={() => handleSort("price", "desc")}
            >
              Price(High to Low)
            </button>
            <button
              className="btn btn-primary sort-btn"
              onClick={() => handleSort("title", "asc")}
            >
              Alphabetically(A-Z)
            </button>
            <button
              className="btn btn-primary sort-btn"
              onClick={() => handleSort("title", "desc")}
            >
              Alphabetically(Z-A)
            </button>
          </div>
        )}
      </div>

     <ProductCard products={products} handleMoreDetails={handleMoreDetails} />
     
     <Pagination totalProducts={totalProducts} productsPerPage={productsPerPage} setProductsPerPage={setProductsPerPage} page={page} setPage={setPage}/>

<ProductDetail selectedProduct={selectedProduct}/>
     
    </>
  );
}

export default App;
