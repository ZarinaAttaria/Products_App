import React from "react";
import { toast } from "react-toastify";
import "./Cart.css";

function Cart({ isCartIcon, cart, setCart }) {
  const handleRemoveCartItem = (pid) => {
  let myCart = [...cart];
  let index = myCart.findIndex((item) => item._id === pid);
  myCart.splice(index, 1);
  setCart(myCart);
  localStorage.setItem("cart", JSON.stringify(myCart));
    toast.success("Item removed from cart!");
  };

  const increaseQuantity = (pid) => {
    const updatedCart = cart.map((item) => {
      if (item.id === pid) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (pid) => {
    const updatedCart = cart.map((item) => {
      if (item.id === pid && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = () => {
    let total = 0;
    cart?.forEach((item) => {
      total = total + item.price * item.quantity;
    });
    return total.toFixed(2);
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasCart"
      aria-labelledby="offcanvasCartLabel"
    >
      <div className="offcanvas-header">
        <h4 className="offcanvas-title" id="offcanvasCartLabel">
          CART
        </h4>

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div>
        <h5 className="cart-Item-heading">
          You have {cart?.length} {cart?.length === 1 ? "item" : "items"} in
          cart!
        </h5>
      </div>
      {isCartIcon && (
        <div className="offcanvas-body">
          {cart.length === 0 ? (
            "Cart is Empty"
          ) : (
            <>
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h6>{item.title}</h6>
                    <p className="productPrice">Price: $ {item.price}</p>
                  </div>
                  <div>
                    
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <button
                    className="btn btn-primary removeFromCartBtn"
                    onClick={() => handleRemoveCartItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div>
                <h3 className="cartSummary">Cart Summary</h3>
                <hr />
                <h4 className="totalPrice">Total: $ {totalPrice()}</h4>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
