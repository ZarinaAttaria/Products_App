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
        <div className="dropdown">
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
                onClick={() => ProductsPerPage(5)}
                href="#"
              >
                5
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => ProductsPerPage(10)}
                href="#"
              >
                10
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => ProductsPerPage(15)}
                href="#"
              >
                15
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => ProductsPerPage(20)}
                href="#"
              >
                20
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Dropdown;
