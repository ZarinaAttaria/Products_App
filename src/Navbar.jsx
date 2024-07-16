import React from "react";
import SearchInput from "./SearchInput";

function Navbar({ handleSearch, handleCart }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          ProductsApp
        </a>
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
              <a
                className="nav-link active HomeLink"
                aria-current="page"
                href="/"
              >
                Home
              </a>
            </li>
          </ul>
          <SearchInput handleSearch={handleSearch} />
          <img
            src="shopping-cart.png"
            className="cartIcon"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight" // Updated to match the new offcanvas ID
            aria-controls="offcanvasRight" // Updated to match the new offcanvas ID
            onClick={handleCart}
            alt="cart"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
