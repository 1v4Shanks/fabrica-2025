import React from "react";
import "./NewsLetterBox.css";
function NewsLetterBox() {
  return (
    <div className="subscribe-box">
      <h3 className="subscribe-title">Subscribe now & get 20% off</h3>
      <p className="subscribe-text">
        Be the first to know about exclusive deals, new arrivals, and more –
        plus, enjoy 20% off your first purchase.
      </p>
      <div className="subscribe-form">
        <input
          type="email"
          className="subscribe-input"
          placeholder="Enter your email"
        />
        <button type="submit" className="subscribe-button">
          SUBSCRIBE
        </button>
      </div>
    </div>
  );
}

export default NewsLetterBox;
