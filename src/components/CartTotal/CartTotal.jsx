import React, { useContext } from "react";
import "./CartTotal.css";
import Title from "../Title/Title";
import { ShopContext } from "../../context/ShopContext";
function CartTotal() {
  const { subTotal, fee, currency,total} = useContext(ShopContext);
  
  return (
    <div className="cart-total-box">
      <div className="cart-totals-title">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="cart-totals">
        <div className="cart-details">
          <p>Subtotal</p>
          <p>
            {currency} {subTotal.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="cart-details">
          <p>Shipping Fee</p>
          <p>
            {currency} {fee.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="cart-details total">
          <p>Total</p>
          <p>
            {currency} {total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
