import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar.jsx";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [isSearch, setIsSearch] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showSortingButtons, setShowSortingButtons] = useState(false);
  const [isCategoryFilter, setIsCategoryFilter] = useState(false);

  const first = (page - 1) * productsPerPage + 1;
  const last = Math.min(page * productsPerPage, totalProducts);

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
      categoryFilter(filterCategory);
    } else {
      getData(page, sort, sortOrder);
    }
  }, [page, sort, sortOrder, productsPerPage, isSearch, isCategoryFilter]);

  const handleSort = (value, order) => {
    setSort(value);
    setSortOrder(order);
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleProductsPerPage = (products_per_page) => {
    setProductsPerPage(products_per_page);
    setPage(1);
  };

  const handleCategoryFilter = (category) => {
    setIsCategoryFilter(true);
    setFilterCategory(category);
    setPage(1);
  };

  const handleSearch = (query) => {
    setIsSearch(true);
    setSearchQuery(query);
    setPage(1);
  };

  const toggleSortingButtons = () => {
    setShowSortingButtons((prevShowSortingButton) => !prevShowSortingButton);
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
              Price (Low to High)
            </button>
            <button
              className="btn btn-primary sort-btn"
              onClick={() => handleSort("price", "desc")}
            >
              Price (High to Low)
            </button>
            <button
              className="btn btn-primary sort-btn"
              onClick={() => handleSort("title", "asc")}
            >
              Alphabetically (A-Z)
            </button>
            <button
              className="btn btn-primary sort-btn"
              onClick={() => handleSort("title", "desc")}
            >
              Alphabetically (Z-A)
            </button>
          </div>
        )}
      </div>

      <div className="container">
        {products.map((product, id) => (
          <div className="card" style={{ width: "18rem" }} key={id}>
            <img
              src={product.images[0]}
              alt={product.title}
              style={{ height: "200px", objectFit: "cover" }}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">Rs {product.price}</p>
              <a href="#" className="btn btn-primary">
                Add to Cart
              </a>
              <p className="card-text">{product.description}</p>
              <a href="#" className="btn btn-primary">
                More Details
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle dropdown_Btn"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Products Per Page
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a
                className="dropdown-item"
                onClick={() => handleProductsPerPage(5)}
                href="#"
              >
                5
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => handleProductsPerPage(10)}
                href="#"
              >
                10
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => handleProductsPerPage(15)}
                href="#"
              >
                15
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => handleProductsPerPage(20)}
                href="#"
              >
                20
              </a>
            </li>
          </ul>
        </div>
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="pagination_button"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <span>
          {first}-{last} products showing
        </span>
        <button
          onClick={handleNext}
          disabled={productsPerPage * page >= totalProducts}
          className="pagination_button"
        >
          Next
        </button>
        {productsPerPage * page >= totalProducts ? (
          <span>No more products to show</span>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default HomePage;
