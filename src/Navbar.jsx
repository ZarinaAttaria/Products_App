import React, { useState } from 'react';

function Navbar({ setProducts, productsPerPage, page, sort , handleSearch, handleCategoryFilter}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  
const searchProduct=async()=>{
  handleSearch(query)
}

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchProduct();
  };

  const CategoryFilter = async (category) => {
    handleCategoryFilter(category);
    setCategory(category);
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">ProductsApp</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active HomeLink" aria-current="page" href="/">Home</a>
            </li>
          </ul>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle filter_Dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Filter By Category
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" onClick={() => CategoryFilter("beauty")} href="#">Beauty</a></li>
              <li><a className="dropdown-item" onClick={() => CategoryFilter("fragrances")} href="#">Fragrances</a></li>
              <li><a className="dropdown-item" onClick={() => CategoryFilter("furniture")} href="#">Furniture</a></li>
              <li><a className="dropdown-item" onClick={() => CategoryFilter("groceries")} href="#">Groceries</a></li>
            </ul>
          </div>
          
          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success search_Btn" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;