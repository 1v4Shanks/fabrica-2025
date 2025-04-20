import React from "react";
import "./Hero.css";
import { assets } from "../../assets/assets";
function Hero() {
  return (
    <div className="hero-container">
      <div className="top-hero">
        <div className="inner-hero">
          <div className="inner-hero-content">
            <div className="inner-hero-first-line">
              <hr />
              <p> OUR BESTSELLERS</p>
            </div>
            <h2>Latest Arrivals</h2>
            <div className="inner-hero-second-line">
              <p>SHOP NOW</p>
              <hr />
            </div>
          </div>
        </div>
          <img src={assets.hero_img} alt="Hero image" className="hero-img" />
      </div>
    </div>
  );
}

export default Hero;
