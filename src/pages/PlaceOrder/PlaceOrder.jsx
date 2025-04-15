import React, { useContext } from "react";
import "./PlaceOrder.css";
import Title from "../../components/Title/Title";
import CartTotal from "../../components/CartTotal/CartTotal";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { LoginContext } from "../../context/LoginContext";
function PlaceOrder() {
  const {paymentMethod, setPaymentMethod, placeOrder} = useContext(ShopContext);
  const {user} = useContext(LoginContext);
  const navigate = useNavigate();

  const handlePaymentMethod = (name) => {
    if (name === "stripe") {
      toast.error("Stripe is temporarily unavailable.");
      return;
    }
    if (name === "razorpay") {
      toast.error("Razorpay is temporarily unavailable.");
      return;
    }
    setPaymentMethod(name);
  };

  const handleSubmit = (e) => {
    if (!e.target.checkValidity()) {
      return;
    }
    e.preventDefault();

    if (!user) {
      toast.error("Please login to place your order.");
      return;
    }

    placeOrder();
    navigate("/orders");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="placeoder-container">
        {/* --------------delivery-information-------------- */}
        <div className="delivery-information-title">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="delivery-information-container">
          <div className="delivery-information">
            <div className="del-info-input">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="input sec-input"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="input sec-input"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="input"
              required
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              className="input"
              required
            />
            <div className="del-info-input">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="input sec-input"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="input sec-input"
                required
              />
            </div>
            <div className="del-info-input">
              <input
                type="number"
                name="zipcode"
                placeholder="Zipcode"
                className="input sec-input"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="input sec-input"
                required
              />
            </div>
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              className="input"
              required
            />
          </div>

          {/* --------------Billing------------- */}

          <div className="billing-container">
            <div className="billing-total">
              <CartTotal />
            </div>
            <div className="payment-methods">
              <label className="custom-radio">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={(e) => handlePaymentMethod(e.target.value)}
                />
                <span className="radio-circle"></span>
                <img
                  src={assets.stripe_logo}
                  alt="stripe logo"
                  className="stripe-logo"
                />
              </label>

              <label className="custom-radio">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={(e) => handlePaymentMethod(e.target.value)}
                />
                <span className="radio-circle"></span>
                <img
                  src={assets.razorpay_logo}
                  alt="razorpay logo"
                  className="razorpay-logo"
                />
              </label>

              <label className="custom-radio">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  checked={paymentMethod === "cashOnDelivery"}
                  onChange={(e) => handlePaymentMethod(e.target.value)}
                />
                <span className="radio-circle"></span>
                CASH ON DELIVERY
              </label>
            </div>
            <div className="place-order-btn">
              <button type="submit">PLACE ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
