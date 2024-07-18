import React from "react";
import "./App.css";
import "./productDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function ProductDetail({ selectedProduct, handleAddToCart }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i <= rating ? "rating-stars" : "rating-stars gray"}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Product Details
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {selectedProduct && (
            <>
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.title}
                style={{ width: "100%", objectFit: "cover" }}
              />
              <p>{selectedProduct.description}</p>
              <p>Brand: {selectedProduct.brand}</p>

              <div>Rating: {renderStars(selectedProduct.rating)}</div>
              <div>
                <h6 className="productPrice">
                  Price: Rs {selectedProduct.price}
                </h6>
              </div>

              <a
                href="#"
                className="btn btn-primary add-to-cart"
                onClick={() => handleAddToCart(selectedProduct)}
              >
                Add to Cart
              </a>

              <h3 className="reviewAndRatingHeading">Reviews & Ratings</h3>
              <div className="rating">
                <h4>{selectedProduct.rating}</h4>
              </div>
              <div>{renderStars(selectedProduct.rating)}</div>
              <h6>{selectedProduct.reviews.length} ratings</h6>

              <div className="reviews">
                {selectedProduct.reviews.map((item, index) => (
                  <div key={index} className="review-item">
                    <p className="review-author">{item.reviewerName}</p>
                    <div className="review-rating">
                      {renderStars(item.rating)}
                      <span>{item.rating}</span>
                    </div>
                    <p className="review-comment">"{item.comment}"</p>
                    <p className="review-date">{item.date}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
