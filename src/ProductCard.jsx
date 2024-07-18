import React from "react";
import "./App.css";

function ProductCard({ products, handleMoreDetails, handleAddToCart }) {
  return (
    <div className="container">
      {products.map((product, index) => (
        <div className="card" key={index}>
          <img
            src={product.images[0]}
            alt={product.title}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text product-price">Price: $ {product.price}</p>
            <p className="card-text">Rating: {product.rating}/5</p>

            <a
              href="#"
              className="btn btn-primary AddToCartBtn"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </a>

            <a
              className="btn btn-primary productDetailButton"
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
  );
}

export default ProductCard;
