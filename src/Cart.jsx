import React from "react";

function Cart({ isCartIcon, cart, setCart }) {
  const handleRemoveCartItem = (pid) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item.id === pid);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  const totalPrice = () => {
    let total = 0;
    cart?.forEach((item) => {
      total = total + item.price;
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
          Welcome to Cart Page
        </h4>
        <h5>You have {cart?.length} items in cart</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      {isCartIcon && (
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
                  <h6>{item.title}</h6>

                  <p>{item.description}</p>
                  <h6 className="productPrice">Price: Rs {item.price}</h6>
                  <p>Rating: {item.rating}</p>
                  <p>Minimum Order Quantity: {item.minimumOrderQuantity}</p>
                  <button
                    className="btn btn-primary removeFromCartBtn"
                    onClick={() => handleRemoveCartItem(item.id)}
                  >
                    Remove from Cart
                  </button>
                </div>
              ))}
          <div>
            <h3 className="cartSummary">Cart Summary</h3>
            <hr />
            <h4 className="totalPrice">Total: $ {totalPrice()}</h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
