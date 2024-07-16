import React from "react";
import "./App.css";

function ProductDetail({ selectedProduct  }) {
  

  return (
    <>
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

export default ProductDetail;
