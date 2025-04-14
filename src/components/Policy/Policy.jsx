import React from "react";
import "./Policy.css";
import { assets } from "../../assets/assets";
function Policy() {
  return (
    <div className="policy-container">
      <div className="policy-box">
        <img src={assets.exchange_icon} alt="exchange icon" />
        <p className="policy-title">Easy Exchange Policy</p>
        <p className="policy-description">
          We offer hassle-free exchange policy
        </p>
      </div>

      <div className="policy-box">
        <img src={assets.quality_icon} alt="quality icon" />
        <p className="policy-title">7 Days Return Policy</p>
        <p className="policy-description">
          We provide 7 days free return policy
        </p>
      </div>

      <div className="policy-box">
        <img src={assets.support_img} alt="support icon" />
        <p className="policy-title">Best customer support</p>
        <p className="policy-description">We provide 24/7 customer support</p>
      </div>
    </div>
  );
}

export default Policy;
