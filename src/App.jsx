// App.jsx

import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar.jsx";
import Dropdown from "./Dropdown.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [isSearch, setIsSearch] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtercategory, setFilterCategory] = useState("");
  const [showSortingButtons, setShowSortingSortingButtons] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const first = (page - 1) * productsPerPage + 1;
  const last = Math.min(page * productsPerPage, totalProducts);

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

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleProductsPerPage = async (products_per_page) => {
    {
      page * productsPerPage >= totalProducts
        ? ""
        : setProductsPerPage(products_per_page);
    }
    setPage(1);
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

      <div className="container">
        {products.map((product, id) => (
          <div className="card" style={{ width: "18rem" }} key={product.id}>
            <img
              src={product.images[0]}
              alt={product.title}
              style={{ height: "200px", objectFit: "cover" }}
              className="card-img-top"
           
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">Rs {product.price}</p>

              <a href="#" className="btn btn-primary ">
                Add to Cart
              </a>

              <a
                class="btn btn-primary product_Btns"
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
                onClick={() => handleMoreDetails(product)}
              >
                More Details
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <Dropdown type="productsPerPage" handleAction={handleProductsPerPage}/>
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="pagination_button "
        >
          Previous
        </button>
        <span>Page {page}</span>
        <span>
          {first}-{last}products showing
        </span>

        <button
          onClick={handleNext}
          disabled={productsPerPage * page >= totalProducts}
          className="pagination_button"
        >
          Next
        </button>
        {productsPerPage * page >= totalProducts ? (
          <span>No more products to show </span>
        ) : (
          ""
        )}
      </div>

      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">
            Product Details
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          {selectedProduct && (
            <>
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.title}
                style={{ width: "100%", objectFit: "cover" }}
              />
              <p>{selectedProduct.description}</p>
              <h6 className="productPrice">
                Price: Rs {selectedProduct.price}
              </h6>
              <p>Rating: {selectedProduct.rating}</p>
              <a href="#" className="btn btn-primary ">
                Add to Cart
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
