import React, { useState } from "react";
import "./App.css";

function Dropdown({ type, handleAction, productsPerPage }) {
  const [category, setCategory] = useState("");

  const CategoryFilter = (category) => {
    handleAction(category);
    setCategory(category);
  };

  const ProductsPerPage = (number) => {
    handleAction(number);
  };

  return (
    <>
      {type === "category" ? (
        <div className="dropdown ">
          <button
            className="btn btn-secondary dropdown-toggle filter_Dropdown"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {category === "" ? "Filter By Category" : category}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a
                className="dropdown-item"
                onClick={() => CategoryFilter("beauty")}
                href="#"
              >
                Beauty
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => CategoryFilter("fragrances")}
                href="#"
              >
                Fragrances
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => CategoryFilter("furniture")}
                href="#"
              >
                Furniture
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => CategoryFilter("groceries")}
                href="#"
              >
                Groceries
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/">
                All
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle dropdown_Btn"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {productsPerPage === 0 ? "Products Per Page" : productsPerPage}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a
                className="dropdown-item"
                onClick={() => ProductsPerPage(4)}
                href="#"
              >
                4
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => ProductsPerPage(8)}
                href="#"
              >
                8
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => ProductsPerPage(12)}
                href="#"
              >
                12
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => ProductsPerPage(16)}
                href="#"
              >
                16
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Dropdown;
