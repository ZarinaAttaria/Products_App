import React from "react";


function Cart({ cart ,setCart}) {
  
    const handleRemoveCartItem=(pid)=>{
        let myCart = [...cart];
        let index = myCart.findIndex((item) => item._id === pid);
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
       }
       
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Cart
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        
        ></button>
      </div>
      <div className="offcanvas-body">
        {cart.length === 0
          ? "Cart is Empty"
          : cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  style={{ width: "100%", objectFit: "cover" }}
                />
                <p>{item.description}</p>
                <h6 className="productPrice">Price: Rs {item.price}</h6>
                <p>Rating: {item.rating}</p>
                <button className="btn btn-primary" onClick={()=>handleRemoveCartItem(item.id)}>Remove from Cart</button>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Cart;
