import React from "react";
import "./Hero.css";
import { assets } from "../../assets/assets";
function Hero() {
  return (
    <div className="hero-container">
      <div className="left-hero">
        <div className="left-hero-content">
          <div className="left-hero-first-line">
            <hr />
            <p> OUR BESTSELLERS</p>
          </div>
          <h2>Latest Arrivals</h2>
          <div className="left-hero-second-line">
            <p>SHOP NOW</p>
            <hr />
          </div>
        </div>
      </div>
      <div className="right-hero">
        <img src={assets.hero_img} alt="Hero image" className="hero-img" />
      </div>
    </div>
  );
}

export default Hero;
