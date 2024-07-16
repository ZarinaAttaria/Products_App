import React, { useState } from "react";
import "./App.css";

function Dropdown({ type, handleAction,setSort , setSortOrder}) {
  const [category, setCategory] = useState("");

  const CategoryFilter = (category) => {
    handleAction(category);
    setCategory(category);
  };

  const ProductsPerPage = (number) => {
    handleAction(number);
  };
  const handleSort = (value, order) => {
    setSort(value);
    setSortOrder(order);
  };
  return (
    <>
      {type === "category" ? (
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle filter_Dropdown"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter By Category
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a className="dropdown-item" onClick={() => CategoryFilter("beauty")} href="#">Beauty</a></li>
            <li><a className="dropdown-item" onClick={() => CategoryFilter("fragrances")} href="#">Fragrances</a></li>
            <li><a className="dropdown-item" onClick={() => CategoryFilter("furniture")} href="#">Furniture</a></li>
            <li><a className="dropdown-item" onClick={() => CategoryFilter("groceries")} href="#">Groceries</a></li>
          </ul>
        </div>
      ) : type==="productsPerPage" ?(
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
            <li><a className="dropdown-item" onClick={() => ProductsPerPage(5)} href="#">5</a></li>
            <li><a className="dropdown-item" onClick={() => ProductsPerPage(10)} href="#">10</a></li>
            <li><a className="dropdown-item" onClick={() => ProductsPerPage(15)} href="#">15</a></li>
            <li><a className="dropdown-item" onClick={() => ProductsPerPage(20)} href="#">20</a></li>
          </ul>
        </div>
      ):(
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle filter_Dropdown"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
           SORT BY
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a className="dropdown-item" onClick={() => handleSort("price", "asc")} href="#">Price(Low to High)</a></li>
            <li><a className="dropdown-item" onClick={() => handleSort("price", "desc")} href="#">Price(High to Low)</a></li>
            <li><a className="dropdown-item" onClick={() => handleSort("title", "asc")} href="#">Alphabetically(A to Z)</a></li>
            <li><a className="dropdown-item" onClick={() => handleSort("title", "desc")} href="#">Alphabetically(Z to A)</a></li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Dropdown;
