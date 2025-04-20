import React, { useContext } from "react";
import "./Cart.css";
import Title from "../../components/Title/Title";
import { ShopContext } from "../../context/ShopContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import CartTotal from "../../components/CartTotal/CartTotal";

function Cart() {
  const { cartItems, setCartItems, currency, saveCartToDatabase, userId } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const updateQuantity = (id, size, action) => {
    setCartItems((prevCarts) => {
      const updatedCart = prevCarts.map((item) => {
        if (item._id === id && item.size === size) {
          const currentQty = item.quantity;
          const newQty =
            action === "increment"
              ? Math.min(10, currentQty + 1)
              : Math.max(1, currentQty - 1);
          return { ...item, quantity: newQty };
        }
        return item;
      });
      if (userId) {
        saveCartToDatabase(updatedCart);
      }
      return updatedCart;
    });
  };

  const handleRemoveCart = (id, size) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => !(item._id === id && item.size === size)
      );
      if (userId) {
        saveCartToDatabase(updatedCart);
      }

      return updatedCart;
    });
  };

  if (cartItems.length < 1) {
    return (
      <div className="empty-cart">
        <h3>Hey, it feels so light!</h3>
        <p>There is nothing in your cart. Let's add some items</p>
        <button
          className="shop-now-btn"
          onClick={() => navigate("/collection")}
        >
          Shop Now
        </button>
      </div>
    );
  }
  return (
    <div className="cart-container">
      {/* Title */}
      <div className="cart-title">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart Items */}
      <div className="cart-items-container">
        {cartItems.map((item) => (
          <div key={`${item._id}-${item.size}`} className="cart-item">
            {/* Item Details */}
            <div className="cart-item-details-container">
              <img
                src={item.image}
                alt="item"
                className="cart-item-thumbnail"
              />
              <div className="cart-item-details">
                <p className="cart-item-name">{item.name}</p>
                <div className="price-and-size">
                  <p className="price">
                    {currency}
                    {item.price}
                  </p>
                  <p className="size">{item.size}</p>
                </div>
              </div>
            </div>

            {/* Quantity Control */}
            <div className="cart-item-increment-decrement">
              <button
                onClick={() => updateQuantity(item._id, item.size, "decrement")}
              >
                -
              </button>
              <p className="cart-item-quantity">Qty: {item.quantity}</p>
              <button
                onClick={() => updateQuantity(item._id, item.size, "increment")}
              >
                +
              </button>
            </div>

            {/* Remove Button */}
            <img
              role="button"
              src={assets.bin_icon}
              alt="Remove"
              className="remove-cart-item"
              onClick={() => handleRemoveCart(item._id, item.size)}
            />
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="cart-totals-container">
        <div className="cart-totals-details">
          <CartTotal />
          {/* Checkout Button */}
          <div className="checkout">
            <button
              className="checkout-btn"
              onClick={() => navigate("/place-order")}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
