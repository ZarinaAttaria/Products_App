import React from "react";
import "./App.css";

function ProductCard({ products, handleMoreDetails,handleAddToCart }) {
  

  return (
    <>
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

              <a href="#" className="btn btn-primary " onClick={()=>handleAddToCart(product)}>
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


    </>
  );
}

export default ProductCard;
